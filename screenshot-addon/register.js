/* eslint-disable */
import { EventEmitter } from 'events';
import { getStorybook } from '@storybook/react';
import addons from '@storybook/addons';


class InitialStorySubscriber {
  constructor(api, listener) {
    this.api = api;
    this.listener = listener;
    this.api.onStory(this.handleStory);
  }

  handleStory = (kind, story) => {
    if (this.api) {
      this.listener(kind, story);
      this.api = null;
      this.listener = null;
    }
  };
}


addons.register('tsuyoshiwada/screenshot', (api) => {
  const channel = addons.getChannel();

  // const onInitialStory = new InitialStorySubscriber(api, (kind, story) => {
  //   console.log(kind, story, ...getStorybook());
  // });

  const selectStory = (kind, story) => new Promise((resolve) => {
    channel.on('foo/constructor', (id) => {
      resolve(id);
    });

    api.onStory((k, s) => {
      console.log(k, s);
      if (kind === k && story === s) {
        resolve(null);
      }
    });
  });

  channel.on('setStories', ({ stories }) => {
      for (let group of stories) {
        for (let story of group.stories) {
          const id = selectStory(kind, story);
          console.log(id);
        }
      }

    // window.captureComponent('foo');
    window.puppeteerDone();
  });

  // channel.on('foo/constructor', (component) => {
  //   console.log('constructor', component.id);
  // });
  //
  // channel.on('foo/did', (component) => {
  //   console.log('componentDidMount()', component.id);
  // });
});
