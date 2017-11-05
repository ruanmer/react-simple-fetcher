import React from 'react';
import Fetcher from './Fetcher';

const connectFetcher = fetch => Component => {
  const C = props => {
    return (
      <Fetcher fetch={fetch} render={fetcherProps => (
        <Component {...props} {...fetcherProps} />
      )} />
    );
  }

  C.displayName = `connectFetcher(${Component.displayName || Component.name})`;

  return C;
}

export default connectFetcher;
