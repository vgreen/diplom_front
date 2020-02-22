import React from 'react';
import {csvStringMaker, dateTransformer} from "../../../utils";
import axios from "axios";
import Menu from "../../../components/Menu";
import {ReactComponent as Download} from "../assets/download.svg";
import {Table} from "../../../components/Table";
import {TState} from "./semPologenie";


class PatientTablePsy extends React.Component<{}, {}> {
    state: TState = {
        data: [],
        dateStart: '2014-01-01',
        dateEnd: '2018-01-01',
        dep: '',
    };

    componentDidMount(): void {
        this.sendReq();
    }

    sendReq = (): void => {
        const { dateStart, dateEnd, dep } = this.state;
        axios({
            method: 'post',
            url: 'http://localhost:3001/patientsTable/',
            data: {
                dateStart: dateStart,
                dateEnd: dateEnd,
                dep: dep,
            }
        })
            .then((response) => {
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
            dateStart: date !== '' ? dateTransformer(date) : '2018-01-01'
        });

    };

    dateEndChange = (date: string) => {
        this.setState({
            dateEnd: date !== '' ? dateTransformer(date) : '2019-01-01'
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

        const { data, dateEnd, dateStart } = this.state;
        return (
            <>
                <Menu dateStartChange={this.dateStartChange}
                      dateEndChange={this.dateEndChange}
                      sendReq={this.sendReq}
                      depChange={this.depChange}
                      checkDate={this.checkDate(dateStart, dateEnd)}
                />
                {!!data && data.length !== 0 ?
                    <div className="diagnoseStatistic">


                        <div className="LabelContainer">
                            <div className="header">
                                <h2 className="Label">Таблица показателей пациентов</h2>
                            </div>
                            <a className={'LinkCsv'} href={csvStringMaker(data)}
                               download="export.csv">Загрузить <Download/>
                            </a>
                        </div>

                        <Table
                            data={data}
                        />
                    </div>
                    : <p>Загрузка.....</p>
                }
            </>
        );
    }
}

export default PatientTablePsy;