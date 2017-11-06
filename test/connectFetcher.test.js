import React from 'react';
import renderer from 'react-test-renderer';
import { connectFetcher } from '../src';


describe('connectFetcher()(Component)', () => {
  it('should render', () => {
    const Component = props => <div>Component</div>;
    const ConnectFetcher = connectFetcher(null)(Component);

    const tree = renderer.create(
      <ConnectFetcher />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should receive { fetching, fake } props', () => {
    let actual = null;
    const Component = props => (actual = props) && null;
    const ConnectFetcher = connectFetcher(null)(Component);

    renderer.create(
      <ConnectFetcher fake="prop" />
    );

    expect(actual.fetching).toBe(true);
    expect(actual.fake).toBe('prop');
  });
});

describe('connectFetcher(fetch)(Component)', () => {
  const mockFetch = () => new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        fake: 'data'
      };

      resolve(data);
    }, 300);
  });

  it('should receive { fetching, fake } after fetch', async () => {
    let actual = null;
    const Component = props => (actual = props) && null;
    const ConnectFetcher = connectFetcher(mockFetch)(Component);

    renderer.create(
      <ConnectFetcher />
    );

    await mockFetch();

    expect(actual.fetching).toBe(false);
    expect(actual.fake).toBe('data');
  });

  it('should pass props to handler', async () => {
    let actual = null;
    const Component = () => null;
    const handleFetch = props => (actual = props) && mockFetch;
    const ConnectFetcher = connectFetcher(handleFetch)(Component);

    renderer.create(
      <ConnectFetcher fake="prop" />
    );

    await mockFetch();

    expect(actual.fake).toBe('prop');
  });
});
