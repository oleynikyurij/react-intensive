// Core
import React, { Component } from 'react';

//Component
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

//Instrument
import avatar from 'theme/assets/Lisa';

const options = {
    avatar,
    currentUserFirstName: 'Lisa',
    currentUserLastName:  'Simpson',
};

export default class App extends Component {
    render() {
        return (
            <Provider value = { options }>
                <Feed />;
            </Provider>
        );
    }
}
