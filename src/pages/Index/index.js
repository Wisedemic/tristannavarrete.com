import React from 'react'
import ContactSection from './Contact/'
import TimelineSection from './Timeline'
import ExpertiseSection from './Expertise'
import ExperienceSection from './Experience'
// import PlaySection from './Play'
import Footer from '../../containers/Footer'
import { Typography } from 'antd'
import { Link } from '../../containers/Navigation'
import Texty from 'rc-texty'
import TweenOne from 'rc-tween-one'
import QueueAnim from 'rc-queue-anim'

const { Title, Paragraph } = Typography

function getEnter(e) {
  switch (e.index) {
    case 0:
      return {
        rotate: 90,
        opacity: 0,
        y: -60
      }
    case 10:
    case 1:
      return {
        y: -60,
        x: -10,
        opacity: 0
      }
    case 9:
    case 2:
      return {
        y: -60,
        x: 20,
        opacity: 0
      }
    case 3:
      return {
        y: 60,
        opacity: 0
      }
    case 8:
    case 4:
      return {
        x: 30,
        opacity: 0
      }
    case 5:
      return {
        enter: [
          {
            scale: 2,
            opacity: 0,
            type: 'set'
          },
          { scale: 1.2, opacity: 1, duration: 300 },
          { scale: 0.9, duration: 200 },
          { scale: 1.05, duration: 150 },
          { scale: 1, duration: 100 }
        ],
        leave: {
          opacity: 0,
          scale: 0
        }
      }
    case 6:
      return {
        scale: 0.8,
        x: 30,
        y: -10,
        opacity: 0
      }
    case 7:
      return {
        scale: 0.8,
        x: 30,
        y: 10,
        opacity: 0
      }
    default:
      return {
        opacity: 0
      }
  }
}

export default () => {
  return (
    <React.Fragment>
      <section id="home" className="hero is-primary is-bold is-fullheight">
        {/* <ImageBackground url={'/static/glasses.jpg'} /> */}
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                <QueueAnim delay={450} style={{ height: 255 }}>
                  <h1 key="title" className="title is-1" style={{ opacity: 0 }}>
                    <Texty enter={getEnter} leave={getEnter}>
                      {'Tristan Navarrete'}
                    </Texty>
                  </h1>
                  <h2 key="subtitle" className="subtitle is-3" style={{ opacity: 0 }}>
                    <Texty enter={getEnter} leave={getEnter}>
                      {'Full Stack Developer'}
                    </Texty>
                  </h2>
                  <TweenOne
                    key="divider"
                    style={{
                      width: '60%',
                      height: 2,
                      background: 'whitesmoke',
                      marginBottom: '1rem',
                      opacity: 0
                    }}
                    animation={{ delay: 1000, width: 0, x: 158, type: 'from', ease: 'easeInOutExpo' }}
                  />
                  <Texty key="main-text" delay={1350} mode="random" interval={8} style={{ fontSize: 18, opacity: 0 }}>
                    I am an experienced agile developer, providing robust solutions to any problem using proven
                    scalability and optimization techniques for both frontend and backend codebases.
                  </Texty>
                  <QueueAnim key="main-button" delay={5000} style={{ opacity: 0 }}>
                    <Link
                      key="banner-contact-me"
                      href="#contact"
                      className="button is-medium is-outlined is-white"
                      style={{ marginTop: '1rem', borderWidth: 2 }}
                    >
                      Let's Start Your Project
                    </Link>
                  </QueueAnim>
                </QueueAnim>
              </div>
              <div className="column is-half"></div>
            </div>
          </div>
        </div>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 100 102"
          height="75"
          width="100%"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="svgcolor-light"
          style={{ marginBottom: -2 }}
        >
          <path d="M0 0 L0 100 L50 100 Z" fill="whitesmoke" stroke="whitesmoke"></path>
          <path d="M100 0 L100 100 L50 100 Z" fill="whitesmoke" stroke="whitesmoke"></path>
        </svg>
      </section>
      <TimelineSection />
      <ExpertiseSection />
      <ExperienceSection />
      {/* <PlaySection /> */}
      <ContactSection />
      <section
        className="hero is-primary is-bold"
        style={{ boxShadow: '0 2px 3px rgba(10,10,10,0.1), 0 0 0 1px rgba(10,10,10,0.1)', marginBottom: 5 }}
      >
        <div className="hero-body" style={{ padding: '1rem' }}>
          <div className="columns is-centered has-text-centered">
            <div className="column">
              <img src="/static/toronto.png" alt="Toronto" style={{ height: '160px' }} />
              <Typography>
                <Title level={4} style={{ color: 'white' }}>
                  Toronto
                </Title>
                <Paragraph style={{ color: 'white' }}>Canada</Paragraph>
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  )
}
