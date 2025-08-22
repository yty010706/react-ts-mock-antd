import AutoComplete, {
  OptionType,
} from '@/components/AutoComplete/autocomplete';
import Mock from 'mockjs';

interface ValueProp {
  name: string;
  age: number;
}

const data: ValueProp[] = Mock.mock({
  'data|5-10': [
    {
      name: '@string("alphaNumeric",5,10)',
      'age|1-100': 1,
    },
  ],
}).data;

const TestAutoComplete = () => {
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
      />
    </>
  );
};

export default TestAutoComplete;
