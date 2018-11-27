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
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._likePost = this._likePost.bind(this);
        this._setPostFetchingState = this._setPostFetchingState.bind(this);
    }

    state = {
        posts: [
            {
                id:      '123',
                comment: 'Hi there!',
                created: 1543330068023,
                likes:   [],
            },
            {
                id:      '456',
                comment: 'Привет!',
                created: 1543330060999,
                likes:   [],
            },
        ],
        isSpinningRun: false,
    };

    _setPostFetchingState(state) {
        this.setState({
            isSpinningRun: state,
        });
    }

    async _createPost(comment) {
        this._setPostFetchingState(true);
        const post = {
            id:      getUniqueID(),
            created: moment().utc(),
            comment,
            likes:   [],
        };
        // console.log(moment().utc());
        await delay(1400);
        this.setState(({ posts }) => ({
            posts:         [ post, ...posts ],
            isSpinningRun: false,
        }));
    }

    async _likePost(id) {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setPostFetchingState(true);

        await delay(1500);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:         newPosts,
            isSpinningRun: false,
        });
    }

    render() {
        const { posts, isSpinningRun } = this.state;

        const postJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _likePost = { this._likePost }
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
