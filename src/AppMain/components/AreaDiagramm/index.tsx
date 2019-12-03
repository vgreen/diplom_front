import React from 'react';
import './Diagramm.scss'
import {Bar, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, Area,} from 'recharts';

type TProps = {
    data: any[],
    data_2: any[],
    dataKey: string
    dataMax?: number | string
}

function getRandomColor(i: number) {
    const colors = [
        '#8884d8',
        '#f40c0a',
        '#81d88a',
        '#443dd8',
        '#3cd849',
        '#d8c514',
        '#af0596',
        '#8884d8',
        '#f45152',
        '#81d88a',
        '#443dd8',
        '#8f3448',
        '#d8c514',
        '#af0596',
        '#8884d8',
        '#f45152',
        '#81d88a',
        '#443dd8',
        '#8f3448',
        '#d8c514',
        '#af0596',
        '#443dd8',
        '#d85356',
        '#d8c514',
        '#af0596',
        '#8884d8',
        '#8cd0f4',
        '#81d88a',
        '#443dd8',
        '#2e8f1b',
        '#31d869',
        '#af0596',
        '#8884d8',
        '#d787f4',
        '#81d88a',
        '#443dd8',
        '#8f3448',
        '#d8c514',
        '#af0596'

    ];
    return colors[i];
}


export const AreaDiagramm = (props: TProps) => {
    const { data, dataKey, dataMax, data_2 } = props;
    let new_data;

    const renameKeys = (_data:any, prefix:string) => {
        return Object.keys(_data).reduce((obj:{[a:string]:any}, key:string) => {
            obj[`${key + prefix}`] = +_data[key]
            return obj;
        }, {})
    };

    new_data = data && data.map(item => renameKeys(item, '_in'));

    const big_data =  data_2 && new_data ? new_data.map((item:any, key:number) => Object.assign(item, data_2[key])) : data;
    console.log(big_data);
    return (
        <div className="Diagramm">
            <AreaChart
                width={1200}
                height={500}
                data={big_data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={dataKey}/>
                <YAxis domain={[0, dataMax ? dataMax : 2000]}/>
                <Tooltip/>
                <Legend/>
                {data && data[0] && data_2 && data_2[0] &&
                // eslint-disable-next-line array-callback-return
                Object.keys(data[0]).map((item, i) => {
                    if (item !== dataKey) return <Area dataKey={item+'_in'} key={i} fill={getRandomColor(i)}/>;
                })
                }
                {
                    data_2 && data_2[0] &&
                    Object.keys(data_2[0]).map((item, i) => {
                        if (item !== dataKey) return <Area dataKey={item} key={i} fill={getRandomColor(i)}/>;
                    })
                }
            </AreaChart>
        </div>
    );
};

