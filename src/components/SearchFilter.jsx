import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../utils/searchSlice';

function SearchFilter() {
  // Local state to store input value
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  // Debounce effect to prevent excessive calls while typing
  useEffect(() => {
    // Set a 500ms delay before calling the parent handler
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(inputValue.trim()))
    }, 500);

    // Cleanup: clear timeout if input changes before 500ms
    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  return (
    <div className="flex items-center justify-center mt-8 mb-2">
      {/* Container for input field */}
      <div className="relative w-full max-w-3xl m-4">
        
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by Product Title or Category..."
          className="
            w-full h-12 pl-12 pr-4 rounded-xl
            transition-all duration-300 border-2
            font-semibold
            border-[#BFA6A0] text-[#BFA6A0]
            shadow-[0_4px_12px_rgba(0,0,0,0.1)]
            focus:shadow-[0_6px_20px_rgba(0,0,0,0.15)]
            hover:shadow-[0_5px_15px_rgba(0,0,0,0.12)]
          "
          value={inputValue}                  // Controlled input value
          onChange={(e) => setInputValue(e.target.value)} // Update state on typing
        />

        {/* Search icon */}
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BFA6A0] w-5 h-5" 
        />
      </div>
    </div>
  );
}

export default SearchFilter;