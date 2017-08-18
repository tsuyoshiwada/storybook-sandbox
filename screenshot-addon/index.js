import React, { Component } from 'react';
import addons from '@storybook/addons';

export default class Screenshot extends Component {
  constructor(...args) {
    super(...args);
    console.log('===========================');
  }

  render() {
    const {
      children,
      ...rest
    } = this.props;

    const channel = addons.getChannel();

    channel.emit('tsuyoshiwada/foo', 1000);

    return (
      <div {...rest}>
        {children}
      </div>
    );
  }
}
