import React from 'react'
import { Divider, Tag as _Tag } from 'antd'
import VisibilitySensor from 'react-on-screen'
import QueueAnim from 'rc-queue-anim'
import styled from 'styled-components'

const SkillBox = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0.7rem;
  padding-bottom: 0.2rem;
  background: whitesmoke;
  border-radius: 6px;
  .skill-label {
    margin-top: -1.2rem;
    position: absolute;
    font-size: 16px;
    font-weight: 500;
    top: 0;
  }
`

const Tag = styled(_Tag)`
  @keyframes wiggle {
    0% {
      transform: translate(2px, 0);
    }
    50% {
      transform: translate(-2px, 0);
    }
    100% {
      transform: translate(2px, 0);
    }
  }
  @keyframes shake {
    0% {
      transform: rotate(3deg);
    }
    50% {
      transform: rotate(-3deg);
    }
    100% {
      transform: rotate(3deg);
    }
  }

  animation-delay: 2s;
  animation: wiggle 200ms 2;
  margin-bottom: 8px;
  &:hover {
    animation: shake 200ms infinite;
    animation-timing-function: linear;
  }
`

const skills = {
  frontend: [
    <SkillBox key="skill-1">
      <div className="skill-label">Web API's</div>
      <Tag>HTML / DOM</Tag>
      <Tag>Websocket</Tag>
      <Tag>Web Storage</Tag>
      <Tag>Canvas</Tag>
    </SkillBox>,
    <SkillBox key="skill-2">
      <div className="skill-label">CSS Pre-processors</div>
      <Tag color="red">CSS</Tag>
      <Tag color="purple">SASS/SCSS</Tag>
      <Tag color="blue">LESS</Tag>
    </SkillBox>,
    <SkillBox key="skill-3">
      <div className="skill-label">CSS Frameworks</div>
      <Tag color="purple">Bootstrap</Tag>
      <Tag color="cyan">Bulma.io</Tag>
      <Tag color="blue">Material.io</Tag>
    </SkillBox>,
    <SkillBox key="skill-4">
      <div className="skill-label">Frameworks & Libraries</div>
      <Tag color="blue">jQuery</Tag>
      <Tag color="geekblue">React.js / Next.js</Tag>
      <Tag color="red">CodeIgniter</Tag>
    </SkillBox>,
    <SkillBox key="skill-5">
      <div className="skill-label">Linters & Formatters</div>
      <Tag color="volcano">Prettier</Tag>
      <Tag color="purple">ESLint</Tag>
    </SkillBox>,
    <SkillBox key="skill-6">
      <div className="skill-label">Testing</div>
      <Tag color="volcano">Jest</Tag>
      <Tag color="purple">Enzyme</Tag>
      <Tag color="blue">Cypress</Tag>
    </SkillBox>
  ],
  backend: [
    <SkillBox key="skill-1">
      <div className="skill-label">Languages</div>
      <Tag color="green">Node.js</Tag>
      <Tag color="purple">PHP</Tag>
      <Tag color="">Rust</Tag>
      <Tag color="blue">C++</Tag>
      <Tag color="lime">Javascript (ES7+)</Tag>
      <Tag>Solidity</Tag>
    </SkillBox>,
    <SkillBox key="skill-2">
      <div className="skill-label">Databases</div>
      <Tag color="green">MongoDB</Tag>
      <Tag color="purple">PostgreSQL</Tag>
      <Tag color="purple">MySQL</Tag>
    </SkillBox>,
    <SkillBox key="skill-3">
      <div className="skill-label">CMS</div>
      <Tag color="green">Shopify</Tag>
      <Tag color="blue">WordPress</Tag>
    </SkillBox>,
    <SkillBox key="skill-4">
      <div className="skill-label">Authentication & Authorization</div>
      <Tag>Basic Auth</Tag>
      <Tag>OAuth</Tag>
      <Tag>JWT Auth</Tag>
      <Tag>Passport.js</Tag>
    </SkillBox>,
    <SkillBox key="skill-5">
      <div className="skill-label">Frameworks & Libraries</div>
      <Tag>Express.js</Tag>
      <Tag>Feathers.js</Tag>
      <Tag color="green">Mongoose.js</Tag>
      <Tag color="purple">Knex.js</Tag>
      <Tag color="red">Redis</Tag>
    </SkillBox>,
    <SkillBox key="skill-6">
      <div className="skill-label">View Engines</div>
      <Tag>EJS</Tag>
      <Tag>Handlebars</Tag>
      <Tag>Pug (Jade)</Tag>
    </SkillBox>
  ],
  devOps: [
    <SkillBox key="skill-1">
      <div className="skill-label">Web Servers</div>
      <Tag color="purple">Apache</Tag>
      <Tag color="blue">Nginx</Tag>
    </SkillBox>,
    <SkillBox key="skill-2">
      <div className="skill-label">Networking & Security</div>
      <Tag>HTTP/HTTPS</Tag>
      <Tag>FTP</Tag>
      <Tag>DNS</Tag>
      <Tag>SSL</Tag>
      <Tag>Encryption Standards (AES)</Tag>
    </SkillBox>,
    <SkillBox key="skill-3">
      <div className="skill-label">IaaS/PaaS</div>
      <Tag color="blue">Docker</Tag>
      <Tag color="purple">Heroku</Tag>
      <Tag color="gold">AWS</Tag>
      <Tag color="blue">Google Cloud Platform</Tag>
      <Tag>Zeit Now</Tag>
    </SkillBox>,
    <SkillBox key="skill-4">
      <div className="skill-label">Continuous Integration</div>
      <Tag>Heroku CI</Tag>
      <Tag>Circle CI</Tag>
      <Tag>Jenkins</Tag>
    </SkillBox>,
    <SkillBox key="skill-5">
      <div className="skill-label">Build Tools</div>
      <Tag color="red">Gulp.js</Tag>
      <Tag color="blue">Webpack</Tag>
      <Tag color="red">Rollup</Tag>
      <Tag color="orange">Parcel</Tag>
    </SkillBox>,
    <SkillBox key="skill-6">
      <div className="skill-label">Operating Systems</div>
      <Tag color="blue">Microsoft Windows</Tag>
      <Tag color="geekblue">MacOS</Tag>
      <Tag color="geekblue">Linux</Tag>
      <Tag color="volcano">Ubuntu</Tag>
      <Tag color="purple">CentOS</Tag>
    </SkillBox>
  ]
}

export default () => {
  return (
    <section id="expertise" className="hero is-white is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h2 className="title is-2">Expertise</h2>
          <h3 className="subtitle is-4" style={{ marginBottom: '1.5rem' }}>
            A handful of technologies/methodologies that I have expertise in
          </h3>
          <VisibilitySensor partialVisibility once style={{ minHeight: 650 }}>
            {({ isVisible }) => (
              <QueueAnim className="columns is-desktop" type="top">
                {isVisible && [
                  <QueueAnim type="bottom" key="col-1" className="column">
                    <h6 key="title" className="subtitle is-5 has-text-centered">
                      Frontend
                    </h6>
                    <Divider key="divider" style={{ width: '80%', minWidth: 0, margin: '1rem auto 2rem auto' }} />
                    {skills.frontend}
                  </QueueAnim>,
                  <QueueAnim delay={300} type="bottom" key="col-2" className="column">
                    <h6 key="title" className="subtitle is-5 has-text-centered">
                      Backend
                    </h6>
                    <Divider key="divider" style={{ width: '80%', minWidth: 0, margin: '1rem auto 2rem auto' }} />
                    {skills.backend}
                  </QueueAnim>,
                  <QueueAnim delay={500} type="bottom" key="col-3" className="column">
                    <h6 key="title" className="subtitle is-5 has-text-centered">
                      Dev Ops
                    </h6>
                    <Divider key="divider" style={{ width: '80%', minWidth: 0, margin: '1rem auto 2rem auto' }} />
                    {skills.devOps}
                  </QueueAnim>
                ]}
              </QueueAnim>
            )}
          </VisibilitySensor>
        </div>
      </div>
    </section>
  )
}
