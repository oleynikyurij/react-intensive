// Core
import React, { Component } from 'react';

//Component
import Feed from 'components/Feed';

//Instrument
import avatar from 'theme/assets/Lisa';

const options = {
    avatar,
    currentUserFirstName: 'Lisa',
    currentUserLastName:  'Simpson',
};

export default class App extends Component {
    render() {
        return <Feed  { ...options }/>;
    }
}
