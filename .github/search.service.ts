import { Injectable } from '@angular/core';
import { Product, PRODUCTS } from './products.data';

export interface MatchedProduct extends Product {
  matchLabel?: string | null;
}

export interface SearchOutcome {
  results: MatchedProduct[];
  spellingSuggestion: string | null;
}

const KNOWN_TERMS: string[] = Array.from(
  new Set(
    PRODUCTS.flatMap((p) => [p.name, ...p.name.split(/\s+/), ...p.description.split(/\s+/)])
  )
)
  .map((t) => t.replace(/[^a-zA-Z0-9'-]/g, ''))
  .filter(Boolean);

const MAX_SUGGESTIONS = 10;

function levenshtein(a: string, b: string): number {
  a = a.toLowerCase();
  b = b.toLowerCase();
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function findSpellingSuggestion(term: string): string | null {
  if (!term || term.length < 3) return null;
  let best: string | null = null;
  let bestDist = Infinity;
  for (const candidate of KNOWN_TERMS) {
    if (candidate.length < 3) continue;
    const dist = levenshtein(term, candidate);
    const threshold = Math.max(1, Math.floor(candidate.length * 0.4));
    if (dist > 0 && dist <= threshold && dist < bestDist) {
      bestDist = dist;
      best = candidate;
    }
  }
  return best;
}

interface RankedMatch {
  product: Product;
  rank: number;
  label: string;
}

function classifyMatch(product: Product, term: string): RankedMatch | null {
  const t = term.trim().toLowerCase();
  if (!t) return { product, rank: 0, label: '' };
  const name = product.name.toLowerCase();
  const desc = product.description.toLowerCase();

  if (name === t) return { product, rank: 1, label: 'Exact name match' };
  if (name.includes(t)) return { product, rank: 2, label: 'Partial name match' };
  if (desc === t) return { product, rank: 3, label: 'Exact description match' };
  if (desc.includes(t)) return { product, rank: 4, label: 'Partial description match' };
  return null;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  search(term: string, category: string): SearchOutcome {
    const t = term.trim();
    const pool = PRODUCTS.filter((p) => !category || p.category === category);

    if (!t) {
      return {
        results: [...pool].sort((a, b) => a.name.localeCompare(b.name)),
        spellingSuggestion: null,
      };
    }

    const direct = pool.map((p) => classifyMatch(p, t)).filter((m): m is RankedMatch => !!m);

    if (direct.length > 0) {
      direct.sort((a, b) =>
        a.rank !== b.rank ? a.rank - b.rank : a.product.name.localeCompare(b.product.name)
      );
      return {
        results: direct.map((d) => ({ ...d.product, matchLabel: d.label })),
        spellingSuggestion: null,
      };
    }

    // No direct matches — try spelling correction
    const suggestion = findSpellingSuggestion(t);
    if (suggestion) {
      const corrected = pool
        .map((p) => classifyMatch(p, suggestion))
        .filter((m): m is RankedMatch => !!m)
        .sort((a, b) =>
          a.rank !== b.rank ? a.rank - b.rank : a.product.name.localeCompare(b.product.name)
        );
      return {
        results: corrected.map((d) => ({ ...d.product, matchLabel: 'Closest spelling match' })),
        spellingSuggestion: suggestion,
      };
    }

    return { results: [], spellingSuggestion: null };
  }

  getSuggestions(term: string): Product[] {
    const t = term.trim().toLowerCase();
    if (!t) return [];
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t)
    ).slice(0, MAX_SUGGESTIONS);
  }
}
