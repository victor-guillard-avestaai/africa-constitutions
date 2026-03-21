"""
Embed constitution texts and preambles using Voyage AI (voyage-law-2).
Outputs embeddings as numpy arrays for clustering and visualization.

Usage: uv run python scripts/embed_constitutions.py
"""

import json
import os
import time
from pathlib import Path

import numpy as np
import voyageai
from dotenv import load_dotenv

load_dotenv()

MODEL = "voyage-law-2"
MAX_TOKENS_PER_CHUNK = 10000  # conservative, model limit is ~16K
CHUNK_OVERLAP_WORDS = 200

CORPUS_DIR = Path(__file__).parent.parent / "data" / "constitution_corpus"
PREAMBLE_DIR = Path(__file__).parent.parent / "data" / "preamble_corpus"
OUTPUT_DIR = Path(__file__).parent.parent / "data" / "embeddings"

client = voyageai.Client(api_key=os.getenv("VOYAGE_API_KEY"))


def chunk_text(text: str, max_words: int = 7000, overlap: int = 200) -> list[str]:
    """Split text into overlapping chunks of roughly max_words each."""
    words = text.split()
    if len(words) <= max_words:
        return [text]
    chunks = []
    start = 0
    while start < len(words):
        end = min(start + max_words, len(words))
        chunks.append(" ".join(words[start:end]))
        start = end - overlap
        if start + overlap >= len(words):
            break
    return chunks


def embed_texts(texts: list[str], desc: str = "") -> list[list[float]]:
    """Embed a list of texts via Voyage API with rate limiting."""
    all_embeddings = []
    batch_size = 8  # conservative batch size
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        if desc:
            print(f"  {desc}: batch {i // batch_size + 1}/{(len(texts) - 1) // batch_size + 1}", end="", flush=True)
        result = client.embed(batch, model=MODEL, input_type="document")
        all_embeddings.extend(result.embeddings)
        if desc:
            print(f" ({result.total_tokens} tokens)")
        time.sleep(0.5)  # rate limit courtesy
    return all_embeddings


def embed_constitution(text: str, country: str) -> np.ndarray:
    """Embed a full constitution, chunking if needed and averaging."""
    chunks = chunk_text(text)
    if len(chunks) == 1:
        result = client.embed(chunks, model=MODEL, input_type="document")
        time.sleep(0.3)
        return np.array(result.embeddings[0])

    # Multiple chunks: embed each, weighted average by chunk length
    print(f"    {country}: {len(chunks)} chunks...", end=" ", flush=True)
    chunk_embeddings = []
    chunk_weights = []
    for j, chunk in enumerate(chunks):
        result = client.embed([chunk], model=MODEL, input_type="document")
        chunk_embeddings.append(np.array(result.embeddings[0]))
        chunk_weights.append(len(chunk.split()))
        time.sleep(0.3)

    weights = np.array(chunk_weights, dtype=float)
    weights /= weights.sum()
    avg = sum(w * e for w, e in zip(weights, chunk_embeddings))
    avg /= np.linalg.norm(avg)  # L2 normalize
    print(f"{sum(chunk_weights)} words")
    return avg


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    stats = json.load(open(CORPUS_DIR / "_extraction_stats.json"))
    with open(Path(__file__).parent / "country_mapping.json") as f:
        en_to_fr = json.load(f)

    # 1. Embed preambles (single request each)
    print("=== Embedding preambles ===")
    preamble_texts_to_embed = []
    preamble_countries = []
    for s in stats:
        if not s["has_preamble"]:
            continue
        path = PREAMBLE_DIR / f"{Path(s['file']).stem}.txt"
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        if len(text.split()) < 20:
            continue
        preamble_texts_to_embed.append(text)
        preamble_countries.append(s["country"])

    print(f"  {len(preamble_texts_to_embed)} preambles to embed")
    preamble_embs = embed_texts(preamble_texts_to_embed, desc="preambles")

    preamble_matrix = np.array(preamble_embs)
    preamble_meta = [
        {"country_en": c, "country_fr": en_to_fr.get(c, c)} for c in preamble_countries
    ]

    np.save(OUTPUT_DIR / "preamble_embeddings.npy", preamble_matrix)
    with open(OUTPUT_DIR / "preamble_meta.json", "w") as f:
        json.dump(preamble_meta, f, indent=2, ensure_ascii=False)
    print(f"  Saved: {preamble_matrix.shape}")

    # 2. Embed full constitutions (chunked)
    print("\n=== Embedding full constitutions ===")
    const_embeddings = []
    const_countries = []
    for s in stats:
        path = CORPUS_DIR / f"{Path(s['file']).stem}.txt"
        text = path.read_text(encoding="utf-8")
        print(f"  {s['country']}...", end=" ", flush=True)

        emb = embed_constitution(text, s["country"])
        const_embeddings.append(emb)
        const_countries.append(s["country"])
        print(f"  done ({s['words']} words)")

    const_matrix = np.array(const_embeddings)
    const_meta = [
        {"country_en": c, "country_fr": en_to_fr.get(c, c)} for c in const_countries
    ]

    np.save(OUTPUT_DIR / "constitution_embeddings.npy", const_matrix)
    with open(OUTPUT_DIR / "constitution_meta.json", "w") as f:
        json.dump(const_meta, f, indent=2, ensure_ascii=False)
    print(f"  Saved: {const_matrix.shape}")

    print("\n=== Done ===")
    print(f"Preamble embeddings: {preamble_matrix.shape}")
    print(f"Constitution embeddings: {const_matrix.shape}")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
