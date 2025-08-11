import Button from '@/components/Button/index';

function TestButton() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        <Button>Default Button</Button>
        <Button btnType="primary">Primary Button</Button>
        <Button btnType="danger">Danger Button</Button>
        <Button btnType="dashed">Dashed Button</Button>
        <Button btnType="link" href="xx">
          Link Button
        </Button>
        <Button disabled>Disabled Button</Button>
      </div>
      <div
        style={{
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        <Button>Normal Button</Button>
        <Button size="small">Small Button</Button>
        <Button size="large">Large Button</Button>
      </div>
    </>
  );
}

export default TestButton;
