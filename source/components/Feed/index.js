// Core
import React, { Component } from 'react';
//Component
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
//Instrument
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            { id: 123, comment: 'Hi there!', created: 1526825076849 },
            { id: 456, comment: 'Привет!', created: 1526825065558 },
        ],
        isSpinningRun: false,
    };

    render() {
        const { posts, isSpinningRun } = this.state;

        const postJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinningRun } />
                <StatusBar />
                <Composer />
                {postJSX}
            </section>
        );
    }
}
