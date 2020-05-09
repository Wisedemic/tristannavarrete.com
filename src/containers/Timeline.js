import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Icon, Timeline as _Timeline, Typography, Tag } from 'antd'
import VisibilitySensor from 'react-on-screen'
import QueueAnim from 'rc-queue-anim'

const { Title, Paragraph } = Typography

const TimelineDrawerStyles = styled.div`
  position: relative;
  overflow: hidden;
  transition: all 1s ease;
  max-height: ${props => (props.isCollapsed ? '80vh' : 'unset')};
  .gradient-backdrop {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), whitesmoke);
    position: absolute;
    bottom: 0;
    height: 200px;
    width: 100%;
    z-index: 29;
  }
  .timeline-toggle {
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-name: bounce;
    animation-timing-function: ease;  
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    z-index: 30;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      cursor: pointer;
      padding: 0.5rem
      margin: 0 auto;
      font-size: 24px;
      &:hover {
        box-shadow: 0 2px 3px rgba(10,10,10,0), 0 0 0 1px rgba(10,10,10,0.1);  
      }
      box-shadow: 0 2px 3px rgba(10,10,10,0.1), 0 0 0 1px rgba(10,10,10,0.1);
      background-color: white;
    }
  }
  @keyframes bounce {
    0%  { transform: scale(1,1)   translateY(0); }
    10%  { transform: scale(1.05,.95)   translateY(0); }
    50%  { transform: scale(1,1)    translateY(-7px); }
    90%  { transform: scale(.98,1.02)      translateY(0); }
    100%  { transform: scale(1,1)   translateY(0); }
  }
`

const Timeline = styled(_Timeline)`
  && {
    .ant-timeline-item-tail {
      border-left: 2px solid rgba(0, 209, 178, 0.2);
    }
    .ant-timeline-item-head {
      background-color: unset;
      font-size: 18px;
    }

    .ant-timeline-item-right .ant-timeline-item-content {
      width: 48%;
      > div {
        margin-right: 12px;
      }
    }

    .ant-timeline-item-left .ant-timeline-item-content {
      width: 48%;
      left: 51%;
      @media (max-width: 776px) {
        > div {
          margin-left: 5px;
          margin-right: 5px;
        }
        left: 51% !important;
      }
    }
  }
`

const TimelineDot = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  padding-top: 0.4rem;
`

const TimelineCard = styled.div`
  display: inline-block;
  position: relative;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);

  ${({ color }) =>
    color &&
    css`
      border-bottom: 1px solid ${color};
    `}

  .timeline-header {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    background-color: whitesmoke;
    padding: 1rem;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
  }

  .timeline-footer {
    width: 92%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    border-top: 1px solid rgb(0, 0, 0, 0.2);
    padding: 0.5rem 0.5rem 0.5rem 0;
    font-weight: 500;
    font-size: 16px;
    .ant-tag {
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
    }
  }

  .timeline-body {
    padding: 1rem;
  }
