// Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

//Component
import { withProfile } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Postman from 'components/Postman';
//Instrument
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';

@withProfile
export default class Feed extends Component {
    state = {
        posts:         [],
        isSpinningRun: false,
    };

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });
        socket.on('remove', (postJSON) => {
            const { data: removePost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removePost.id),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
    }

    _setPostFetchingState = (state) => {
        this.setState({
            isSpinningRun: state,
        });
    };

    _fetchPosts = async () => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isSpinningRun: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:         [ post, ...posts ],
            isSpinningRun: false,
        }));
    };

    _likePost = async (id) => {
        this._setPostFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();
        // console.log(likedPost);
        this.setState(({ posts }) => ({
            posts:         posts.map((post) => post.id === likedPost.id ? likedPost : post),
            isSpinningRun: false,
        }));
    };

    // удаление поста
    _deletePost = async (id) => {
        this._setPostFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts:         posts.filter((post) => post.id !== id),
            isSpinningRun: false,
        }));
    };

    _animateComposerEnter = (composer) => {
        fromTo(composer, 3, { opacity: 0, rotationX: 100 }, { opacity: 1, rotationX: 0 });
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
                <Transition
                    appear
                    in
                    onEnter = { this._animateComposerEnter }
                    timeout = { 3000 }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                <Postman />
                {postJSX}
            </section>
        );
    }
}
