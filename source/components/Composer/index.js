import React, { Component } from 'react';

//Instrument
import avatar from 'theme/assets/Lisa';
import Styles from './styles.m.css';

export default class Composer extends Component {
    render() {
        return (
            <section className = { Styles.composer }>
                <img
                    alt = 'avatar'
                    src = { avatar }
                />
                <form>
                    <textarea placeholder = { 'What\'s on your mind, Lisa?' } />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
