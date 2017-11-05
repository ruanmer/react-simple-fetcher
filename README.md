# react-simple-fetcher
[![Build Status](https://travis-ci.org/ruanmer/react-simple-fetcher.svg?branch=master)](https://travis-ci.org/ruanmer/react-simple-fetcher)
[![npm version](https://img.shields.io/npm/v/react-simple-fetcher.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-fetcher)

Simple data fetching for React.

```bash
npm install react-simple-fetcher --save
```

## Usage
You can use as a Component or a Higher-Order Component.

### Component
```js
import React from 'react';
import Fetcher from 'react-simple-fetcher';

class MyComponent extends React.PureComponent {
  handleFetch () {
    return fetch('https://jsonplaceholder.typicode.com/posts/1');
  }

  render () {
    return (
      <Fetcher handler={this.handleFetch} render={({ fetching, data }) => (
        <div>
          {fetching ? (
            'Loading...'
          ) : (
            <div>
              <h3>{data.title}</h3>
              <p>{data.body}</h3>
            </div>
          )}
        </div>
      )} />
    );
  }
}

export default MyComponent;
```

### Higher-Order Component
```js
import React from 'react';
import { connectFetcher } from 'react-simple-fetcher';

const MyComponent = ({ fetching, data }) => (
  <div>
    {fetching ? (
      'Loading...'
    ) : (
      <div>
        <h3>{data.title}</h3>
        <p>{data.body}</h3>
      </div>
    )}
  </div>
);

const handleFetch = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts/1');  
};

export default connectFetcher(handleFetch)(MyComponent);
```

## License

MIT
