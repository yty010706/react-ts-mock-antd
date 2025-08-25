// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      // 构建输出目录
      'dist/',
      '/dist/*',
      'build/',
      '/build/*',
      '.out/',
      '/.out/*',

      // 依赖目录
      'node_modules/',
      '/node_modules/*',

      // 缓存和临时文件
      '.cache/',
      '/.cache/*',
      '.tmp/',
      '/.tmp/*',
      '*.tmp',

      // 环境配置文件
      '.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',

      // 日志文件
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',

      // 运行时状态文件
      '*.pid',
      '*.pid.lock',

      // IDE和编辑器文件
      '.vscode/',
      '/.vscode/*',
      '.idea/',
      '/.idea/*',
      '*.swp',
      '*.swo',

      // 其他
      'coverage/',
      '/coverage/*',
      '.DS_Store',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'storybook/no-renderer-packages': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  storybook.configs['flat/recommended']
);
