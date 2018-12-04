import React, { Component } from 'react';
import moment from 'moment';
import { string, func, number, array } from 'prop-types';

import Like from 'components/Like';
// import { Consumer } from 'components/HOC/withProfile';
import { withProfile } from 'components/HOC/withProfile';
//Instrument
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        comment:     string.isRequired,
        created:     number.isRequired,
        id:          string.isRequired,
        _likePost:   func.isRequired,
        likes:       array.isRequired,
        _deletePost: func.isRequired,
    };

    render() {
        const {
            comment,
            created,
            _likePost,
            _deletePost,
            id,
            likes,
            avatar,
            firstName,
            lastName,
        } = this.props;

        // throw new Error();

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } />
                <span
                    className = { Styles.cross }
                    onClick = { () => _deletePost(id) }
                />
                <img
                    alt = 'avatar'
                    src = { avatar }
                />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}
