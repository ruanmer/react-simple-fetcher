import React from 'react';
import Fetcher from './Fetcher';

const connectFetcher = handler => Component => {
  class C extends React.PureComponent {
    constructor (props) {
      super(props);

      this.handler = this.handler.bind(this);
    }

    handler () {
      if (typeof handler === 'function') {
        return handler(this.props);
      }
    }

    render () {
      return (
        <Fetcher handler={this.handler} render={fetcherProps => (
          <Component {...this.props} {...fetcherProps} />
        )} />
      );
    }
  }

  C.displayName = `connectFetcher(${Component.displayName || Component.name})`;

  return C;
}

export default connectFetcher;
