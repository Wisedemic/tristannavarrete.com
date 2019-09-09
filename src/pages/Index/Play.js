import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import SortingExamples from '../../containers/SortingExamples'
import NotATrelloBoard from '../../containers/NotATrelloBoard'
import { Tabs } from 'antd'

const { TabPane } = Tabs
const disableSsr = { ssr: false }

// Disable SSR rendering because aframe requires 'window'
const VRWorld = dynamic(() => import('../../containers/VRWorld'), disableSsr)
const MonkeyGame = dynamic(() => import('../../containers/MonkeyGame'), disableSsr)

const PlayTabs = styled(Tabs)`
  && {
    > .ant-tabs-bar {
      margin-bottom: 0;
    }
  }
`

export default () => {
  return (
    <section id="play" className="hero is-white">
      <div className="hero-body" style={{ display: 'block' }}>
        <div className="container">
          <h3 className="title is-2">Play</h3>
          <div className="columns is-centered">
            <div className="column">
              <PlayTabs className="playtabs" type="card" defaultActiveKey="1" tabPosition="top">
                <TabPane tab="Not-A-Trello-Board" key="1">
                  <NotATrelloBoard />
                </TabPane>
                <TabPane tab="MonkeyGame" key="2">
                  <MonkeyGame />
                </TabPane>
                <TabPane tab="Sorting Algorithms" key="3">
                  <SortingExamples />
                </TabPane>
                <TabPane tab="VRWorld" key="4">
                  <VRWorld />
                </TabPane>
              </PlayTabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
