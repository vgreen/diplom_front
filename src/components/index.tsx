import React from 'react';
//import Menu from './MainMenu';
import TopMenu from "./TopMenu";
import PageHolder from "./PageHolder";

class Home extends React.Component<{}, {}> {
    public state = {
      currentPage: 0
    };

    render(){
        const {currentPage} = this.state;
        return(
            <>
                <TopMenu/>
                <PageHolder currentPage={currentPage}/>
            </>
        );
    }

}

export default Home;
