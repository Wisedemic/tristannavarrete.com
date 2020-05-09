import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import SortingExamples from './SortingExamples'
import NotATrelloBoard from './NotATrelloBoard'
import { Tabs, Typography } from 'antd'
import CardPanel from '../components/CardPanel'
const { Text } = Typography

const { TabPane } = Tabs
const disableSsr = { ssr: false }

// Disable SSR rendering because aframe requires 'window'
const VRWorld = dynamic(() => import('./VRWorld'), disableSsr)
const MonkeyGame = dynamic(() => import('./MonkeyGame'), disableSsr)

const PlayTabs = styled(Tabs)`
  && {
    .ant-tabs-card-bar .ant-tabs-tab {
      background: white;
      border-bottom: ;
    }
    .ant-tabs-tab-active {
      background: #f8f8f6 !important;
      border-bottom: #f8f8f6 !important;
    }

    > .ant-tabs-bar {
      margin-bottom: 0;
      .ant-tabs-nav-container {
        display: flex;
        justify-content: center;
      }
    }
  }
`

export default () => {
  return (
    <section id="play" className="hero is-light">
      <div className="hero-body" style={{ display: 'block' }}>
        <div className="container">
          <h3 className="title is-3">Play</h3>
          <h4 className="subtitle is-5">
            <i>~ Websites should be interactive, fun, or both!</i>
          </h4>
          <div className="columns is-centered">
            <div className="column">
              <PlayTabs
                className="playtabs"
                type="card"
                defaultActiveKey="1"
                tabPosition="top"
              >
                <TabPane tab="Not-A-Trello-Board" key="1">
                  <NotATrelloBoard
                    title={
                      <Text>
                        A typical Todo-List app. These Boards are saved to your
                        browser, and you can drag items between boards as well
                      </Text>
                    }
                  />
                </TabPane>
                <TabPane tab="MonkeyGame" key="2">
                  <MonkeyGame
                    title={
                      <Text>
                        Quickly! Collect bananas for these monkeys before they
                        starve!!
                      </Text>
                    }
                  />
                </TabPane>
                <TabPane tab="Sorting Algorithms" key="3">
                  <SortingExamples
                    title={
                      <Text>
                        Sorting algorithms are used to reorder a list into a
                        particular order. Try out these algorithms below to see
                        the differences
                      </Text>
                    }
                  />
                </TabPane>
                {/* <TabPane tab="VRWorld" key="4">
                  <VRWorld />
                </TabPane> */}
              </PlayTabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
