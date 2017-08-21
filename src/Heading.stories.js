/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Screenshot from '../screenshot-addon/';
import Heading from './Heading';

storiesOf('Heading', module)
  .add('render', () => (
    <Screenshot
    >
      <Heading>Fooooo</Heading>
    </Screenshot>
  ));
