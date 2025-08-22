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
    expect(suggestions.length).toBe(4);
    fireEvent.mouseOver(suggestions[1]);
    expect(suggestions[1]).toHaveClass('active');
    fireEvent.click(suggestions[1]);
    expect(testProps.onSelect).toHaveBeenCalled();
    expect(suggestionList).not.toBeInTheDocument();
    expect(input).toHaveValue('ab');
  });

  it('键盘事件测试', async () => {
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(suggestions[1]).toHaveClass('active');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input).toHaveValue('ab');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(suggestionList).not.toBeInTheDocument();
  });

  it('自定义选项渲染测试', () => {
    expect(suggestions[0]).toHaveTextContent('10');
  });
});
