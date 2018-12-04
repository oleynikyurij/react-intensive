// Core
import React, { Component } from 'react';
import moment from 'moment';
//Component
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
//Instrument
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

@withProfile
export default class Feed extends Component {
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

    _setPostFetchingState = (state) => {
        this.setState({
            isSpinningRun: state,
        });
    };

    _createPost = async (comment) => {
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
    };

    _likePost = async (id) => {
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
    };

    // удаление поста
    _deletePost = async (id) => {
        // console.log('click');
        // this.setState(({ posts }) => {
        //     // находим индекс элемента  который надо удалить
        //     const index = posts.findIndex((el) => el.id === id);
        //     // console.log(index);
        //     // создаём новый массив, без удалённого элемента
        //     const before = posts.slice(0, index);
        //     const after = posts.slice(index + 1);
        //     const newArr = [ ...before, ...after ];

        //     return {
        //         posts: newArr,
        //     };
        // });

        this._setPostFetchingState(true);

        await delay(1000);

        this.setState(({ posts }) => ({
            posts:         posts.filter((post) => post.id !== id),
            isSpinningRun: false,
        }));
    };

    render() {
        const { posts, isSpinningRun } = this.state;

        const postJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _deletePost = { this._deletePost }
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
