import React from 'react';
import './Table.scss'

type TProps = {
    data: any[],
    headers?: string[],
}

export const Table = (props: TProps) => {
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
                            <td className="LeftLabel" key={i}> {first}</td>
                            {rest.map((field, key) => <td className="Cell" key={key}> {field}</td>)}
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
};

