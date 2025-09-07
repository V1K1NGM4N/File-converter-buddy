import { useState, useEffect, useCallback } from 'react';
import { ParsedFeed } from '@/utils/xmlFeedParser';

interface ProductFeedState {
  feedUrl: string;
  xmlContent: string;
  inputMode: 'url' | 'xml';
  parsedFeed: ParsedFeed | null;
  searchQuery: string;
  selectedCategory: string;
  selectedProducts: string[];
  imageFormat: 'jpg' | 'png' | 'webp' | 'original';
  currentPage: number;
  itemsPerPage: number;
}

export const useProductFeedPersistence = (storageKey: string) => {
  const [state, setState] = useState<ProductFeedState>({
    feedUrl: '',
    xmlContent: '',
    inputMode: 'url',
    parsedFeed: null,
    searchQuery: '',
    selectedCategory: '',
    selectedProducts: [],
    imageFormat: 'original',
    currentPage: 1,
    itemsPerPage: 15
  });

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsedState = JSON.parse(saved);
        setState(parsedState);
      }
    } catch (error) {
      console.error('Error loading persisted product feed state:', error);
    }
  }, [storageKey]);

  // Save state to localStorage whenever state changes
  const saveState = useCallback((newState: ProductFeedState) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newState));
    } catch (error) {
      console.error('Error saving product feed state:', error);
    }
  }, [storageKey]);

  // Update state and persist
  const updateState = useCallback((updates: Partial<ProductFeedState>) => {
    setState(prevState => {
      const newState = { ...prevState, ...updates };
      saveState(newState);
      return newState;
    });
  }, [saveState]);

  // Clear all state
  const clearState = useCallback(() => {
    const defaultState: ProductFeedState = {
      feedUrl: '',
      xmlContent: '',
      inputMode: 'url',
      parsedFeed: null,
      searchQuery: '',
      selectedCategory: '',
      selectedProducts: [],
      imageFormat: 'original',
      currentPage: 1,
      itemsPerPage: 15
    };
    setState(defaultState);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    state,
    updateState,
    clearState
  };
};
