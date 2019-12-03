import React from 'react';
import './Diagramm.scss'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, } from 'recharts';

type TProps = {
    data: any[],
    data_2?: any[],
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
        '#af0596'

    ];
    return colors[i];
}


export const Diagramm = (props: TProps) => {
    const { data, dataKey, dataMax, data_2 } = props;
    return (
        <div className="Diagramm">
            <BarChart
                width={1200}
                height={500}
                data={data}
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
                        if (item !== dataKey) return <Bar dataKey={item} key={i} fill={getRandomColor(i)}/>;
                    })
                }
                {
                    data_2 && data_2[0] &&
                    Object.keys(data_2[0]).map((item, i) => {
                        if (item !== dataKey) return <Bar dataKey={item} key={i} fill={getRandomColor(i)}/>;
                    })
                }
            </BarChart>
        </div>
    );
};

