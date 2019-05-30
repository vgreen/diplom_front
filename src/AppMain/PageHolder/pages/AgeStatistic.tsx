import React from 'react';
import axios from 'axios'
import './styles.scss'
import {Table} from "../../components/Table";
import {csvStringMaker} from "../../utils/csvMaker";

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

type TProps = {
    date_start: string,
    date_end: string,
    department: string,
}

type TState = {
    data: Column[],
    headers: string[],
}


class AgeStatistic extends React.Component<TProps, TState> {
    public state: TState = {
        data: [],
        headers: [
            'Департамент',
            'до 18',
            '18 - 21',
            '22 - 24',
            '25 - 29',
            '30 - 34',
            '35 - 39',
            '40 - 44',
            '45 - 49',
            '50 - 54',
            '55 - 59',
            '60 - 64',
            '65 - 69',
            '70 - 74',
            '75+',
        ]
    };


    sendReq = (): void => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/ageStatistic/',
            data: {
                dateStart: '2017-01-01',
                dateEnd: '2018-01-01',
                dep: '1'
            }
        })
            .then((response) => {
                console.log(response.data);
                let newData = response.data.map((item: any) => {
                    return {
                        department: item['department'],
                        under18: item['under18'],
                        age18_21: item['18-21'],
                        age22_24: item['22-24'],
                        age25_29: item['25-29'],
                        age30_34: item['30-34'],
                        age35_39: item['35-39'],
                        age40_44: item['40-44'],
                        age45_49: item['45-49'],
                        age50_54: item['50-54'],
                        age55_59: item['55-59'],
                        age60_64: item['60-64'],
                        age65_69: item['65-69'],
                        age70_74: item['70-74'],
                        age75: item['75+'],
                    }
                });
                this.setState({
                    data: newData
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

    componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>, snapshot?: any): void {
        csvStringMaker(this.state.data);
    }


    render() {

        const {data, headers} = this.state;
        return (
            <div className="AgeStatistic">
                <div className="header">
                    <h2 className="Label">Статистика по возрастам</h2>
                </div>

                <Table
                    data={data}
                    //headers = {headers}
                />
                <a href={csvStringMaker(data)} download="export.csv">Clcik</a>
            </div>
        );
    }

}

export default AgeStatistic;

