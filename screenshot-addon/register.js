/* eslint-disable */
import 'babel-polyfill';
import { EventEmitter } from 'events';
import { getStorybook } from '@storybook/react';
import addons from '@storybook/addons';
import sanitize from 'sanitize-filename';


// // mock
// window.captureComponent = filename => new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(filename);
//   }, 500);
// });
//
// window.puppeteerDone = () => console.log('done');


const filenamify = filename => sanitize(filename).replace(/\s/g, '-');


addons.register('tsuyoshiwada/screenshot', (api) => {
  const channel = addons.getChannel();
  const state = {
    stories: [],
    total: 0,
  };

  const handleIncrement = () => {
    state.total++;
  };

  const handleConstructor = (context) => {
    state.stories.push(context);

    if (state.stories.length >= state.total) {
      ready();
    }
  };

  const capture = (kind, story) => new Promise((resolve) => {
    channel.once('screenshot/ready', async () => {
      const name = filenamify(`${kind}-${story}`);
      const filename = await window.captureComponent(name);
      resolve(filename);
    });

    api.selectStory(kind, story);
  });

  const ready = async () => {
    channel.removeListener('screenshot/increment', handleIncrement);
    channel.removeListener('screenshot/constructor', handleConstructor);

    for (let context of state.stories) {
      console.log(await capture(context.kind, context.story));
    }

    window.puppeteerDone();
  };

  channel.on('screenshot/increment', handleIncrement);
  channel.on('screenshot/constructor', handleConstructor);

  channel.once('setStories', ({ stories }) => {
    for (let group of stories) {
      for (let story of group.stories) {
        api.selectStory(group.kind, story);
      }
    }
  });
});
