import Button, { ButtonSize, ButtonType } from '@/components/Button';

function App() {
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
        <Button btnType={ButtonType.Primary}>Primary Button</Button>
        <Button btnType={ButtonType.Danger}>Danger Button</Button>
        <Button btnType={ButtonType.Link} href="xx">
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
        <Button size={ButtonSize.Small}>Small Button</Button>
        <Button size={ButtonSize.Large}>Large Button</Button>
      </div>
    </>
  );
}

export default App;
