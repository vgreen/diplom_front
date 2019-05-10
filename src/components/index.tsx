import React from 'react';
import Menu from './main_menu';
import TopMenu from "./top_menu";

class Home extends React.Component<{}, {}> {
    public state = {
      now: ""
    };

    render(){
        return(
            <>
                <Menu/>
                <TopMenu/>
            </>
        );
    }

}

export default Home;
