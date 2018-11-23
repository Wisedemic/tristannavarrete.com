import React, { Component } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import capitalize from '../utils/capitalize';
import ImageBackground from '../components/ImageBackground/';

import SortingExamples from '../components/SortingExamples/';
import BoardPanel from '../components/BoardPanel/';

// Disable SSR rendering because aframe requires 'window'
const VRWorld = dynamic(() => import('../components/VRWorld/'), {
    ssr: false
});


const projectTypes = ['Sorting Algorithms', 'Not-A-Trello-Board', 'VRWorld'];

export default class Index extends Component {

    state = { projectType: 'Sorting Algorithms' };

    changeProjectType = projectType => this.setState({ projectType });

    renderProject = type => {
        switch (type) {
            case 'Sorting Algorithms':
                return <SortingExamples />;
            case 'Not-A-Trello-Board':
                return <BoardPanel />;
            case 'VRWorld':
                return <VRWorld />;
            default:
                return <SortingExamples />;
        }
    };

    render() {
        const { projectType } = this.state;

        return (
            <React.Fragment>
                <section className="hero is-dark is-bold is-fullheight">
                    <ImageBackground url={'/static/glasses.jpg'} />
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="columns">
                                <div className="column">
                                    <h1 className="title is-1">A Personal Collection of Ideas &amp; Projects</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="hero is-light is-bold">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h2 className="title is-2">Feel free to play around!</h2>
                            <div className="tabs is-toggle is-boxed is-fullwidth">
                                <ul>
                                    {projectTypes.map(type => type === projectType ? (
                                        <li key={type} className="is-active">
                                            <a>{type}</a>
                                        </li>
                                    ) : (
                                            <li key={type} style={{ backgroundColor: 'white' }}>
                                                <a onClick={() => this.changeProjectType(type)}>{type}</a>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="box">
                                {this.renderProject(projectType)}
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}



