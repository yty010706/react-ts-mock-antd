import { ChangeEvent, CSSProperties, useRef, useState } from 'react';
import Input from '../Input';
import { InputProps } from '../Input/input';

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  options?: { label: string; value: any }[];
  onSearch?: (text: string) => string[];
  onSelect?: (item: string) => void;
  style?: CSSProperties;
}
const AutoComplete = ({
  options,
  onSearch,
  onSelect,
  value,
  style = { width: 300, marginLeft: 10, marginTop: 10 },
  ...props
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dropDownRef = useRef<HTMLUListElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.trim();
    setInputValue(v);
    if (v) {
      const results = onSearch!(v);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleClick = (text: string) => {
    setInputValue(text);
    setSuggestions([]);
    onSelect && onSelect(text);
  };

  const generateDropdown = () => {
    return (
      <ul className="auto-complete-suggestions" ref={dropDownRef}>
        {suggestions.map(item => (
          <li
            className="auto-complete-suggestions-item"
            key={item}
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="auto-complete" style={style}>
      <Input value={inputValue} onChange={handleChange} {...props} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
