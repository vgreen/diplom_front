import React from 'react';
import './PageHolder.scss';
import "react-datepicker/dist/react-datepicker.css";
import {AgeStatistic, DiagnoseStatistic, RegionStatistic, SexStatistic} from "./pages";

type TProps = {
    currentPage:number
}


class PageHolder extends React.Component< TProps,{}> {

    static defaultProps={
        currentPage: 0,
    };

    static getPages(){
        return[
            {
                component:<AgeStatistic/>
            },
            {
                component:<DiagnoseStatistic/>
            },
            {
                component:<RegionStatistic/>
            },
            {
                component:<SexStatistic/>
            },
        ]
    }

    renderPage = (currentPageNumber:number) => {
        const pages = PageHolder.getPages();
        return pages[currentPageNumber].component
    };

    render(){
        const {currentPage} = this.props;
        return(

            <div className="PageHolder">
               { this.renderPage(currentPage) }
            </div>
        );
    }

}


export default PageHolder;