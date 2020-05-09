import React from 'react'
import styled from 'styled-components'
import VisibilitySensor from 'react-on-screen'
import QueueAnim from 'rc-queue-anim'
import { Tag } from 'antd'

const ExpTag = styled(Tag)`
  && {
    border: none;
    font-weight: 400;
    &:hover {
      opacity: 1 !important;
    }
  }
`

const StyledSection = styled.section`
  && {
    .exp-column {
      flex-direction: column;
      transition: none !important;
      padding: 0;
      .exp-column-link {
        display: flex;
        padding-bottom: 1rem;
        font-size: 18px;
        padding-left: 0.5rem;
        color: #3273dc !important;
        .exp-column-link-text {
          text-align: left;
        }
        i {
          display: flex;
          align-items: center;
          font-size: 14px;
          padding-right: 0.5rem;
        }

        &:hover {
          .exp-column-link-text {
            text-decoration: underline;
          }
        }
      }
    }

    .exp-link {
      position: relative;
      padding-bottom: 2rem;
      .exp-link-image {
        overflow: hidden;
        img {
          transition: all 0.5s ease;
          transform: scale(1);
        }
      }
      .exp-link-overlay {
        overflow: hidden;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin-bottom: 2rem;

        .exp-link-overlay-slider {
          transition: all 0.3s ease-in-out;
          transition-property: height, opacity;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 40;
          height: 100%;
          width: 100%;
          opacity: 1;
        }
        .exp-link-overlay-content {
          transition: all 0.4s ease-in-out;
          transition-property: height, opacity;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 40;
          width: 100%;
          height: 0%;
          padding: 0;
          padding-left: 1.5rem;
          opacity: 0;
          background-image: linear-gradient(
            141deg,
            #009e6c 0%,
            #00d1b2 71%,
            #00e7eb 100%
          );
          .exp-link-overlay-title,
          .exp-link-overlay-tags,
          .exp-link-overlay-button {
            transition: opacity 0.4s ease-in-out;
            opacity: 0;
          }
          .exp-link-overlay-title {
            color: white;
            font-weight: 500;
            font-size: 18px;
            line-height: 24px;
          }
          .exp-link-overlay-tags {
            display: flex;
            flex-wrap: wrap;
            .ant-tag {
              margin-top: 0.5rem;
            }
          }
          .exp-link-overlay-button {
            display: inline-flex;
            margin-top: 0.7rem;
            margin-right: auto;
          }
        }
      }

      &:hover {
        .exp-link-image img {
          transform: scale(1.1);
          transition: all 0.5s ease;
        }
        .exp-link-overlay-slider {
          opacity: 0;
          height: 0%;
          padding: 0;
        }
        .exp-link-overlay-content {
          height: 100%;
          opacity: 1;
          .exp-link-overlay-title,
          .exp-link-overlay-tags,
          .exp-link-overlay-button {
            opacity: 1;
          }
        }
      }
    }
  }
`

const ExpLink = ({ href, title, imgSrc, tags = [], ...rest }) => (
  <div className={'exp-link'} {...rest}>
    <div className="exp-link-image">
      <img alt={title} src={imgSrc} />
    </div>
    <div className="exp-link-overlay">
      <div className="exp-link-overlay-slider" />
      <div className="exp-link-overlay-content">
        <h6 className="exp-link-overlay-title">{title}</h6>
        {tags.length > 0 && (
          <div className="exp-link-overlay-tags">
            {tags.map((item, key) => (
              <ExpTag key={key}>{item}</ExpTag>
            ))}
          </div>
        )}
        <a
          className="button is-outlined is-white is-small exp-link-overlay-button"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ borderRadius: '4px' }}
        >
          Visit Project
        </a>
      </div>
    </div>
  </div>
)

const ExpColumnLink = ({ href, title, ...rest }) => (
  <a
    className="exp-column-link"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  >
    <i className="fas fa-check" />
    <span className="exp-column-link-text">{title}</span>
  </a>
)

