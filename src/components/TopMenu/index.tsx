import React from 'react';
import './TopMenu.scss';
import "react-datepicker/dist/react-datepicker.css";


class TopMenu extends React.Component< {},{}> {



    render(){

        return(
            <div className="WrapperTop">
                <div className="ButtonLink">Статистика по возрастам</div>
                <div className="ButtonLink">Статистика по округам</div>
                <div className="ButtonLink">Статистика по полу</div>
                <div className="ButtonLink">Статистика по диагнозам</div>
            </div>
        );
    }

}


export default TopMenu;