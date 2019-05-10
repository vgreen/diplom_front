import React from 'react';
import './Menu.scss';
import {addDays} from "../utils";

type TState ={
    startPeriod:Date,
    endPeriod:Date,
}


class Menu extends React.Component<{}, TState> {

    public state = {
        startPeriod: new Date(),
        endPeriod: addDays(new Date(), 3),
    };

    render(){
        return(
            <div className="Wrapper">

            </div>
        );
    }

}


export default Menu;