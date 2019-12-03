import React from 'react';
import './Table.scss'

interface TProps {
    data: any[],
    headers?: string[],
    left_names?: {
        // @ts-ignore
        [key:(string | number)]:string
    }
}

type TCounter = {
    [key:string]:number
}

export const Table = (props: TProps) => {

    let counter:TCounter = {};
    if(props.data[0]){

        Object.keys(props.data[0]).forEach((key) => counter[key] = 0);
        console.log(counter);
        props.data.forEach((item) => {
            Object.keys(item).forEach((key) => {
                if(key !== 'department') counter[key] += +item[key]
            })
        });
        console.log(counter);
    }
    return (
        <table>
            <tbody>
            <tr className="Header">
                {
                    props.data[0] &&
                    (props.headers || Object.keys(props.data[0])).map((item, i) => {
                        return (
                            <th className="Cell" key={i}>{item}</th>
                        );
                    })
                }
            </tr>
            {
                props.data.map((item, i) => {
                    const values = Object.values(item),
                        [first, ...rest] = values;
                    return (
                        <tr className="Row" key={i}>
                            <td className="LeftLabel" key={i}> {
                                //@ts-ignore
                                !!props.left_names ? props.left_names[first] : first
                            }</td>
                            {rest.map((field, key) => <td className="Cell" key={key}> {field}</td>)}
                        </tr>
                    );
                })
            }
            <tr className="Row">
                {
                    Object.keys(counter).map((item, i) => {
                        if(item === 'department') return <td className="LeftLabel"> Всего : </td>;
                        else {
                            return <td key={i} className="LeftLabel"> {counter[item]}</td>
                        }
                    })
                }
            </tr>
            </tbody>
        </table>
    );
};

