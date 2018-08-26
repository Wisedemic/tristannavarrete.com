import React from 'react';
import './style.scss';

const LoadingIndicator = () => (
	<section className="hero is-fullheight">
		<div className="hero-body">
			<div className="container has-text-centered">
				<div className="columns">
					<div className="column">
						<h1 className="title">Loading ... </h1>
						<h2 className="subtitle">This may take a moment</h2>
					  <div className="loading-indicator">
					    <div />
					    <div />
					    <div />
					    <div />
					    <div />
					    <div />
					    <div />
					    <div />
					  </div>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default LoadingIndicator;
