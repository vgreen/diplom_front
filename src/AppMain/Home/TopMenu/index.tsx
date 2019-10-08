import React from 'react';
import './TopMenu.scss';
import "react-datepicker/dist/react-datepicker.css";

type TProps = {
    setCurrentPage(a:number):void
}

class TopMenu extends React.Component<TProps,{}> {



    render(){
        const { setCurrentPage } = this.props;
        return(
            <div className="WrapperTop">
                <div className="ButtonLink" onClick={() => setCurrentPage(0)}>Статистика по возрастам</div>
                <div className="ButtonLink" onClick={() => setCurrentPage(2)}>Статистика по регионам</div>
                <div className="ButtonLink" onClick={() => setCurrentPage(3)}>Статистика по полу</div>
                <div className="ButtonLink" onClick={() => setCurrentPage(1)}>Статистика по диагнозам</div>
            </div>
        );
    }

}


export default TopMenu;