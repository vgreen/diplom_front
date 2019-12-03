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
    [key:string]:string
}

const headers = [
    'Департамент',
    'Все',
    'Холост',
    'Гражданский брак',
    'Женат/Замужем',
    'Разведен',
    'Вдовств.',
    'Остальные'
];

class SemPologStatistic extends React.Component<{}, TState> {
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


    sendReq = (): void => {
        const { dateStart, dateEnd, dep } = this.state;
        axios({
            method: 'post',
            url: 'http://localhost:3001/semeinPologStatistic/',
            data: {
                dateStart: dateStart,
                dateEnd: dateEnd,
                dep: dep,
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
            <div className="semPologStatistic">
                <Menu dateStartChange={this.dateStartChange}
                      dateEndChange={this.dateEndChange}
                      sendReq={this.sendReq}
                      depChange={this.depChange}
                      checkDate={this.checkDate(dateStart, dateEnd)}
                />
                <div className="LabelContainer">
                    <div className="header">
                        <h2 className="Label">Статистика по семейному положению</h2>
                    </div>
                    <a className={'LinkCsv'} href={csvStringMaker(data)} download="export.csv">Загрузить <Download/>
                    </a>
                </div>
                {data.length !== 0 ?
                <Table
                    data={data}
                    headers={headers}
                />
                : <p>Загрузка.....</p>}
                <div className="header">
                    <h2 className="Label">Статистическая гистограмма по семейному положению</h2>
                </div>
                <Diagramm dataMax={4000} data={data} dataKey={'department'}/>
            </div>
        );
    }

}

export default SemPologStatistic;

