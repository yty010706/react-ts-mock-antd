import { Plugin, ViteDevServer } from 'vite';
import Mock from 'mockjs';

const mockData = Mock.mock({
  'data|5-10': [
    {
      name: '@name',
      'age|1-100': 1,
    },
  ],
}).data;
const MockServerPlugin = (): Plugin => {
  return {
    name: 'mock-server-plugin',
    configureServer: (server: ViteDevServer) => {
      server.middlewares.use('/api/userList', (_, res) => {
        setTimeout(() => {
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify(mockData));
        }, 500);
      });
    },
  };
};

export default MockServerPlugin;
