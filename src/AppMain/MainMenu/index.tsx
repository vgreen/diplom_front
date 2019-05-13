import React from 'react';
import './MainMenu.scss';
import {addDays} from "../utils";
import Select from "../components/Select";
import { periods } from '../utils'
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
            <div className="Menu">
                <div className="Wrapper">
                    <Select
                        title='Период'
                        items={periods}
                        defaultString='Выберите период'
                    />
                    <Select
                        title='Код диагноза'
                        items={periods}
                        defaultString='Выберите период'
                    />
                    <Select
                        title='Отделение'
                        items={periods}
                        defaultString='Выберите период'
                    />
                    <Select
                        title='Отделение'
                        items={periods}
                        defaultString='Выберите период'
                    />
                </div>
                <button className="submit">Запустить выборку</button>
            </div>
        );
    }

}


export default Menu;