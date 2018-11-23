import React from 'react';
import ReactSVG from 'react-svg'
import LoadingImage from './loader.svg';

export default () => (
    <section className="hero is-white is-fullheight">
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="columns is-centered">
                    <div className="column">
                        <figure className="image is-96x96">
                            <ReactSVG src={require('./loader.svg')} alt="Loading ..." />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </section>
);