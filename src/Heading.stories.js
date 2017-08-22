/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withScreenshot } from '../screenshot-addon/';
import Heading from './Heading';

storiesOf('Heading', module)
  .add('with text',
    withScreenshot()(() => (
      <Heading>Title</Heading>
    ))
  );
