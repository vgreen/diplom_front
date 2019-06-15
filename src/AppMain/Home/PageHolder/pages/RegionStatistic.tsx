import React from 'react';
import axios from 'axios'
import './styles.scss'
import { Table } from "../../../components/Table";
import { csvStringMaker } from "../../../utils/csvMaker";
import { ReactComponent as Download } from '../assets/download.svg'
import { Diagramm } from "../../../components/Diagramm";

type Column = {
    department: string,
    under18: string,
    age18_21: string,
    age22_24: string,
    age25_29: string,
    age30_34: string,
    age35_39: string,
    age40_44: string,
    age45_49: string,
    age50_54: string,
    age55_59: string,
    age60_64: string,
    age65_69: string,
    age70_74: string,
    age75: string,
}


type TState = {
    data: Column[],
}


class RegionStatistic extends React.Component<{}, TState> {
    public state: TState = {
        data: [],
    };

    sendReq = (): void => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/regionStatistic/',
            data: {
                dateStart: '2017-01-01',
                dateEnd: '2018-01-01',
                dep: ''
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    data: response.data
                });
                console.log(this.state.data)
            })
            .catch(function (error) {
                alert(error);
            });


    };

    componentDidMount(): void {
        this.sendReq();
    }

    render() {

        const { data } = this.state;
        return (
            <div className="RegStatistic">
                <div className="LabelContainer">
                    <div className="header">
                        <h2 className="Label">Статистика по регион</h2>
                    </div>
                    <a className={'LinkCsv'} href={csvStringMaker(data)} download="export.csv">Загрузить <Download/>
                    </a>
                </div>
                <Table
                    data={data}
                />
                <div className="header">
                    <h2 className="Label">Статистическая диаграмма по регионам</h2>
                </div>
                <Diagramm data={data} dataKey={'region_code'}/>
            </div>
        );
    }

}

export default RegionStatistic;

