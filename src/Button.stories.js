/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Screenshot from '../screenshot-addon/';
import Button from './Button';

storiesOf('Button', module)
  .add('with text 1', () => (
    <Screenshot
    >
      <Button type="button">Primary Button</Button>
    </Screenshot>
  ))
  .add('with text 2', () => (
    <Button type="button">Secondary Button</Button>
  ));
