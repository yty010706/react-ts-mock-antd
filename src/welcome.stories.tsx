import { Meta, StoryObj } from '@storybook/react-vite';
import Button from './components/Button';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <h1 className="welcome-title">🎨 欢迎来到我的组件库</h1>
        <p className="welcome-subtitle">
          一个基于React和TypeScript构建的精美UI组件库
        </p>
      </header>

      <main className="welcome-main">
        <section className="welcome-section">
          <h2 className="section-title">🚀 开始使用</h2>
          <div className="install-guide">
            <p className="guide-step">
              <strong>1. 安装依赖</strong>
            </p>
            <pre className="code-block">
              <code>npm install yty-react-component-library</code>
            </pre>

            <p className="guide-step">
              <strong>2. 引入组件</strong>
            </p>
            <pre className="code-block">
              <code>{`import { Button } from 'yty-reactr-component-library';\n\nfunction App() {\n  return <Button>你好世界</Button>;\n}`}</code>
            </pre>
          </div>
        </section>

        <section className="welcome-section">
          <h2 className="section-title">🧩 组件列表</h2>
          <div className="components-grid">
            <div className="component-card">
              <h3>Button</h3>
              <p>各种样式和尺寸的按钮</p>
            </div>
            <div className="component-card">
              <h3>Alert</h3>
              <p>各种状态的消息提示</p>
            </div>
            <div className="component-card">
              <h3>Menu</h3>
              <p>导航菜单和下拉菜单</p>
            </div>
            <div className="component-card">
              <h3>Input</h3>
              <p>支持多种样式的输入组件</p>
            </div>
            <div className="component-card">
              <h3>Upload</h3>
              <p>点击或拖拽上传,支持文件大小格式限制</p>
            </div>
            <div className="component-card">
              <h3>AutoComplete</h3>
              <p>支持自定义选项与自定义渲染</p>
            </div>
          </div>
        </section>

        <section className="welcome-section">
          <h2 className="section-title">🤝 贡献指南</h2>
          <p className="contribution-text">
            欢迎提交Issue和Pull Request来帮助我们改进组件库！
            让我们一起打造更好用的UI组件库。
          </p>
          <div>
            <Button
              btnType="primary"
              className="repo-button"
              onClick={() =>
                window.open(
                  'https://gitee.com/yty010706/react_ts_mock_antd',
                  '_blank'
                )
              }
            >
              查看Gitee仓库
            </Button>
          </div>
        </section>
      </main>

      <footer className="welcome-footer">
        <p>© {new Date().getFullYear()} 我的组件库. 用心打造每一个组件。</p>
      </footer>
    </div>
  );
};

const meta: Meta<typeof WelcomePage> = {
  title: 'Welcome',
  component: WelcomePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof WelcomePage>;

export const Welcome: Story = {};
