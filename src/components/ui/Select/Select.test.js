import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {mount} from "enzyme";
import Select from "./";
import 'jest-styled-components';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Select match snapshot', () => {
    const select = renderer.create(
        <Select placeholder="Select" selectedIndex={1}>
            <Select.Option>1</Select.Option>
            <Select.Option>2</Select.Option>
            <Select.Option>4</Select.Option>
        </Select>
    );
    let tree = select.toJSON();
    expect(tree).toMatchSnapshot();
    let wrapper = mount(<Select placeholder="Select" selectedIndex={1}>
        <Select.Option>1</Select.Option>
        <Select.Option>2</Select.Option>
        <Select.Option>4</Select.Option>
    </Select>);
    wrapper.find('Select').first().simulate('click');


})