import React, { Component } from 'react';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
// import { Consumer } from 'components/HOC/withProfile';
import { withProfile } from 'components/HOC/withProfile';

//Instrument
import Styles from './styles.m.css';
import { socket } from 'socket/init';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount() {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });
        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _animateStatusBarEnter = (statusBar) => {
        fromTo(statusBar, 2,  { opacity: 0, y: -50 }, { opacity: 1, y: 0 });
    };

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,
        });

        const statusMessage = online ? 'OnLine' : 'OffLine';

        return (
            <Transition
                appear
                in
                onEnter = { this._animateStatusBarEnter }
                timeout = { 2000 }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>{statusMessage}</div>
                        <span />
                    </div>
                    <button>
                        <img src = { avatar } />
                        <span>{currentUserFirstName}</span>
                        &nbsp;
                        <span>{currentUserLastName}</span>
                    </button>
                </section>
            </Transition>
        );
    }
}
