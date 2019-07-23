import React                               from 'react';
import axios                               from 'axios'
import './styles.scss'
import { Table }                           from "../../../components/Table";
import { csvStringMaker, dateTransformer } from "../../../utils";
import { ReactComponent as Download }      from '../assets/download.svg'
import { Diagramm }                        from "../../../components/Diagramm";
import Menu                                from "../../../components/Menu";

export type TState = {
    data: Column[],
    dateStart: string,
    dateEnd: string,
    dep: string,
}

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

const headers = [
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
];

class AgeStatistic extends React.Component<{}, TState> {
    state: TState = {
        data: [],
        dateStart: '2014-01-01',
        dateEnd: '2018-01-01',
        dep: '',
    };

    componentDidMount(): void {
        this.sendReq();
    }

    componentDidUpdate(): void {
        csvStringMaker(this.state.data);
    }

    normalizeAgeData = (data: any[]): Column[] => {
        return data.map((item: any) => {
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
    };

    sendReq = (): void => {
        const { dateStart, dateEnd, dep } = this.state;
        axios({
            method: 'post',
            url: 'http://localhost:3001/ageStatistic/',
            data: {
                dateStart: dateStart,
                dateEnd: dateEnd,
                dep: dep,
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    data: this.normalizeAgeData(response.data)
                });
                console.log(this.state.data)
            })
            .catch(function (error) {
                alert(error);
            });


    };

    dateStartChange = (date: string) => {
        this.setState({
            dateStart: date !== '' ? dateTransformer(date) : '2014-01-01'
        });

    };

    dateEndChange = (date: string) => {
        this.setState({
            dateEnd: date !== '' ? dateTransformer(date) : '2040-01-01'
        })
    };

    checkDate(start: string, end: string): boolean {
        return Number.parseInt(start.split('-').join('')) <= Number.parseInt(end.split('-').join(''))
    }

    depChange = (e: any) => {
        this.setState({
            dep: e.target.value.toString()
        })
    };

    render() {

        const { data, dateEnd, dateStart } = this.state;
        return (
            <div className="AgeStatistic">
                <Menu dateStartChange={this.dateStartChange}
                      dateEndChange={this.dateEndChange}
                      sendReq={this.sendReq}
                      depChange={this.depChange}
                      checkDate={this.checkDate(dateStart, dateEnd)}
                />
                <div className="LabelContainer">
                    <div className="header">
                        <h2 className="Label">Статистика по возрастам</h2>
                    </div>
                    <a className={'LinkCsv'} href={csvStringMaker(data)} download="export.csv">Загрузить <Download/>
                    </a>
                </div>
                <Table
                    data={data}
                    headers={headers}
                />
                <div className="header">
                    <h2 className="Label">Статистическая гистограмма по возрастам</h2>
                </div>
                <Diagramm data={data} dataKey={'department'}/>
            </div>
        );
    }

}

export default AgeStatistic;

