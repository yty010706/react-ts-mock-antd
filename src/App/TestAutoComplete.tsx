import AutoComplete from '@/components/AutoComplete';

const TestAutoComplete = () => {
  const data = ['a', 'b', 'c', 'd', 'e', 'f', 'aa', 'bb'];
  const handleSearch = (text: string) => {
    return data.filter(item => item.includes(text));
  };
  return (
    <>
      <AutoComplete
        icon="search"
        onSearch={handleSearch}
        placeholder="请输入"
      />
    </>
  );
};

export default TestAutoComplete;
