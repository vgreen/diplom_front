import React from 'react';
import './Diagramm.scss'
import {Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis,} from 'recharts';

type TProps = {
    data: any[],
    data_2: any[],
    dataKey: string
    dataMax?: number | string,
    x_label: string,
    y_label: string
}

function getRandomColor(i: number) {
    const colors = [
        '#f40c0a',
        '#0407d8',
        '#81d88a',
        '#d87017',
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
        '#4343d8',
        '#d85986',
        '#d89914',
        '#19af34',
        '#d31cd8',
        '#f4e811',
        '#1628d8',
        '#7bd881',
        '#e66709',
        '#d8bb2d',
        '#af0596',
        '#8884d8',
        '#33f47f',
        '#d81926',
        '#443dd8',
        '#8f3448',
        '#d8c514',
        '#af0596'

    ];
    return colors[i];
}


export const AreaDiagramm = (props: TProps) => {
    const { data, dataKey, dataMax, data_2, x_label, y_label } = props;
    let new_data;

    const renameKeys = (_data:any, prefix:string) => {
        return Object.keys(_data).reduce((obj:{[a:string]:any}, key:string) => {
            obj[`${key + prefix}`] = +_data[key]
            return obj;
        }, {})
    };

    new_data = data && data.map(item => renameKeys(item, '_income'));

    const big_data =  data_2 && new_data ? new_data.map((item:any, key:number) => Object.assign(item, data_2[key])) : data;
    console.log(big_data);
    return (
        <div className="AreaDiagramm">
            <AreaChart
                width={1200}
                height={500}
                data={big_data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={dataKey} label={{value:x_label, position: 'insideBottomRight', offset: 0}}/>
                <YAxis domain={[0, dataMax ? dataMax : 2000]} label={{value:y_label, angle: -90, position: 'insideLeft'}}/>
                <Tooltip/>
                <Legend margin={{top:100}}/>
                {
                    data && data[0] &&
                    // eslint-disable-next-line array-callback-return
                    Object.keys(data[0]).map((item, i) => {
                        if (item !== dataKey) return <Area dataKey={item+'_income'} key={i} fill={getRandomColor(i)} stroke={'red'}/>;
                    })
                }
                {
                    data_2 && data_2[0] &&
                    Object.keys(data_2[0]).map((item, i) => {
                        if (item !== dataKey) return <Area dataKey={item} key={i+'_out'} fill={getRandomColor(i+1)} stroke={'blue'}/>;
                    })
                }
            </AreaChart>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
};

