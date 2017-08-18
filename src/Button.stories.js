import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Screenshot from '../screenshot-addon/';
import Button from './Button';

storiesOf('Button', module)
  .add('with text 1', () => (
    <Button type="button">Primary Button</Button>
  ))
  .add('with text 2', () => (
    <Button type="button">Secondary Button</Button>
  ));
