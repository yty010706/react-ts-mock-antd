import {
  ChangeEvent,
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Input from '../Input';
import { InputProps } from '../Input/input';
import Icon from '../Icon';
import useDebounce from '@/hooks/useDebounce';
import useClickOutside from '@/hooks/useClickOutside';

export interface OptionType {
  /**
   * 选项的值
   * 用于输入框显示和选中后的值
   */
  value: string;
  /**
   * 选项的标签
   * 用于下拉列表中显示
   */
  label: ReactNode;
}

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 数据化配置选项内容
   * 静态选项列表
   */
  options?: OptionType[];
  /**
   * 输入框变化时调用
   * 当输入框内容变化时触发，用于异步获取选项列表
   */
  onSearch?: (text: string) => Promise<OptionType[]>;
  /**
   * 选中option时调用
   * 当用户选中下拉列表中的选项时触发
   */
  onSelect?: (item: OptionType) => void;
  /**
   * 定义option的渲染方式
   * 自定义下拉选项的渲染方式
   */
  renderOptions?: (item: OptionType) => ReactNode;
  /**
   * 自定义样式
   * 应用到组件根元素的样式
   */
  style?: CSSProperties;
}

/**
 * AutoComplete 自动完成组件
 *
 * 当用户输入内容时，可以根据输入内容显示匹配的选项列表，支持异步加载数据和自定义选项渲染。
 * 常用于搜索建议、表单填写等场景。
 *
 * 支持键盘操作：
 * - 上下箭头键：在选项间导航
 * - Enter键：选中当前高亮的选项
 * - Esc键：关闭下拉列表
 *
 * ```tsx
 * <AutoComplete
 *   placeholder="请输入内容"
 *   onSearch={query => {
 *     return fetch(`/api/search?q=${query}`)
 *       .then(res => res.json())
 *       .then(data => data.map((item: any) => ({
 *         value: item.name,
 *         label: item.name
 *       })));
 *   }}
 * />
 * ```
 */
const AutoComplete = ({
  onSearch,
  onSelect,
  renderOptions,
  value = '',
  style = { width: 300, marginLeft: 10, marginTop: 10 },
  ...props
}: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const debouncedValue = useDebounce(inputValue, 200);

  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useClickOutside(componentRef as RefObject<HTMLDivElement>, () => {
    setHide(true);
  });

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setLoading(true);
      onSearch?.(debouncedValue).then(results => {
        setSuggestions(results);
        setLoading(false);
        setActiveIdx(0);
      });
    } else {
      setSuggestions([]);
      setActiveIdx(-1);
    }
  }, [debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
    triggerSearch.current = true;
  };

  const handleClick = (item: OptionType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (suggestions.length > 0) {
          handleClick(suggestions[activeIdx]);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setActiveIdx(-1);
        break;
      case 'ArrowUp':
        updateActiveIdx(activeIdx - 1);
        break;
      case 'ArrowDown':
        updateActiveIdx(activeIdx + 1);
        break;
      default:
        break;
    }
  };

  const handleMouseEnter = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'LI') {
      setActiveIdx(parseInt(target.dataset.index!));
    }
  };

  const updateActiveIdx = (idx: number) => {
    if (idx < 0) {
      idx = 0;
    }
    if (idx >= suggestions.length) {
      idx = suggestions.length - 1;
    }
    setActiveIdx(idx);
  };

  // 虚拟滚动相关状态
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(10);
  const itemHeight = 36; // 每个选项的高度
  const visibleCount = 10; // 可见选项数量

  // 使用 Intersection Observer 实现虚拟滚动
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRefs = useRef<Map<number, HTMLLIElement>>(new Map());

  useEffect(() => {
    // 创建 Intersection Observer
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const direction = entry.boundingClientRect.top < 0 ? 'down' : 'up';

            if (direction === 'down') {
              setVisibleStart(prev =>
                Math.min(prev + 5, suggestions.length - visibleCount)
              );
              setVisibleEnd(prev => Math.min(prev + 5, suggestions.length));
            } else {
              setVisibleStart(prev => Math.max(prev - 5, 0));
              setVisibleEnd(prev => Math.max(prev - 5, visibleCount));
            }
          }
        });
      },
      {
        root: listRef.current,
        rootMargin: '50% 0px',
        threshold: 0.1,
      }
    );

    // 观察哨兵元素
    sentinelRefs.current.forEach(element => {
      observer.current?.observe(element);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [suggestions.length]);

  const dropDownCom = useMemo(() => {
    // 计算实际渲染的项目
    const visibleItems = suggestions.slice(visibleStart, visibleEnd);

    return (
      <ul
        className="auto-complete-suggestions"
        onMouseOver={handleMouseEnter}
        data-testid="auto-complete-suggestions"
        ref={listRef}
        style={{
          maxHeight: `${itemHeight * visibleCount}px`,
          overflowY: 'auto',
        }}
      >
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Icon icon="spinner" spin />
          </div>
        ) : (
          <>
            {/* 顶部填充 */}
            {visibleStart > 0 && (
              <div style={{ height: `${visibleStart * itemHeight}px` }} />
            )}

            {visibleItems.map((item, idx) => {
              const actualIndex = visibleStart + idx;
              return (
                <li
                  className={`auto-complete-suggestions-item ${
                    activeIdx === actualIndex ? 'active' : ''
                  }`}
                  key={item.value}
                  data-index={actualIndex}
                  onClick={() => handleClick(item)}
                  style={{ height: `${itemHeight}px` }}
                >
                  {renderOptions ? renderOptions(item) : item.value}
                </li>
              );
            })}

            {/* 底部填充 */}
            {visibleEnd < suggestions.length && (
              <div
                style={{
                  height: `${(suggestions.length - visibleEnd) * itemHeight}px`,
                }}
              />
            )}

            {/* 哨兵元素用于触发 Intersection Observer */}
            {suggestions.length > 0 && (
              <>
                <li
                  ref={el => {
                    if (el) sentinelRefs.current.set(0, el);
                  }}
                  data-index="0"
                  style={{
                    height: '1px',
                    position: 'absolute',
                    top: '20%',
                    width: '100%',
                  }}
                />
                <li
                  ref={el => {
                    if (el)
                      sentinelRefs.current.set(suggestions.length - 1, el);
                  }}
                  data-index={suggestions.length - 1}
                  style={{
                    height: '1px',
                    position: 'absolute',
                    top: '80%',
                    width: '100%',
                  }}
                />
              </>
            )}
          </>
        )}
      </ul>
    );
  }, [
    suggestions,
    activeIdx,
    loading,
    visibleStart,
    visibleEnd,
    itemHeight,
    visibleCount,
  ]);

  return (
    <div className="auto-complete" style={style} ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setHide(false)}
        data-testid="auto-complete-input"
        {...props}
      />
      {!hide && (suggestions.length > 0 || loading) && dropDownCom}
    </div>
  );
};

export default AutoComplete;
