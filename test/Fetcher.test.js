import React from 'react';
import renderer from 'react-test-renderer';
import Fetcher from '../src';

const mockFetch = () => new Promise((resolve) => {
  setTimeout(() => {
    const data = {
      title: 'Title',
      body: 'Body'
    };

    resolve(data);
  }, 300);
});

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

  it('should receive { fetching, title, body } when handler is defined', async () => {
    let actual = null;

    renderer.create(
      <Fetcher handler={mockFetch} render={props => (actual = props) && null} />
    );

    expect(actual.fetching).toBe(true);

    await mockFetch();

    expect(actual.fetching).toBe(false);
    expect(actual.title).toBe('Title');
    expect(actual.body).toBe('Body');
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

  it('should receive { fetching, title, body } when handler is defined', async () => {
    let actual = null;
    const Component = props => (actual = props) && null;

    renderer.create(
      <Fetcher handler={mockFetch} component={Component} />
    );

    expect(actual.fetching).toBe(true);

    await mockFetch();

    expect(actual.fetching).toBe(false);
    expect(actual.title).toBe('Title');
    expect(actual.body).toBe('Body');
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

  it('should receive { fetching, title, body } when handler is defined', async () => {
    let actual = null;

    renderer.create(
      <Fetcher handler={mockFetch}>
        {props => (actual = props) && null}
      </Fetcher>
    );

    expect(actual.fetching).toBe(true);

    await mockFetch();

    expect(actual.fetching).toBe(false);
    expect(actual.title).toBe('Title');
    expect(actual.body).toBe('Body');
  });
});

describe('<Fetcher handler>', () => {
  it('should receive { fetching } when handler is not defined', () => {
    let actual = null;

    renderer.create(
      <Fetcher render={props => (actual = props) && null} />
    );

    expect(actual.fetching).toBe(false);
  });

  it('should receive { fetching } while fetching', async () => {
    let actual = null;

    renderer.create(
      <Fetcher handler={mockFetch} render={props => (actual = props) && null} />
    );

    expect(actual.fetching).toBe(true);
  });

  it('should receive { fetching, title, body } when fetched', async () => {
    let actual = null;

    renderer.create(
      <Fetcher handler={mockFetch} render={props => (actual = props) && null} />
    );

    await mockFetch();

    expect(actual.fetching).toBe(false);
    expect(actual.title).toBe('Title');
    expect(actual.body).toBe('Body');
  });
});
