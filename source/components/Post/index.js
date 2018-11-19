import React, { Component } from 'react';
import moment from 'moment';
//Instrument
import Styles from './styles.m.css';

export default class Post extends Component {
    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post }>
                <img
                    alt = 'avatar'
                    src = { avatar }
                />
                <a>
                    {currentUserFirstName} {currentUserLastName}
                </a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
