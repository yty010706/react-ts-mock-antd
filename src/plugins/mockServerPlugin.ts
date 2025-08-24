import { Plugin, ViteDevServer } from 'vite';
import { faker } from '@faker-js/faker';

const generateMockData = () => {
  const count = faker.number.int({ min: 5, max: 10 });
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    age: faker.number.int({ min: 1, max: 100 }),
  }));
};
const MockServerPlugin = (): Plugin => {
  return {
    name: 'mock-server-plugin',
    configureServer: (server: ViteDevServer) => {
      server.middlewares.use('/api/userList', (_, res) => {
        setTimeout(() => {
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify(generateMockData()));
        }, 500);
      });
    },
  };
};

export default MockServerPlugin;
