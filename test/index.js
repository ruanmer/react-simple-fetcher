import React from 'react';
import renderer from 'react-test-renderer';
import Fetcher from '../src';

test('should render component prop', () => {
  const Component = props => <div {...props}>Component</div>;

  const tree = renderer.create(
    <Fetcher component={Component} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render prop', () => {
  const tree = renderer.create(
    <Fetcher render={props => (
      <div {...props}>Render</div>
    )} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render children when is function', () => {
  const tree = renderer.create(
    <Fetcher>
      {props => (
        <div {...props}>Children Function</div>
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
