// import { getStorybook } from '@storybook/react';
import addons from '@storybook/addons';

addons.register('tsuyoshiwada/screenshot', (api) => {
  const channel = addons.getChannel();

  channel.on('setStories', ({ stories }) => {
    console.log(stories);

    window.captureComponent('foo');
    window.puppeteerDone();
  });
});
