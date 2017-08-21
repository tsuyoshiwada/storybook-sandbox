import React, { Component } from 'react';
import addons from '@storybook/addons';
import uuid from 'uuid/v4';

export default class Screenshot extends Component {
  constructor(...args) {
    super(...args);
    this.id = uuid();
    this.channel = addons.getChannel();
    this.channel.emit('foo/constructor', this);
  }

  componentDidMount() {
    this.channel.emit('foo/did', this);
  }

  render() {
    const {
      children,
      ...rest
    } = this.props;

    return (
      <div {...rest}>
        {children}
      </div>
    );
  }
}
