import React, { useState, forwardRef } from 'react'
import { withRouter, useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import { Affix, Divider } from 'antd'

const LinkedInButton = styled.a`
  border-color: #0073b1;
  color: #0073b1;
  width: 100%;

  &:hover {
    color: white;
    background-color: #0073b1;
    border-color: #0073b1;
  }
`

export const Link = forwardRef(({ onClick = undefined, children, href, ...rest }, ref) => {
  const router = useRouter()
  return (
    <a
      ref={ref}
      href={href}
      onClick={e => {
        e.preventDefault()
        if (onClick) onClick()
        if (href.charAt(0) === '#') {
          console.log(`/${href}`)
          router.replace(`/${href}`, `/${href}`, { shallow: true })
        } else {
          router.push(href)
        }
      }}
      {...rest}
    >
      {children}
    </a>
  )
})

const NavigationMobileHeader = styled.div`
  @media (min-width: 993px) {
    display: none;
  }
  margin-bottom: 3.25rem;
  .html-header-anchor {
    .navbar-brand {
      ${props =>
        props.isMenuActive &&
        css`
          margin-left: 220px;
        `}
      .navbar-item {
        padding: 0;
      }
    }
    position: fixed;
    display: flex;
    z-index: 100;
    background-color: white;
    box-shadow: rgba(10, 10, 10, 0.1) 0px 2px 3px, rgba(10, 10, 10, 0.1) 0px 0px 0px 1px;
    height: 3.25rem;
    margin-top: -3.25rem;
    width: 100%;
  }
`

const NavigationSidebar = styled.section`
  ${props =>
    props.isMenuActive &&
    css`
      display: block !important;
    `}
  @media (max-width: 992px) {
    display: none;
  }
  z-index: 30;
  position: absolute;
  width: 220px;
  top: 0;
  left: 0;
  bottom: 0;
  > div {
    > div {
      height: 100%;
    }
    height: 100%;
  }
  .navbar-item {
    transition: border-width 0.2s ease-in-out;
    &.is-active {
      background-color: #fafafa !important;
      border-left: 4px solid;
    }
  }
`

const BodyWrapper = styled.div`
  @media (max-width: 992px) {
    margin-left: unset;
  }
  margin-left: 220px;
`

function Navigation({ router, children }) {
  const [state, setState] = useState({
    isMenuToggled: false,
    activeNavigation: null
  })

  const disableMenu = () => setState({ ...state, isMenuToggled: false })
  const enableMenu = () => setState({ ...state, isMenuToggled: true })
  const isCurrentPage = name => (state.activeNavigation === name ? ' is-active' : '')
  const isMenuActive = state.isMenuToggled ? ' is-active' : ''

  const changeActiveNavigation = name =>
    setState({
      isMenuToggled: false,
      activeNavigation: name
    })

  return (
    <main>
      <NavigationMobileHeader isMenuActive={isMenuActive}>
        <div className="html-header-anchor">
          <div className="navbar-brand">
            <a
              role="button"
              className={`navbar-burger${isMenuActive}`}
              onClick={state.isMenuToggled ? disableMenu : enableMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          {!state.isMenuToggled && (
            <Link
              href="#home"
              className="navbar-item"
              onClick={disableMenu}
              style={{ border: 'none', padding: '0.5rem 1rem' }}
            >
              <p className="title" style={{ color: 'rgb(0, 158, 108)', fontSize: '1rem' }}>
                Tristan Navarrete
                <span
                  className="subtitle"
                  style={{ display: 'block', marginBottom: 0, fontWeight: 400, fontSize: '0.8rem' }}
                >
                  Full Stack Developer
                </span>
              </p>
            </Link>
          )}
        </div>
      </NavigationMobileHeader>
      <NavigationSidebar
        id="navigation"
        role="navigation"
        aria-label="main navigation"
        onBlur={disableMenu}
        isMenuActive={isMenuActive}
      >
        <Affix style={{ height: '100%' }}>
          <div
            style={{
              backgroundColor: 'white',
              height: '100%',
              boxShadow: '0 2px 3px rgba(10, 10, 10, 0.2), 0 0 0 1px rgba(10, 10, 10, 0.1)'
            }}
          >
            <Link
              href="#home"
              className={`navbar-item${isCurrentPage('home')}`}
              onClick={() => changeActiveNavigation('home')}
              style={{ border: 'none', padding: '1rem', backgroundColor: '#fafafa' }}
            >
              <p className="title is-4" style={{ margin: '3rem 0', color: '#009e6c' }}>
                Tristan Navarrete
                <span className="subtitle is-6" style={{ display: 'block', marginBottom: 0, fontWeight: 400 }}>
                  Full Stack Developer
                </span>
              </p>
            </Link>
            <Link
              href="#timeline"
              className={`navbar-item${isCurrentPage('timeline')}`}
              onClick={() => changeActiveNavigation('timeline')}
              style={{ borderLeftColor: '#d3adf7', borderTop: '1px solid #e8e8e8' }}
            >
              <span className="icon" style={{ marginRight: '0.5rem', color: '#d3adf7' }}>
                <i className="fas fa-history" />
              </span>
              <span>Timeline</span>
            </Link>
            <Link
              href="#expertise"
              className={`navbar-item${isCurrentPage('expertise')}`}
              onClick={() => changeActiveNavigation('expertise')}
              style={{ borderLeftColor: '#ff4d4f' }}
            >
              <span className="icon" style={{ marginRight: '0.5rem', color: '#ff4d4f' }}>
                <i className="fas fa-bolt" />
              </span>
              <span>Expertise</span>
            </Link>
            <Link
              href="#experience"
              className={`navbar-item${isCurrentPage('projects')}`}
              onClick={() => changeActiveNavigation('projects')}
              style={{ borderLeftColor: '#AA8347' }}
            >
              <span className="icon" style={{ marginRight: '0.5rem', color: '#AA8347' }}>
                <i className="fas fa-chess" />
              </span>
              <span>Experience</span>
            </Link>
            <Link
              href="#contact"
              className={`navbar-item${isCurrentPage('contact')}`}
              onClick={() => changeActiveNavigation('contact')}
              style={{ borderLeftColor: '#20bc56' }}
            >
              <span className="icon" style={{ marginRight: '0.5rem', color: '#20bc56' }}>
                <i className="fas fa-paper-plane" />
              </span>
              <span>Contact</span>
            </Link>
            <Divider style={{ margin: '0 auto' }} />
            <div className="navbar-item">
              <LinkedInButton
                href="https://www.linkedin.com/in/tristan-navarrete/"
                target="_blank"
                rel="noopener noreferrer"
                className="button is-outlined has-icon"
              >
                <span>LinkedIn</span>
                <span className="icon">
                  <i className="fab fa-linkedin-in" />
                </span>
              </LinkedInButton>
            </div>
            <div className="navbar-item">
              <a
                href="https://github.com/wisedemic/"
                target="_blank"
                rel="noopener noreferrer"
                className="button is-dark is-outlined has-icon"
                style={{ width: '100%' }}
              >
                <span>Github</span>
                <span className="icon">
                  <i className="fab fa-github" />
                </span>
              </a>
            </div>
            <div className="navbar-item">
              <a
                href="https://medium.com/@navarrete.tristan/"
                target="_blank"
                rel="noopener noreferrer"
                className="button is-dark is-outlined has-icon"
                style={{ width: '100%' }}
              >
                <span>Medium</span>
                <span className="icon">
                  <i className="fab fa-medium-m" />
                </span>
              </a>
            </div>
            <Divider style={{ width: '80%', minWidth: '0', margin: '0.5rem auto' }} />
            <div className="navbar-item has-text-centered" style={{ display: 'block', paddingTop: 0 }}>
              <span role="img" aria-label="I {heart} {earth}!">
                <i className="fas fa-heart" style={{ color: '#FF4D4F' }} />{' '}
                <i className="fas fa-globe-americas" style={{ color: '#20bc56' }} />
              </span>
            </div>
          </div>
        </Affix>
      </NavigationSidebar>
      <BodyWrapper>{children}</BodyWrapper>
    </main>
  )

  // return (
  //   <nav className="navbar is-white" id="mainNav" role="navigation" aria-label="main navigation" onBlur={disableMenu}>
  //     <div className="navbar-brand">
  //       <Link href="/">
  //         <a className="navbar-item" onClick={disableMenu}>
  //         </a>
  //       </Link>
  //       <a role="button" className={`navbar-burger${isMenuActive}`} onClick={isMenuToggled ? disableMenu : enableMenu}>
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //       </a>
  //     </div>
  //     <div className={`navbar-menu${isMenuActive}`}>
  //       <div className="navbar-start"></div>
  //       <div className="navbar-end">
  //         {isMenuActive && (
  //           <React.Fragment>
  //             <hr className="navbar-divider" />
  //             <div className="navbar-item has-text-centered">
  //               <p className="content">❤ 🌎</p>
  //             </div>
  //           </React.Fragment>
  //         )}
  //       </div>
  //     </div>
  //   </nav>
  // )
}

export default withRouter(Navigation)
