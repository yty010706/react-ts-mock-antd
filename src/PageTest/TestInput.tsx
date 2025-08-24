import Input from '@/components/Input';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const containerStyle: React.CSSProperties = {
  marginLeft: '20px',
};
function TestIcon() {
  return (
    <div style={containerStyle}>
      <Input placeholder="输入框" size="sm" icon="search" /> <br />
      <br />
      <Input placeholder="输入框" />
      <br />
      <br />
      <Input placeholder="输入框" size="lg" icon="search" />
      <br />
      <br />
      <Input placeholder="输入框" disabled />
      <br />
      <br />
      <Input placeholder="输入框" icon="search" />
    </div>
  );
}

export default TestIcon;
