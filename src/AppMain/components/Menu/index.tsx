import React from 'react';
import './Menu.scss';
import Select from "../../components/Select";
import { departments } from "../../utils";
import InputM from "../InputM";


type TProps = {
    dateStartChange(e: any): any,
    dateEndChange(e: any): any,
    depChange(e: any): any,
    sendReq(): void,
    checkDate: boolean
}


class Menu extends React.Component<TProps, {}> {

    f(e: any) {

    }

    render() {
        const { dateStartChange, dateEndChange, sendReq, depChange, checkDate } = this.props;
        return (
            <div className="Menu">
                <div className="Wrapper">
                    <InputM title='Дата начала периода' onBlur={dateStartChange} checkDate={checkDate}/>
                    <InputM title='Дата конца периода' onBlur={dateEndChange} checkDate={checkDate}/>
                    <Select
                        title='Отделение'
                        items={departments}
                        defaultString='Выберите отделение'
                        onChange={depChange}
                    />
                    <Select
                        title='Код диагноза'
                        items={departments}
                        defaultString='Выберите код диагноза'
                        onChange={this.f}
                    />
                </div>
                <button className="submit" onClick={sendReq}>Запустить выборку</button>
            </div>
        );
    }

}


export default Menu;