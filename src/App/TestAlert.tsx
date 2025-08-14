import Alert from '@/components/Alert/index';
import Icon from '@/components/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Alert
        title="标题"
        description="描述"
        closeIcon={<Icon icon="close" />}
      />
      <Alert
        title="标题"
        description="描述SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
        type="success"
      />
      <Alert title="标题" description="描述" type="warning" />
      <Alert title="标题" description="描述" type="danger" />
      <Alert title="标题" description="描述" closable={false} />
      <Alert title="标题" description="描述" onClose={() => alert('关闭了')} />
    </div>
  );
}

export default App;
