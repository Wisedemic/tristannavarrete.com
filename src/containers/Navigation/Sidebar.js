import styled from 'styled-components'

const NavigationSidebar = styled.section`
  ${props =>
    props.isMenuActive &&
    css`
      display: block !important;
    `}
  @media (max-width: 992px) {
    display: none;
  }
  z-index: 99;
  position: absolute;
  width: 220px;
  top: 0;
  left: 0;
  bottom: 0;
  > div {
    height: 100%;
    > div {
      height: 100%;
      @media (max-width: 992px) {
        margin-top: 50px !important;
      }
    }
  }
  .navbar-item {
    transition: border-width 0.2s ease-in-out;
    &.is-active {
      background-color: #fafafa !important;
      border-left: 4px solid;
    }
    i {
      margin-right: 0.5rem;
    }
  }
  #nav-play {
    border-left: #dc143c;
  }
`
export default NavigationSidebar
