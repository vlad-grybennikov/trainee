import React from 'react';
import renderer from 'react-test-renderer';
import {Button} from "./";
import 'jest-styled-components';

test('Button should render small', () => {
    const button = renderer.create(<Button size="small" />);
    let tree = button.toJSON();
    //expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('max-width', '300px')
});
test('Button should render normal', () => {
    const button = renderer.create(<Button />);
    let tree = button.toJSON();
    //expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('max-width', '480px')
});