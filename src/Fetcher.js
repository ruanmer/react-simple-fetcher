import React, { PureComponent } from 'react';

export default class Fetcher extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      fetching: true,
      data: null
    }
  }

  async componentDidMount () {
    const { handler } = this.props;

    if (typeof handler === 'function') {
      const data = await handler();

      this.setState({
        fetching: false,
        data
      });
    }
  }

  render () {
    const { component, render, children } = this.props;
    const props = this.state;

    if (component) {
      return React.createElement(component, props);
    }

    if (render) {
      return render(props);
    }

    if (typeof children === 'function') {
      return children(props);
    }

    if (children && React.Children.count(children) > 0) {
      return React.Children.only(children);
    }

    return null;
  }
}