`

const items = [
  {
    dot: `🥚`,
    color: 'white',
    headerTitle: '1995',
    title: 'First Breath',
    description:
      'Hatched on September 29th, 1995, a Toronto afternoon\n(The same year the "World Wide Web" was established)',
    tags: ['www.', 'Life', 'Canadian']
  },
  {
    dot: `🐣`,
    color: 'white',
    headerTitle: '1999',
    title: 'Confirmed "Techie"',
    description: `My mother loves to recall a certain "Bring Your Kid To Work" Day when the CEO strolled by, paused and complimented me for my proficiency using a PC. When my father bought an iMac for his business that year, he let me browse the Internet and I became fixed on learning how it worked (I was hooked!).`,
    tags: [
      'Tech-savvy',
      'Internet',
      'Keyboard Skills',
      'Ahead Of The Curve',
      <div style={{ maxHeight: 22 }}>
        <img
          src="/static/iMac.ico"
          style={{ width: 18, height: 18, marginTop: -4 }}
        />
      </div>
    ]
  },
  {
    dot: `🐤`,
    color: 'white',
    headerTitle: '2008',
    title: 'Gifted My First Personal Computer',
    description: `I finally had a PC to myself! My family sparked my engineering passion by teaching me the inner workings, and how to upgrade as well as install parts on my own. My daily routine became a knowledgeable adventure of online research, diving into forums and getting into trouble (I hacked a few games 🙀). I very quickly made a large network of friends all over the world through the games that I played.`,
    tags: [
      'Engineering Passion',
      'Hardware Setup',
      'Troubleshooting',
      'Windows'
    ]
  },
  {
    dot: `🐥`,
    color: 'white',
    headerTitle: '2011',
    title: 'Built My First Custom Computer',
    description: `I became a regular at the computer store and managed to save up enough money to build my own PC, the first of many. I started upgrading it's RAM memory, overclocking the CPU and GPU, installing extra HDD's and SSD's and eventually learned how to partition my drives in order to multi-boot Windows and Ubuntu. My extracurricular consisted of World of Warcraft where my leadership skills evolved rapidly as I took guild management and community into focus.`,
    tags: [
      'Custom PC Assembly',
      'Computer Repair',
      'Computer Maintainance',
      'Ubuntu',
      'World Of Warcraft'
    ]
  },
  {
    dot: `🐔`,
    color: 'white',
    headerTitle: '2013',
    title: 'Excelled And Graduated Highschool',
    description: `In the classroom my favorite classes consisted of Physics, Calculus, Chemistry, and Metal Shop. I couldn't get my fill of science-related knowledge (and still can't), so I created the school's first science club.
    This was considered a major step outside my comfort zone but thanks to my online life, it didn't feel like much of an obstacle. Tackling group management in my online gaming community provided a layer of confidence and skills I needed to run the club. The reliable resource sites I explored online gifted me with knowledge above everyday conversation, keeping me in this respected leadership role. I was just happy to have a offline community where I could continue to thrive while pursuing my passions.`,
    tags: [
      'High School Diploma',
      'Advanced Functions',
      'Leadership',
      'Reasearch Development',
      'Time Management',
      'Strategic Thinking'
    ]
  },
  {
    dot: `🏫`,
    color: 'white',
    headerTitle: '2014',
    title: 'Selected To Attend Carleton University',
    description: `"Photonics and Laser Technology (B.S)" furthered my understanding of Mathematics Physics in many ways. I decided to start a study group to help tutor some classmates and of course, they tutored me eventually becoming deep learning connections for life. \nI took a programming course which taught me the fundamentals of Computer Science using C++, which amazingly transformed my mindset, embedding daily programming routines into my lifestyle. Something I will never forget about my education here was the 12+ hour lab all-nighter's that taught me self discipline, perseverance, and how see a project through to it's conclusion.`,
    tags: [
      'Math for Photonics',
      'Physics for Photonics',
      'C++',
      'Programming Paradigms',
      'Character Encodings'
    ]
  },
  {
    dot: `📡`,
    color: 'white',
    headerTitle: '2015',
    title: 'Work @ Rogers Communications Inc',
    description: `I graduated from the rigorous internal training program which prepared me with in-depth knowledge of each of their services, ensured I was capable of using the provided company software (AS400, SGI, Vision 21), and to increase customer conversion through closing techniques. \n I might have helped you disconnect your home phone, or sold you a new cellphone, internet package, and TV bundle, but rest assured: I always made the right changes to your account. Finding the best package and price for your account was main my focus, but when no clients were in the store I would enjoy learning about the internal software being used on all the store computers. I had learned valuable skills being a Sales Associate, but that wasn't the direction I wanted to go.`,
    tags: [
      'Active Listening',
      'Rapport Building',
      'Closing Techniques',
      'ISP Product Knowledge',
      'On-site IT Support',
      'Inventory Managment'
    ]
  },
  {
    dot: `👩‍💻`,
    color: 'white',
    headerTitle: '2016',
    title: 'Work @ Silentblast',
    description: `I was in heaven, as my brain-sponge absorbed all this new knowledge about how to manage and maintain a live Apache Web Server with over 100+ clients hosted actively, I quickly learned how to respond to customers, how to manage their hosting accounts, and developed new project websites as they came. Within my first year I suggested the company move in a new direction which proved to receive a profitable return. I also helped develop local and remote website backups as well as maintenance and security protocols that did not exist prior.`,
    tags: [
      'Business Development',
      'Web Server Managment',
      'Web Development',
      'Plugin Development',
      'Web Maintainance',
      'Web Security'
    ]
  },
  {
    dot: `🏫`,
    color: 'white',
    headerTitle: '2018',
    title: 'Selected To Attend Lighthouse Labs',
    description: `After being interviewed to attend the new "Blockchain For Developers" course at Lighthouse Labs, I was extremely honored to be selected, and immediately felt excited to be apart of this community. This course pushed me in a new direction, as my teachers were industry leaders who provided direct insight on best practices and the evolving future of developing a decentralized "Dapp". With my new found motivation I taught myself several technologies within a short amount of time in order to meet the requirements of the course, and to my surprise, I was able to develop a more than just Dapp by the end. \n My effort payed off as I was able to learn an incredible amount while at home as well as in the classroom, enhancing my knowledge of application architecture, security, which opened doors to previously unseen networking opportunities  that I am grateful for today.`,
    tags: [
      'Encryption Standards',
      'Blockchain',
      'Dapp Development',
      'Smart Contracts',
      'Ethereum',
      'Solidity'
    ]
  },
  {
    dot: `👩‍💻`,
    color: 'white',
    headerTitle: '2018',
    title: 'Work @ Scotiabank',
    description: `With my security badge around my neck and laptop in hand I'd find my reserved seat next to my colleagues in the 2nd floor open office. Our team of five members worked alongside four other Full Stack teams in order to rapidly deploy Scotiabank applications worldwide. We practiced using "Agile" methodologies in order collaborate with such a large team of developers, teaching me how to delegate tasks to the correct team, how to communicate effectively throughout all levels of the business hierarchy, and gave me the opportunity to learn by mentoring any colleagues who needed it!`,
    tags: [
      'Team Collaboration',
      'Test Driven Development',
      '"Agile" Development',
      'Token Authentication',
      'PII safeguards'
    ]
  },
  {
    dot: `🎁`,
    color: 'white',
    headerTitle: 'Today',
    title: 'Philomath',
    description: `When I'm not behind a computer, you may find me teaching myself electrical engineering using an Arduino, or studying iconic leaders at the bookstore in town. When my eyes aren't glued to the screen or my head isn't hidden in a book, I live out my days continuously in the brain of an active Philomath.`,
    tags: ['Arduino', 'Machine Learning', 'Docker', 'Kubernetes']
  }
]

