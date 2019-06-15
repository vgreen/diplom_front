import React, { Component } from 'react';
import './InputM.scss'
import InputMask from "react-input-mask";

type TProps = {
    title: string,
    onBlur(a: string): any,
    checkDate: boolean,
};
type TState = {
    checked: boolean
};

class InputM extends Component<TProps, TState> {

    state = {
        checked: true
    };

    checkValid = (str: string) => {
        if (str.length === 10) {
            const arr = str.split('-').map(i => Number.parseInt(i));
            return arr[0] > 0 && arr[0] < 32
                && arr[1] > 0 && arr[1] < 13
                && arr[2] <= (new Date()).getFullYear()
                && arr[2] > 1000
        } else {
            return false
        }
    };

    setFlag = (str: string) => {
        this.setState({
            checked: this.checkValid(str)
        })
    };

    handleBlur = (e: any) => {
        const { onBlur } = this.props,
            { checked } = this.state,
            str = e.target.value;
        this.setFlag(str);
        console.log(str + (new Date()).getFullYear());
        if (checked) onBlur(str)
    };

    render() {
        const { title, checkDate } = this.props,
            { checked } = this.state;

        return (
            <div className='InputM'>
                <h2 className="Title">{title}</h2>
                <InputMask className={checked ? 'normalInp' : 'errorInp'} mask="99-99-9999" onBlur={this.handleBlur}/>
                <p className={checked && checkDate ? 'NoMes' : 'Message'}> Неверно введена информация </p>
            </div>
        );
    }
}

export default InputM;