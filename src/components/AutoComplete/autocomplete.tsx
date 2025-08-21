import {
  ChangeEvent,
  CSSProperties,
  ReactNode,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';
import Input from '../Input';
import { InputProps } from '../Input/input';
import Icon from '../Icon';
import useDebounce from '@/hooks/useDebounce';

export interface OptionType {
  value: string;
  label: ReactNode;
}

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 数据化配置选项内容 */
  options?: OptionType[];
  /** 输入框变化时调用 */
  onSearch?: (text: string) => Promise<OptionType[]>;
  /** 选中option时调用 */
  onSelect?: (item: OptionType) => void;
  /** 定义option的渲染方式 */
  renderOptions?: (item: OptionType) => ReactNode;
  style?: CSSProperties;
}
const AutoComplete = ({
  onSearch,
  onSelect,
  renderOptions,
  value,
  style = { width: 300, marginLeft: 10, marginTop: 10 },
  ...props
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState(value as string);
  const debouncedValue = useDebounce(inputValue, 500);
  const [suggestions, setSuggestions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const dropDownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (debouncedValue) {
      setLoading(true);
      onSearch!(inputValue).then(results => {
        setSuggestions(results);
        setLoading(false);
      });
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleClick = (item: OptionType) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
  };

  const renderTemplate = (item: OptionType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul className="auto-complete-suggestions" ref={dropDownRef}>
        {loading ? (
          <Icon icon="spinner" spin />
        ) : (
          suggestions.map(item => (
            <li
              className="auto-complete-suggestions-item"
              key={item.value}
              onClick={() => handleClick(item)}
            >
              {renderTemplate(item)}
            </li>
          ))
        )}
      </ul>
    );
  };

  return (
    <div className="auto-complete" style={style}>
      <Input value={inputValue} onChange={handleChange} {...props} />
      {(suggestions.length > 0 || loading) && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
