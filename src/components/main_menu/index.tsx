import React from 'react';
import './Menu.scss';

class Menu extends React.Component<{}, {}> {
    public state = {
      now: ""
    } 

    render(){
        return(
            <div className="Wrapper">
                <div className="ButtonLink">Статистика по возрастам</div>
                <div className="ButtonLink">Статистика по округам</div>
                <div className="ButtonLink">Статистика по полу</div>
            </div>
        );
    }

}


export default Menu;