import React from 'react';
import './PageHolder.scss';
import "react-datepicker/dist/react-datepicker.css";
import {
    AgeStatistic,
    DiagnoseStatistic,
    RegionStatistic,
    SexStatistic,
    SemPologStatistic,
    PatientTablePsy
} from "./pages";
import PsySostStatistic from "./pages/PsySostStatistic";

type TProps = {
    currentPage: number,
}


class PageHolder extends React.Component< TProps,{}> {

    static defaultProps={
        currentPage: 0,
    };

    public state = {};

    getPages = () => {
        return[
            {
                component: <AgeStatistic/>
            },
            {
                component:<PsySostStatistic/>
            },
            {
                component:<RegionStatistic/>
            },
            {
                component:<SexStatistic/>
            },
            {
                component: <SemPologStatistic/>
            },
            {
                component: <DiagnoseStatistic/>
            },
            {
                component: <PatientTablePsy/>
            },

        ]
    };

    renderPage = (currentPageNumber:number) => {
        const pages = this.getPages();
        return pages[currentPageNumber].component
    };

    setData = (dateStart: string, dateEnd: string, dep: string) => {
        this.setState({
            data: {
                dateS: dateStart,
                dateE: dateEnd,
                dep: dep
            }
        })
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