const items = {
  caseStudies: [
    {
      href: 'https://bmwdct.com/',
      title: 'BWM Dealer Communications Team',
      imgSrc: '/static/bmwdct.png',
      tags: [
        'Admin Dashboard',
        'File Manager',
        'Membership Database',
        'Usage Reporting'
      ]
    },
    {
      href: 'https://forsaledirect.ca/',
      title: 'For Sale Direct',
      imgSrc: '/static/forsaledirect.png',
      tags: [
        'Custom Google Map Search',
        'Custom Backend Database',
        'Property Listing Manager'
      ]
    },
    {
      href: 'https://radiomaria.ca/',
      title: 'Radio Maria',
      imgSrc: '/static/radiomaria3.png',
      tags: ['E-Commerce', 'Live Radio Broadcasting', 'Automatic Donations']
    }
  ],
  columns: [
    [
      {
        href: 'https://ashtonrenovations.com/',
        title: 'Ashton Renovations'
      },
      { href: 'https://asiscanada.ca/', title: 'Asis Canada' },
      { href: 'https://asistoronto.org/', title: 'Asis Toronto' },
      {
        href: 'https://poolrenovations.ca/',
        title: 'Bremner Pool Renovations'
      },
      { href: 'http://canadacompound.com/', title: 'Canada Compound' },
      {
        href: 'https://personaltrainingottawa.ca/',
        title: 'Chris Presta'
      },
      {
        href: 'https://cratesbelleville.com/',
        title: 'Crate Marine Belleville'
      },
      { href: 'https://ctndevelopments.com/', title: 'CTN Developments' }
    ],
    [
      {
        href: 'https://www.industriallandscaping.ca/',
        title: 'Forecast Landscaping'
      },
      { href: 'https://glenoradental.com/', title: 'Glenora Dental' },
      { href: 'https://hockeyneeds.com/', title: 'Hockey Needs' },
      { href: 'https://www.inspirehomes.ca/', title: 'Inspire Homes' },
      { href: 'https://justourwedding.com/', title: 'Just Our Wedding' },
      {
        href: 'https://www.kitchenrefinishingtoronto.com/',
        title: 'Kitchen Refinishing Toronto'
      },
      {
        href: 'https://metropolitandoors.com/',
        title: 'Metropolitan Garage Doors'
      },
      { href: 'https://poolrenovations.ca/', title: 'Pool Renovations' }
    ],
    [
      {
        href: 'https://randmarketresearch.com/',
        title: 'Rand Market Research'
      },
      {
        href: 'https://www.revolution-payments.com/',
        title: 'Revolution Payments'
      },
      {
        href: 'https://stcatherine.ca/',
        title: 'St. Catherine of Siena'
      },
      { href: 'https://www.thepaintguys.ca/', title: 'The Paint Guys' },
      { href: 'https://www.topoftheline.ca/', title: 'Top of The Line' },
      {
        href: 'https://www.torontopaintstore.com/',
        title: 'Toronto Paint Store'
      },
      { href: 'https://triaxis.ca/', title: 'Triaxis' },
      {
        href: 'https://www.villagegreendentures.com/',
        title: 'Village Green Dentures'
      }
    ]
  ]
}

export default () => {
  return (
    <StyledSection id="experience" className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h2 className="title is-3">Experience</h2>
          <h3 className="subtitle is-5">
            <i>~ Featured Case Studies</i>
          </h3>
          <VisibilitySensor
            partialVisibility
            once
            style={{ minHeight: '75vh' }}
          >
            {({ isVisible }) => (
              <QueueAnim type="top" duration={1500}>
                {isVisible && [
                  <QueueAnim
                    className="columns is-desktop exp-links"
                    key="case-studies"
                    type="top"
                    duration={1500}
                  >
                    {items.caseStudies.map((item, key) => (
                      <div className="column" key={`case-study-col-${key}`}>
                        <ExpLink key={`case-study-${key}`} {...item} />
                      </div>
                    ))}
                  </QueueAnim>,
                  <h3 className="subtitle is-5" key="title">
                    Previous Works Include
                  </h3>,
                  <QueueAnim
                    className="columns has-text-centered"
                    key="previous-work"
                    type="top"
                    duration={1500}
                  >
                    {items.columns.map((values, key) => (
                      <div key={`exp-col-${key}`} className="column exp-column">
                        {values.map((value, key) => (
                          <ExpColumnLink
                            key={`exp-col-link-${key}`}
                            {...value}
                          />
                        ))}
                      </div>
                    ))}
                  </QueueAnim>
                ]}
              </QueueAnim>
            )}
          </VisibilitySensor>
        </div>
      </div>
    </StyledSection>
  )
}
