import AutoComplete, {
  OptionType,
} from '@/components/AutoComplete/autocomplete';
import { faker } from '@faker-js/faker';

interface ValueProp {
  name: string;
  age: number;
}

const generateMockData = () => {
  const count = faker.number.int({ min: 5, max: 10 });
  return Array.from({ length: count }, () => ({
    name: faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
    age: faker.number.int({ min: 1, max: 100 }),
  }));
};
const data: ValueProp[] = generateMockData();

const TestAutoComplete = () => {
  const generateOptions = (data: ValueProp[]) => {
    const options: OptionType[] = data.map(item => ({
      value: item.name,
      label: item.name,
    }));
    return options;
  };

  // 搜索逻辑
  const handleSearchAsync = (query: string) => {
    return fetch('/api/userList')
      .then(res => res.json())
      .then(res => {
        return generateOptions(
          res.filter((item: ValueProp) => item.name.includes(query))
        );
      });
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
  return (
    <>
      <AutoComplete
        icon="search"
        onSearch={handleSearchAsync}
        options={generateOptions(data)}
        renderOptions={renderOptions}
      />
    </>
  );
};

export default TestAutoComplete;
