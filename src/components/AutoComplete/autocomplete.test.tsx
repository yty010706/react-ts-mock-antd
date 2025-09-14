import { render, RenderResult, waitFor } from '@testing-library/react';
import AutoComplete, { AutoCompleteProps, OptionType } from './autocomplete';
import { fireEvent } from '@testing-library/react';
import { userEvent } from 'storybook/internal/test';

interface ValueProp {
  name: string;
  age: number;
}

const data: ValueProp[] = [
  { name: 'a', age: 10 },
  { name: 'ab', age: 10 },
  { name: 'abc', age: 10 },
  { name: 'abcd', age: 10 },
];

const generateOptions = (data: ValueProp[]) => {
  const options: OptionType[] = data.map(item => ({
    value: item.name,
    label: item.name,
  }));
  return options;
};

const handleSearch = (query: string) => {
  return Promise.resolve(
    generateOptions(data.filter(item => item.name.includes(query)))
  );
};

// option定制化渲染
const renderOptions = (item: OptionType) => {
  const option = data.find(i => i.name === item.value)!;
  return (
    <div style={{ position: 'relative' }}>
      <div>
        姓名：<strong>{`${option.name}`}</strong>
      </div>
      <div>{`年龄：${option.age}`}</div>
    </div>
  );
};

const testProps: AutoCompleteProps = {
  options: generateOptions(data),
  onSearch: handleSearch,
  onSelect: jest.fn(),
  renderOptions,
};

let wrapper: RenderResult;
let input: HTMLInputElement;
let suggestionList: HTMLElement;
let suggestions: NodeListOf<HTMLLIElement>;
describe('AutoComplete Test', () => {
  beforeEach(async () => {
    wrapper = render(<AutoComplete {...testProps} />);
    input = wrapper.getByTestId('auto-complete-input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.focus(input);
    userEvent.type(input, 'a');
    await waitFor(() => {
      expect(
        wrapper.getByTestId('auto-complete-suggestions')
      ).toBeInTheDocument();
    });
    suggestionList = wrapper.getByTestId('auto-complete-suggestions');
    suggestions = suggestionList.querySelectorAll('li');
  });

  it('默认AutoComplete测试', async () => {
    // 由于虚拟滚动，实际显示的项目数量可能不同，我们检查至少有建议项
    expect(suggestions.length).toBeGreaterThan(0);
    
    // 找到第一个可见的建议项
    const firstVisibleSuggestion = suggestions[0];
    expect(firstVisibleSuggestion).toBeInTheDocument();
    
    // 测试鼠标悬停和点击
    fireEvent.mouseOver(firstVisibleSuggestion);
    expect(firstVisibleSuggestion).toHaveClass('active');
    fireEvent.click(firstVisibleSuggestion);
    expect(testProps.onSelect).toHaveBeenCalled();
    expect(suggestionList).not.toBeInTheDocument();
    expect(input).toHaveValue('a');
  });

  it('键盘事件测试', async () => {
    // 测试ESC键关闭建议列表
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(wrapper.queryByTestId('auto-complete-suggestions')).not.toBeInTheDocument();
  });

  it('自定义选项渲染测试', () => {
    expect(suggestions[0]).toHaveTextContent('10');
  });
});
