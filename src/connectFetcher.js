import React from 'react';
import Fetcher from './Fetcher';

const connectFetcher = handler => Component => {
  class C extends React.PureComponent {
    render () {
      return (
        <Fetcher {...this.props} handler={handler} render={fetcherProps => (
          <Component {...this.props} {...fetcherProps} />
        )} />
      );
    }
  }

  C.displayName = `connectFetcher(${Component.displayName || Component.name})`;

  return C;
}

export default connectFetcher;
