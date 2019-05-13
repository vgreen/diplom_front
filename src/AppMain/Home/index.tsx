import React from 'react';
import TopMenu from "../TopMenu";
import PageHolder from "../PageHolder";
import Menu from "../MainMenu";
import './Home.scss'

class Home extends React.Component<{}, {}> {
    public state = {
        currentPage: 0
    };

    setCurrentPage = (num:number) => {
        this.setState({
            currentPage:num,
        })
    };

    render(){
        const {currentPage} = this.state;
        return(
            <div className="Home">
                <TopMenu setCurrentPage={this.setCurrentPage}/>
                <div className="content">
                    <Menu/>
                    <PageHolder currentPage={currentPage}/>
                </div>
            </div>
        );
    }

}

export default Home;
