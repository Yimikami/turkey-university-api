import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  suggestions?: string[];
  initialValue?: string;
  onInputChange?: (value: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
  suggestionData?: Array<{ name: string; id: number }>;
}

const SearchBar = ({
  onSearch,
  placeholder = "Ara...",
  className = "",
  suggestions = [],
  initialValue = "",
  onInputChange,
  onSuggestionClick,
  suggestionData = [],
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update query if initialValue changes (e.g., from parent component)
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    const filtered = suggestions
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 10); // Limit to 10 suggestions

    setFilteredSuggestions(filtered);
  }, [query, suggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);

    // Call onInputChange immediately if provided
    if (onInputChange) {
      onInputChange(value);
    }

    // If input is cleared, immediately call onSearch with empty string
    if (value.trim() === "") {
      onSearch("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);

    // If we have a specific handler for suggestion clicks, use it
    if (onSuggestionClick) {
      // Find the suggestion data if available
      if (suggestionData.length > 0) {
        const matchedSuggestion = suggestionData.find(
          (item) => item.name === suggestion
        );
        if (matchedSuggestion) {
          onSuggestionClick(suggestion);
          setShowSuggestions(false);
          return;
        }
      }

      // Otherwise just call the handler with the suggestion text
      onSuggestionClick(suggestion);
    } else {
      // Default behavior: perform search
      onSearch(suggestion);
    }

    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full py-3 px-4 pr-20 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
