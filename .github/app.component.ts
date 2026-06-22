import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, Product } from './products.data';
import { MatchedProduct, SearchService } from './search.service';

type SearchState = 'idle' | 'loading' | 'success' | 'error';

const RESULTS_PER_PAGE = 10;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('searchContainer') searchContainerRef!: ElementRef<HTMLElement>;

  categories = CATEGORIES;

  inputValue = '';
  category = '';

  submittedTerm: string | null = null;
  submittedCategory = '';

  page = 1;
  readonly resultsPerPage = RESULTS_PER_PAGE;

  showSuggestions = false;
  highlightedIndex = -1;
  suggestions: Product[] = [];

  simulateFailure = false;
  searchState: SearchState = 'idle';
  results: MatchedProduct[] = [];
  spellingSuggestion: string | null = null;

  selectedProduct: Product | null = null;

  private requestId = 0;

  constructor(private searchService: SearchService) {}

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const container = this.searchContainerRef?.nativeElement;
    if (container && !container.contains(event.target as Node)) {
      this.showSuggestions = false;
    }
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.results.length / this.resultsPerPage));
  }

  get pagedResults(): MatchedProduct[] {
    const start = (this.page - 1) * this.resultsPerPage;
    return this.results.slice(start, start + this.resultsPerPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onInputChange(value: string) {
    this.inputValue = value;
    this.suggestions = this.searchService.getSuggestions(value);
    this.showSuggestions = value.length > 0 && this.suggestions.length > 0;
    this.highlightedIndex = -1;
  }

  onInputFocus() {
    if (this.inputValue.length > 0) {
      this.suggestions = this.searchService.getSuggestions(this.inputValue);
      this.showSuggestions = this.suggestions.length > 0;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.showSuggestions && this.suggestions.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.suggestions.length - 1);
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.suggestions[this.highlightedIndex]) {
          this.selectSuggestion(this.suggestions[this.highlightedIndex]);
        } else {
          this.runSearch(this.inputValue, this.category);
        }
        return;
      }
      if (event.key === 'Escape') {
        this.showSuggestions = false;
        return;
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.runSearch(this.inputValue, this.category);
    }
  }

  clearInput() {
    this.inputValue = '';
    this.showSuggestions = false;
    this.highlightedIndex = -1;
    this.suggestions = [];
    this.searchInputRef?.nativeElement.focus();
  }

  selectSuggestion(product: Product) {
    this.showSuggestions = false;
    this.inputValue = product.name;
    this.selectedProduct = product;
    this.searchState = 'idle';
  }

  search() {
    this.runSearch(this.inputValue, this.category);
  }

  retry() {
    this.runSearch(this.submittedTerm ?? '', this.submittedCategory);
  }

  goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
  }

  useSpellingSuggestion(term: string) {
    this.inputValue = term;
    this.runSearch(term, this.category);
  }

  backToSearch() {
    this.selectedProduct = null;
  }

  private runSearch(term: string, category: string) {
    this.showSuggestions = false;
    this.selectedProduct = null;
    const myRequestId = ++this.requestId;
    this.searchState = 'loading';

    const delay = 450 + Math.random() * 350;
    setTimeout(() => {
      if (myRequestId !== this.requestId) return; // superseded by a newer search

      if (this.simulateFailure) {
        this.searchState = 'error';
        this.results = [];
        this.submittedTerm = term;
        this.submittedCategory = category;
        return;
      }

      const outcome = this.searchService.search(term, category);
      this.results = outcome.results;
      this.spellingSuggestion = outcome.spellingSuggestion;
      this.submittedTerm = term;
      this.submittedCategory = category;
      this.page = 1;
      this.searchState = 'success';
    }, delay);
  }
}
