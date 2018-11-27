// Core
import React, { Component } from 'react';
import moment from 'moment';
//Component
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
//Instrument
import Styles from './styles.m.css';
import { getUniqueID } from 'instruments';

export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts: [
            { id: 123, comment: 'Hi there!', created: 1543330068023 },
            { id: 456, comment: 'Привет!', created: 1543330060999 },
        ],
        isSpinningRun: false,
    };

    _createPost(comment) {
        const post = {
            id:      getUniqueID(),
            created: moment().utc(),
            comment,
        };
        // console.log(moment().utc());
        this.setState(({ posts }) => ({
            posts: [ post, ...posts ],
        }));
    }

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
                <Composer _createPost = { this._createPost } />
                {postJSX}
            </section>
        );
    }
}
