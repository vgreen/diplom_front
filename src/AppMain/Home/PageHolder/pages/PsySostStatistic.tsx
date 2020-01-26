import React from 'react';
import axios from 'axios'
import './styles.scss'
import {dateTransformer} from "../../../utils";
import Menu from "../../../components/Menu";
import StatContainer from "../../../components/statContainer";


type TState = {
    data: {
        [key:string]: any
    },
    dateStart: string,
    dateEnd: string,
    dep: string,
    loading:boolean
}

const headers = [
    'Шкала',
    '1 отделение',
    '2 отделение',
    '3 отделение',
    '4 отделение',
    '5 отделение',
    '6 отделение',
    '7 отделение',
    '8 отделение',
    '9 отделение',
    '10 отделение',
    '1 дн ст',
    '2 дн ст',
];

const queryTypes = [
    'SB_in',
    'SB_out',
    'ST_in',
    'ST_out',
    'SG_in',
    'SG_out',
    'LT_in',
    'LT_out'
];

class PsySostStatistic extends React.Component<{}, TState> {
    public state: TState = {
        data: {
        },
        dateStart: '2014-01-01',
        dateEnd: '2025-01-01',
        dep: '',
        loading: false
    };

    sendReq = () => {
        queryTypes.forEach(item => {
            this.sendReqForTable(item)
        })
    }

    sendReqForTable = (type: string): void => {
        const { dateStart, dateEnd, dep } = this.state;
        this.setState({
            loading:true
        })
        axios({
            method: 'post',
            url: 'http://localhost:3001/shkaliStatistic/',
            data: {
                dateStart: dateStart,
                dateEnd: dateEnd,
                dep: dep,
                type: type
            }
        })
            .then((response) => {
                console.log(response.data);
                // @ts-ignore
                this.setState( ({ data }) =>({
                    data:  {
                        ...data,
                        [type]:response.data
                    },
                    loading:false
                }));
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
        return Number.parseInt(start.split('-').join('')) <= Number.parseInt(end.split('-').join(''))
    }

    depChange = (e: any) => {
        this.setState({
            dep: e.target.value.toString()
        })
    };


    render() {

        const { data, dateStart, dateEnd, loading } = this.state;
        return (
            <div className="PsySostStatistic">
                <Menu dateStartChange={this.dateStartChange}
                      dateEndChange={this.dateEndChange}
                      sendReq={this.sendReq}
                      depChange={this.depChange}
                      checkDate={this.checkDate(dateStart, dateEnd)}
                />
                {
                    loading && <div style={{width:'100%', height:'50px', textAlign:'center', paddingTop:'20px'}}>{'Загрузка данных .....'}</div>
                }
                <StatContainer data_in={data['SB_in']} data_out={data['SB_out']} headers={headers} name={'Шкала Бека'}/>
                <br/>
                <StatContainer data_in={data['ST_in']} data_out={data['ST_out']} headers={headers} name={'Ситуационная тревога'}/>
                <br/>
                <StatContainer data_in={data['SG_in']} data_out={data['SG_out']} headers={headers} name={'Шкала Гамильтона'}/>
                <br/>
                <StatContainer data_in={data['LT_in']} data_out={data['LT_out']} headers={headers} name={'Личностная тревога'}/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }

}

export default PsySostStatistic;

