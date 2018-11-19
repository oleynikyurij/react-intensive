import React, { Component } from 'react';

import avatar from 'theme/assets/Lisa';

export default class Post extends Component {
    render() {
        return (
            <section>
                <img
                    alt = 'avatar'
                    src = { avatar }
                />
                <a>Lisa Simpson</a>
                <time>Today</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
