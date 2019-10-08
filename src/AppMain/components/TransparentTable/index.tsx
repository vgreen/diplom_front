import React from 'react';
import './TransparentTable.scss'

type TProps = {
    data: any[],
    headers?: string[],
}

export const TransparentTable = (props: TProps) => {
    let a: any[] = [], b: any[] = [];
    props.data.forEach((item, i) => {
        const values = Object.values(item),
            [first, ...rest] = values;
        a.push(first);
        b.push(rest[0]);
    });
    return (
        <table>
            <tbody>
            <tr className='Row'>
                {
                    a.map((item) => {
                        return <td className='Cell'> {item}</td>;
                    })
                }
            </tr>
            <tr className='Row'>
                {
                    b.map((item) => {
                        return <td className='Cell'>{item}</td>;
                    })
                }
            </tr>
            </tbody>
        </table>
    );
};

