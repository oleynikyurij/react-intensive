import React, { Component } from 'react';
import moment from 'moment';
import { string, func, number, array } from 'prop-types';

import Like from 'components/Like';
import { Consumer } from 'components/HOC/withProfile';
//Instrument
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        comment:   string.isRequired,
        created:   number.isRequired,
        id:        string.isRequired,
        _likePost: func.isRequired,
        likes:     array.isRequired,
    };

    render() {
        const { comment, created, _likePost, id, likes } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <span className = { Styles.cross } />
                        <img
                            alt = 'avatar'
                            src = { context.avatar }
                        />
                        <a>
                            {context.currentUserFirstName} {context.currentUserLastName}
                        </a>
                        <time>
                            {moment(created)
                                .utc()
                                .format('MMMM D h:mm:ss a')}
                        </time>
                        <p>{comment}</p>
                        <Like
                            _likePost = { _likePost }
                            id = { id }
                            likes = { likes }
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>
        );
    }
}
