import React from 'react';
import './TopMenu.scss';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type TState ={
    startPeriod:Date,
    endPeriod:Date,
}

class TopMenu extends React.Component< {},TState> {
    public state = {
        startPeriod: new Date(),
        endPeriod: TopMenu.addDays(new Date(), 3),
    };

    static addDays(date:any , numberOfDaysToAdd:number):Date{
        return date.setDate(date.getDate() + numberOfDaysToAdd);
    }

    handleChangeStartPeriod = (date:Date) => {
        this.setState({
            startPeriod: date
        });
    };

    handleChangeEndPeriod = (date:Date) => {
        this.setState({
            endPeriod: date
        });
    };

    render(){

        const {startPeriod, endPeriod} = this.state;

        return(
            <div className="WrapperTop">
                <DatePicker
                    selected={startPeriod}
                    onChange={this.handleChangeStartPeriod}
                    dateFormat="d/ MM/ yyyy"
                />
                <DatePicker
                    selected={endPeriod}
                    onChange={this.handleChangeEndPeriod}
                    dateFormat="d/ MM/ yyyy"
                />
            </div>
        );
    }

}


export default TopMenu;