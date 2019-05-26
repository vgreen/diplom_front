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
                    (props.headers || Object.keys(props.data[0])).map((item) => {
                        return (
                            <th className="Cell">{item}</th>
                        );
                    })
                }
            </tr>
            {
                props.data.map((item) => {
                    const values = Object.values(item),
                        [first, ...rest] = values;
                    return (
                        <tr className="Row">
                            <td className="LeftLabel"> {first}</td>
                            {rest.map((field: any) => <td className="Cell"> {field}</td>)}
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
};

