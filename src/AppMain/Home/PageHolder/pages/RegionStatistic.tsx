import React                          from 'react';
import axios                          from 'axios'
import './styles.scss'
import { Table }                      from "../../../components/Table";
import { csvStringMaker }             from "../../../utils/csvMaker";
import { ReactComponent as Download } from '../assets/download.svg'
import { Diagramm }                   from "../../../components/Diagramm";
import { dateTransformer }            from "../../../utils";
import Menu                           from "../../../components/Menu";


type TState = {
    data: any[],
    dateStart: string,
    dateEnd: string,
    dep: string,
}

const headers = [
    'Код региона',
    'Количество пациентов',
];

class RegionStatistic extends React.Component<{}, TState> {
    public state: TState = {
        data: [],
        dateStart: '2014-01-01',
        dateEnd: '2018-01-01',
        dep: '',
    };

    sendReq = (): void => {
        const { dateStart, dateEnd, dep } = this.state;
        axios({
            method: 'post',
            url: 'http://localhost:3001/regionStatistic/',
            data: {
                dateStart: dateStart,
                dateEnd: dateEnd,
                dep: dep
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

    dateStartChange = (date: string) => {
        this.setState({
            dateStart: dateTransformer(date)
        });

    };

    dateEndChange = (date: string) => {
        this.setState({
            dateEnd: dateTransformer(date)
        })
    };

    checkDate(start: string, end: string): boolean {
        if(start.replace(/\D/,'') !== '' && end.replace('-', '') !== '')
            return Number.parseInt(start.split('-').join('')) <= Number.parseInt(end.split('-').join(''))
        else return true
    }

    depChange = (e: any) => {
        this.setState({
            dep: e.target.value.toString()
        })
    };


    render() {

        const { data, dateStart, dateEnd } = this.state;
        return (
            <div className="RegStatistic">
                <Menu dateStartChange={this.dateStartChange}
                      dateEndChange={this.dateEndChange}
                      sendReq={this.sendReq}
                      depChange={this.depChange}
                      checkDate={this.checkDate(dateStart, dateEnd)}
                />
                <div className="LabelContainer">
                    <div className="header">
                        <h2 className="Label">Статистика по регионам</h2>
                    </div>
                    <a className={'LinkCsv'} href={csvStringMaker(data)} download="export.csv">Загрузить <Download/>
                    </a>
                </div>{
                data.length > 0 ?
                <Table
                    data={data}
                    headers={headers}
                />
            :
            <p>Загрузка .....</p>}
                <div className="header">
                    <h2 className="Label">Статистическая диаграмма по регионам</h2>
                </div>
                <Diagramm data={data.map((item, key )=> key !== 71 && key !== 75 && item)} dataKey={'region_code'} dataMax={100}/>
            </div>
        );
    }

}

export default RegionStatistic;

