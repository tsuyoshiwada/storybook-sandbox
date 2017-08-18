import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';
import path from 'path';

initStoryshots({
  framework: 'react',
  configPath: path.join(__dirname, '..', '.storybook'),
});
