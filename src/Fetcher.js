import React from 'react';

export default class Fetcher extends React.PureComponent {
  constructor (props) {
    super(props);

    let fetching = true;

    if (typeof props.handler !== 'function') {
      fetching = false;
    }

    this.state = {
      fetching
    }
  }

  componentDidMount () {
    const { handler } = this.props;

    if (typeof handler === 'function') {
      Promise.resolve(handler()).then(data => {
        if (typeof data === 'object') {
          this.setState({
            ...data,
            fetching: false
          });
        } else {
          this.setState({
            fetching: false
          });
        }
      });
    }
  }

  render () {
    const { component, render, children } = this.props;
    const props = { ...this.state };

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
