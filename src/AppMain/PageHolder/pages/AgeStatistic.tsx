import React from 'react';
import axios from 'axios'

type Column = {
    department: string,
    under18: string,
    age18_21: string,
    age22_24: string,
    age25_29: string,
    age30_34: string,
    age35_39: string,
    age40_44: string,
    age45_49: string,
    age50_54: string,
    age55_59: string,
    age60_64: string,
    age65_69: string,
    age70_74: string,
    age75: string,
}

type TState = {
    now: string,
    data: Column [],
}


class AgeStatistic extends React.Component<{}, TState> {
    public state = {
        now: "123",
        data: []
    };

    sendReq = (): void => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/ageStatistic/',
        })
            .then((response) => {
                console.log(response.data);

                this.setState({
                    data: response.data
                })
            })
            .catch(function (error) {
                alert(error);
            });


    };


    render() {
        const {data} = this.state;
        return (
            <div>AgeStatistic
                <button onClick={this.sendReq}>click</button>
                {data}
            </div>
        );
    }

}

export default AgeStatistic;