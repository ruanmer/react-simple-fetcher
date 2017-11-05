import React from 'react';
import renderer from 'react-test-renderer';
import Fetcher from '../src';

describe('<Fetcher>', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Fetcher />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('<Fetcher render>', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Fetcher render={() => (
        <div>Render</div>
      )} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should receive { fetching } props', () => {
    let actual = null;

    renderer.create(
      <Fetcher render={props => (actual = props) && null} />
    );

    expect(actual.fetching).toBe(true);
  });
});

describe('<Fetcher component>', () => {
  it('should render', () => {
    const Component = props => <div>Component</div>;

    const tree = renderer.create(
      <Fetcher component={Component} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should receive { fetching } props', () => {
    let actual = null;
    const Component = props => (actual = props) && null;

    renderer.create(
      <Fetcher component={Component} />
    );

    expect(actual.fetching).toBe(true);
  });
});

describe('<Fetcher children>', () => {
  it('should render a function', () => {
    const tree = renderer.create(
      <Fetcher>
        {props => <div>Children Function</div>}
      </Fetcher>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render a child', () => {
    const tree = renderer.create(
      <Fetcher>
        <div>Children</div>
      </Fetcher>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should receive { fetching } props', () => {
    let actual = null;

    renderer.create(
      <Fetcher>
        {props => (actual = props) && null}
      </Fetcher>
    );

    expect(actual.fetching).toBe(true);
  });
});

describe('<Fetcher fetch>', () => {
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

    renderer.create(
      <Fetcher handler={mockFetch} render={props => (actual = props) && null} />
    );

    await mockFetch();

    expect(actual.fetching).toBe(false);
    expect(actual.fake).toBe('data');
  });
});
