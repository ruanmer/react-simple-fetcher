import React from 'react';
import Fetcher from './Fetcher';

const connectFetcher = handler => Component => {
  const C = props => {
    return (
      <Fetcher handler={handler} render={fetcherProps => (
        <Component {...props} {...fetcherProps} />
      )} />
    );
  }

  C.displayName = `connectFetcher(${Component.displayName || Component.name})`;

  return C;
}

export default connectFetcher;
