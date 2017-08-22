/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import addons from '@storybook/addons';
import uuid from 'uuid/v4';
import imagesLoaded from 'imagesloaded';

class ScreenshotWrapper extends Component {
  constructor(...args) {
    super(...args);
    this.props.channel.emit('screenshot/constructor', this.props.context);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.node);

    imagesLoaded(node, () => {
      setTimeout(() => {
        this.props.channel.emit('screenshot/ready', this.props.context);
      }, this.props.delay);
    });
  }

  handleRef = (node) => {
    this.node = node;
  };

  render() {
    const {
      children,
      delay,
      context,
    } = this.props;

    return (
      <span ref={this.handleRef}>
        {children}
      </span>
    );
  }
}

const defaultOptions = {
  delay: 0,
};

export const withScreenshot = (options = {}) => {
  const opts = {
    ...defaultOptions,
    ...options,
  };

  addons.getChannel().emit('screenshot/increment');

  return storyFn => (context) => {
    const props = {
      ...opts,
      channel: addons.getChannel(),
      context,
    };

    return (
      <ScreenshotWrapper {...props}>
        {storyFn(context)}
      </ScreenshotWrapper>
    );
  };
};
