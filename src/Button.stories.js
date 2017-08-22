/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withScreenshot } from '../screenshot-addon/';
import Button from './Button';

storiesOf('Button', module)
  .add('with primary',
    withScreenshot()(() => (
      <Button primary>Primary Button</Button>
    ))
  )
  .add('with secondary',
    withScreenshot()(() => (
      <Button secondary>Secondary Button</Button>
    ))
  )
  .add('not capture', () => (
    <Button primary>Not captured Button</Button>
  ));
