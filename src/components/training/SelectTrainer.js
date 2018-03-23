import React, {Component} from 'react'
import Select from '../ui/Select/';

class SelectTrainer extends Component {

    render(){

        return(
            <Select >
                <Select.Option>Carter</Select.Option>
                <Select.Option>Major Pain</Select.Option>
                <Select.Option>Jack</Select.Option>
            </Select>
        )
    }
}
export default SelectTrainer

