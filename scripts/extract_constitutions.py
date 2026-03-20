"""
Extract text from 54 constitution PDFs (constituteproject.org).
Outputs: full texts + preambles as separate corpora.

Usage: uv run python scripts/extract_constitutions.py
"""

import json
import re
from pathlib import Path

import pdfplumber

PDF_DIR = Path(__file__).parent.parent / "data" / "constitutions"
OUT_DIR = Path(__file__).parent.parent / "data" / "constitution_corpus"
PREAMBLE_DIR = Path(__file__).parent.parent / "data" / "preamble_corpus"


def extract_text(pdf_path: Path) -> str:
    """Extract full text from a PDF, skipping the constituteproject.org header page."""
    pages = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            # Skip the header page (page 0 usually has "constituteproject.org" and little else)
            if i == 0 and "constituteproject.org" in text and len(text.strip().split("\n")) < 10:
                continue
            pages.append(text)
    return "\n\n".join(pages)


def extract_preamble(full_text: str) -> str | None:
    """Extract the preamble section from constitution text.

    constituteproject.org PDFs have a table of contents with dotted leaders
    (e.g. "Preamble ..........4") followed by the actual preamble body.
    We skip TOC entries and find the real preamble heading.
    """
    # Find all "Preamble" occurrences, skip TOC lines and inline references.
    # The real preamble heading is on its own line (short, no dotted leaders).
    preamble_start = None
    for m in re.finditer(
        r"^(?:PREAMBLE|Preamble|PRÉAMBULE|Préambule)\b",
        full_text,
        re.MULTILINE,
    ):
        line_end = full_text.find("\n", m.start())
        if line_end == -1:
            line_end = len(full_text)
        line = full_text[m.start():line_end]
        # Skip TOC entries (dotted leaders)
        if "...." in line:
            continue
        # Skip inline references — the line should be short (just the heading,
        # possibly with a marginal note from constituteproject.org)
        if len(line.strip()) > 80:
            continue
        preamble_start = m
        break

    if not preamble_start:
        return None

    text_after = full_text[preamble_start.start():]

    # Find preamble end — next major section heading
    end_match = re.search(
        r"\n(?:PART|Part|CHAPTER|Chapter|TITLE|Title|SECTION|Section)\s+(?:I\b|1\b|One|First)|"
        r"\n(?:Article|ARTICLE)\s+1\b|"
        r"\n(?:TITRE|Titre)\s+(?:I\b|1\b|PREMIER|Premier)",
        text_after[20:],  # skip the "PREAMBLE" heading itself
    )

    if end_match:
        return text_after[: end_match.start() + 20].strip()
    else:
        # Take first 5000 chars as fallback (preambles are rarely longer)
        return text_after[:5000].strip()


def country_name_from_filename(filename: str) -> str:
    """Convert 'Central_African_Republic_2016.pdf' -> 'Central African Republic'."""
    name = filename.rsplit("_", 1)[0]  # drop year
    return name.replace("_", " ")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PREAMBLE_DIR.mkdir(parents=True, exist_ok=True)

    pdfs = sorted(PDF_DIR.glob("*.pdf"))
    print(f"Found {len(pdfs)} PDFs in {PDF_DIR}")

    stats = []
    for pdf_path in pdfs:
        country = country_name_from_filename(pdf_path.name)
        print(f"  {country}...", end=" ", flush=True)

        full_text = extract_text(pdf_path)
        preamble = extract_preamble(full_text)

        # Save full text
        out_path = OUT_DIR / f"{pdf_path.stem}.txt"
        out_path.write_text(full_text, encoding="utf-8")

        # Save preamble
        if preamble:
            preamble_path = PREAMBLE_DIR / f"{pdf_path.stem}.txt"
            preamble_path.write_text(preamble, encoding="utf-8")

        n_words = len(full_text.split())
        n_preamble_words = len(preamble.split()) if preamble else 0

        stats.append({
            "file": pdf_path.name,
            "country": country,
            "pages": len(list(pdfplumber.open(pdf_path).pages)),
            "chars": len(full_text),
            "words": n_words,
            "has_preamble": preamble is not None,
            "preamble_words": n_preamble_words,
        })

        status = f"{n_words} words"
        if preamble:
            status += f", preamble {n_preamble_words} words"
        else:
            status += ", NO preamble detected"
        print(status)

    # Save stats
    stats_path = OUT_DIR / "_extraction_stats.json"
    with open(stats_path, "w") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)

    # Summary
    total_words = sum(s["words"] for s in stats)
    with_preamble = sum(1 for s in stats if s["has_preamble"])
    print(f"\n{'='*50}")
    print(f"Extracted: {len(stats)} constitutions")
    print(f"Total words: {total_words:,}")
    print(f"Preambles found: {with_preamble}/{len(stats)}")
    print(f"Output: {OUT_DIR}")
    print(f"Preambles: {PREAMBLE_DIR}")
    print(f"Stats: {stats_path}")


if __name__ == "__main__":
    main()