const scrollToRef = ref => {
  window.scrollTo(0, ref.current.offsetHeight)
}

const ForwardedRefsDiv = React.forwardRef((props, ref) => (
  <div ref={ref} {...props}>
    {props.children}
  </div>
))

const TimelineDrawer = ({
  isCollapsed,
  handleOpen,
  handleClose,
  children,
  ...rest
}) => {
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)
  const handleClick = () => {
    if (isCollapsed) {
      handleOpen()
    } else {
      executeScroll()
      handleClose()
    }
  }

  return (
    <TimelineDrawerStyles {...rest} isCollapsed={isCollapsed} ref={myRef}>
      {isCollapsed && (
        <React.Fragment>
          <div className="timeline-toggle" onClick={handleClick}>
            <Icon type="arrow-down" />
          </div>
          <div className="gradient-backdrop" />
        </React.Fragment>
      )}
      {children}
    </TimelineDrawerStyles>
  )
}

function renderItems(items) {
  return (
    <VisibilitySensor partialVisibility once style={{ minHeight: 775 }}>
      {({ isVisible }) => (
        <QueueAnim
          type="bottom"
          component={Timeline}
          mode="alternate"
          delay={600}
          duration={1500}
        >
          {isVisible &&
            items.map((item, key) => (
              <ForwardedRefsDiv key={`item-${key}`}>
                <Timeline.Item dot={<TimelineDot>{item.dot}</TimelineDot>}>
                  <TimelineCard color={item.color}>
                    <div className="timeline-header">{item.headerTitle}</div>
                    <Typography className="timeline-body">
                      <Title level={4}>{item.title}</Title>
                      {item.description.split('\n').map((item, key) => (
                        <Paragraph key={key}>{item}</Paragraph>
                      ))}
                    </Typography>
                    <div className="timeline-footer">
                      {item.tags.map((tag, key) => (
                        <Tag key={key}>{tag}</Tag>
                      ))}
                    </div>
                  </TimelineCard>
                </Timeline.Item>
              </ForwardedRefsDiv>
            ))}
        </QueueAnim>
      )}
    </VisibilitySensor>
  )
}

export default () => {
  const [isTimelineCollapsed, setTimelineCollapsed] = useState(true)
  const closeTimeline = () => setTimelineCollapsed(true)
  const openTimeline = () => setTimelineCollapsed(false)
  return (
    <section id="timeline" className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h3 className="title is-2">Timeline</h3>
          <TimelineDrawer
            isCollapsed={isTimelineCollapsed}
            handleOpen={openTimeline}
            handleClose={closeTimeline}
            className="columns is-centered"
          >
            <div className="column">{renderItems(items)}</div>
          </TimelineDrawer>
        </div>
      </div>
    </section>
  )
}
