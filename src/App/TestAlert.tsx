import Alert from '@/components/Alert/index';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Alert />
      <Alert title="标题" description="描述" />
      <Alert title="标题" description="描述SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" type="success" />
      <Alert title="标题" description="描述" type="warning" />
      <Alert title="标题" description="描述" type="danger" />
      <Alert title="标题" description="描述" closable={false} />
      <Alert title="标题" description="描述" onClose={() => alert('关闭了')} />
    </div>
  );
}

export default App;
