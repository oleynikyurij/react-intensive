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

    _deletePost = () => {
        const { _deletePost, id } = this.props;
        _deletePost(id);
    };

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` ? (
            <span
                className = { Styles.cross }
                onClick = { this._deletePost }
            />
        ) : null;
    };

    render() {
        const { comment, created, _likePost, id, likes, avatar, firstName, lastName } = this.props;

        const cross = this._getCross();

        // throw new Error();

        return (
            <section className = { Styles.post }>
                {cross}
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
