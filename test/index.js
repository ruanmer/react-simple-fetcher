import React from 'react';
import renderer from 'react-test-renderer';
import Fetcher from '../src';

const Component = () => <div>Component</div>;

test('should render component prop', () => {
  const tree = renderer.create(
    <Fetcher component={Component} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render prop', () => {
  const tree = renderer.create(
    <Fetcher render={()=> (
      <div>Render</div>
    )} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render children when is function', () => {
  const tree = renderer.create(
    <Fetcher>
      {() => (
        <div>Children Function</div>
      )}
    </Fetcher>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render children', () => {
  const tree = renderer.create(
    <Fetcher>
      <div>Children</div>
    </Fetcher>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
