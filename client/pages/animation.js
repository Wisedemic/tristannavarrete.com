import React, { Component } from 'react';
import Link from 'next/link';

import { withFeathers } from '../hoc/Feathers/';

class Animation extends Component {
    state = { users: [] };

    componentDidMount() {
        this.users = this.props.feathers.service('tests').watch().find().subscribe(users => {
            this.setState({ users });
        });
    }

    componentWillUnmount() {
        this.users.unsubscribe();
    }

    render() {
        return (
            <section className="hero is-fullheight is-info is-bold">
                <div className="hero-body">
                    <div className="container">
                        <Link href="/about">
                            <button className="button is-warning">
                                About Page
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default withFeathers(Animation);