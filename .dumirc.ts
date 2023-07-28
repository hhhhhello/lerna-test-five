import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  themeConfig: {
    name: 'lerna-test-five',
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'packages/components' },
      { type: 'utils', dir: 'packages/utils' },
      { type: 'views', dir: 'packages/views' }
    ],
  },
  alias: {
    'base-input': path.join(__dirname, 'packages/components/base-input/src')
  }
});
