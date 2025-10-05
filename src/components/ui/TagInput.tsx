// components/TagInput.tsx
import React, { useState, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import Taginput from '../Taginput';

// Define the expected props for our custom component
interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  onBlur: () => void;
  name: string;
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, onBlur, name }, ref) => {
    
    // State to hold the current text in the input box before adding
    const [inputValue, setInputValue] = useState("");

    // --- Tag Logic ---
    
    // Function to add a new tag on Enter key press
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault(); // Prevent form submission
        const newTag = inputValue.trim();

        if (newTag && !value.includes(newTag)) {
          // Update RHF state with the new array
          onChange([...value, newTag]); 
          setInputValue(""); // Clear the temporary input
        }
      }
    }, [inputValue, value, onChange]);

    // Function to remove a tag
    const removeTag = useCallback((tagToRemove: string) => {
      // Update RHF state with the filtered array
      onChange(value.filter(tag => tag !== tagToRemove));
    }, [value, onChange]);


    return (
      <div className="flex flex-col space-y-2">
         <Input
          ref={ref}
          name={name}
          placeholder="Type tag and press Enter or comma"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onBlur} // Important for RHF touch state
        />
        {/* Display existing tags */}
        <div className="flex flex-wrap gap-2 min-h-[38px] border p-2 rounded-md">
          {value.map((tag) => (
            // <Badge
            //   key={tag} 
            //   variant="secondary"
            //   className="bg-gray-100 hover:bg-gray-200 cursor-default"
            // >
            //   {tag}
            //   <X 
            //     className="ml-1 h-3 w-3 cursor-pointer text-gray-500 hover:text-gray-900" 
            //     onClick={() => removeTag(tag)} 
            //   />
            // </Badge>
            <Taginput    key={tag} 
              variant="secondary"
              // ✅ PASS THE DELETION LOGIC HERE
              onDelete={() => removeTag(tag)} 
            >
                {tag} 
            </Taginput>
          ))}
        </div>

        {/* The Input Field */}
       
        
      </div>
    );
  }
);

TagInput.displayName = "TagInput";

export default TagInput;