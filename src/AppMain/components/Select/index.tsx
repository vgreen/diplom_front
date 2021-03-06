import React, { Component } from 'react';
import './Select.scss'


type TItem = {
    value:any,
    text:string,
};

type TProps = {
    defaultString:string,
    items:TItem[],
    title:string,
    onChange(e: any): any,
};

class Select extends Component<TProps, {}> {


    render() {
        const { items, defaultString, title, onChange } = this.props;

        return (
            <div className='Select'>
                <h2 className="Title">{title}</h2>
                <select defaultValue='255' onChange={onChange}>
                    <option value='255' disabled>{defaultString}</option>
                    {
                        items.map((item,i) => {
                            return(
                                <option value={item.value} key={i}>{item.text}</option>
                            );
                        })
                    }
                </select>
            </div>
        );
    }
}

export default Select;