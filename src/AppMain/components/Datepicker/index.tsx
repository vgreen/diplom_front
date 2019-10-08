import React, { Component } from 'react';
import './Select.scss'


type TItem = {
    value: any,
    text: string,
};

type TProps = {
    defaultString: string,
    items: TItem[],
    title: string,
};
type TState = {};

class Select extends Component<TProps, TState> {


    render() {
        const { items, defaultString, title } = this.props;

        return (
            <div className='Select'>
                <h2 className="Title">{title}</h2>
                <input className='Datepicker' type='date'/>
            </div>
        );
    }
}

export default Select;