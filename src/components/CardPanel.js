import styled from 'styled-components'

const CardPanel = styled.nav`
  position: relative;
`

const CardPanelHeader = styled.div`
  && {
    background: #f8f8f6 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em 0.5em;
    border-top: none !important;
  }
`

const CardPanelBody = styled.div`
  background-color: white;
`
export default ({ title, children }) => (
  <CardPanel className="card-panel panel">
    <CardPanelHeader className="panel-block">
      {title ? title : ''}
    </CardPanelHeader>
    <CardPanelBody className="panel-block">
      {children ? children : ''}
    </CardPanelBody>
  </CardPanel>
)
