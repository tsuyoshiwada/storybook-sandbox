/* eslint-disable */
import 'babel-polyfill';
import { EventEmitter } from 'events';
import { getStorybook } from '@storybook/react';
import addons from '@storybook/addons';


const filterStories = (stories) => {
  const results = [];

  for (let group of stories) {
    for (let story of group.stories) {
      if (!/^📷\s/.test(story)) {
        continue;
      }

      results.push({ kind: group.kind, story });
    }
  }

  return results;
};


addons.register('tsuyoshiwada/screenshot', (api) => {
  const channel = addons.getChannel();

  channel.once('setStories', async ({ stories }) => {
    const filteredStories = filterStories(stories);
    console.log(filteredStories);
  });

  //   window.captureComponent('foo');
  //   window.puppeteerDone();
});
