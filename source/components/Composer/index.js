import React, { Component } from 'react';

import avatar from 'theme/assets/Lisa';

export default class Composer extends Component {
    render() {
        return (
            <section>
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
