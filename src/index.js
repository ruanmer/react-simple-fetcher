import React, { PureComponent } from 'react';

export default class Fetcher extends PureComponent {
  render () {
    const { component, render, children } = this.props;

    if (component) {
      return React.createElement(component);
    }

    if (render) {
      return render();
    }

    if (typeof children === 'function') {
      return children();
    }

    if (children && React.Children.count(children) > 0) {
      return React.Children.only(children);
    }

    return null;
  }
}
