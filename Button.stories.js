import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../src/Button';

storiesOf('Button', module)
  .add('with text', () => (
    <Button type="button">Primary Button</Button>
  ));
