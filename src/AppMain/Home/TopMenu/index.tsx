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
            <>
                <div style={{width:'100%', height:'50px', textAlign:'center', paddingTop:'20px', fontSize:'20pt',
                    background: 'aliceblue'}}>Статистика по состоянию базы до мая 2019 включительно</div>
                <div className="WrapperTop">
                    <div className="ButtonLink" onClick={() => setCurrentPage(0)}>По возрастам</div>
                    <div className="ButtonLink" onClick={() => setCurrentPage(2)}>По регионам</div>
                    <div className="ButtonLink" onClick={() => setCurrentPage(3)}>По полу</div>
                    <div className="ButtonLink" onClick={() => setCurrentPage(1)}>По шкалам псих.сост.</div>
                    <div className="ButtonLink" onClick={() => setCurrentPage(4)}>По семейному положению</div>
                    <div className="ButtonLink" onClick={() => setCurrentPage(5)}>По диагнозам</div>
                </div>
            </>
        );
    }

}


export default TopMenu;