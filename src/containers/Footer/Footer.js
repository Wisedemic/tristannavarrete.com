import React from 'react'

const Footer = props => (
  <footer className="hero is-white" {...props}>
    <div className="hero-body" style={{ padding: '1.5rem' }}>
      <div
        className="container has-text-centered"
        style={{ width: '100%', maxWidth: '100%' }}
      >
        <div className="columns">
          <div className="column">
            <p className="content">Made by Tristan Navarrete &copy; 2020</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
