import React from 'react'
import styled from 'styled-components'
import { Button, Progress, Col, Badge, Collapse, Typography } from 'antd'
import TweenOne from 'rc-tween-one'
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin'
import { useContainer } from 'unstated-next'
import { GameState } from './gameState'
const { Text } = Typography

TweenOne.plugins.push(Children)

const StyleContainer = styled.section`
  display: block;
  width: 100%;
`

const MonkeyOverviewPanel = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 0.5em;
`

const MonkeyMainScreen = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const BananaCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
`

const MonkeyBadge = styled(Badge)`
  .ant-badge-count {
    border-color: #ffeb3b;
    background-color: #ffeb3b;
    color: rgba(0, 0, 0, 0.65);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`

const MonkeyTech = styled.div`
  display: flex;
  padding: 1rem;
  margin: 0.5rem 0;
  color: rgba(0, 0, 0, 0.65);
  border: 1px dashed #d9d9d9;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const MonkeyButton = styled(Button)`
  transition: none;

  :focus {
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border-color: #d9d9d9;
  }

  :active {
    border-color: #ffeb3b;
    background-color: #ffeb3b;
  }
`

const MoneyGamePresentation = props => {
  const {
    bananas,
    recruits,
    trees,
    plantations,
    nanactories,
    calcBuildPercentRemaining,
    calcCost,
    canPurchase,
    collectBanana,
    recruitMonkey,
    plantTree,
    buildPlantation,
    spawnNanactory
  } = useContainer(GameState)
  return (
    <StyleContainer id="MonkeyGame">
      <MonkeyOverviewPanel className="monkey-overview">
        <BananaCount>
          <TweenOne
            animation={{
              Children: {
                value: typeof bananas === 'number' ? bananas : 0
              },
              duration: 5
            }}
            style={{ fontSize: 44 }}
          >
            0
          </TweenOne>
          Total Bananas
        </BananaCount>
        <MonkeyTech className="monkey-tech">
          <Col span={24}>
            <MonkeyButton block size="large" onClick={() => collectBanana(1)}>
              Collect Banana
            </MonkeyButton>
          </Col>
        </MonkeyTech>
      </MonkeyOverviewPanel>
      <MonkeyMainScreen className="monkey-main-screen">
        <Collapse style={{ width: '100%' }}>
          <Collapse.Panel
            header={
              <Text>
                Technologies ~ <i>You'll wanna use these...</i>
              </Text>
            }
            key="1"
            accordion
            bordered={false}
          >
            <MonkeyTech className="monkey-tech">
              <Col xs={12} md={6}>
                <MonkeyBadge
                  overflowCount={1000000}
                  count={calcCost('recruits')}
                >
                  <MonkeyButton
                    onClick={() => recruitMonkey(1)}
                    disabled={!canPurchase('recruits')}
                  >
                    Recruit Monkey ({recruits})
                  </MonkeyButton>
                </MonkeyBadge>
              </Col>
              <Col xs={12} md={18}>
                <Progress
                  percent={
                    recruits > 0 ? calcBuildPercentRemaining('recruits') : 0
                  }
                  status="active"
                  showInfo={false}
                />
              </Col>
            </MonkeyTech>
            <MonkeyTech className="monkey-tech">
              <Col xs={12} md={6}>
                <MonkeyBadge overflowCount={1000000} count={calcCost('trees')}>
                  <MonkeyButton
                    onClick={() => plantTree(1)}
                    disabled={!canPurchase('trees')}
                  >
                    Plant Tree ({trees})
                  </MonkeyButton>
                </MonkeyBadge>
              </Col>
              <Col xs={12} md={18}>
                <Progress
                  percent={trees > 0 ? calcBuildPercentRemaining('trees') : 0}
                  status="active"
                  showInfo={false}
                />
              </Col>
            </MonkeyTech>
            <MonkeyTech className="monkey-tech">
              <Col xs={12} md={6}>
                <MonkeyBadge
                  overflowCount={1000000}
                  count={calcCost('plantations')}
                >
                  <MonkeyButton
                    onClick={() => buildPlantation(1)}
                    disabled={!canPurchase('plantations')}
                  >
                    Plant Plantation ({plantations})
                  </MonkeyButton>
                </MonkeyBadge>
              </Col>
              <Col xs={12} md={18}>
                <Progress
                  percent={
                    plantations > 0
                      ? calcBuildPercentRemaining('plantations')
                      : 0
                  }
                  status="active"
                  showInfo={false}
                />
              </Col>
            </MonkeyTech>
            <MonkeyTech className="monkey-tech">
              <Col xs={12} md={6}>
                <MonkeyBadge
                  overflowCount={1000000}
                  count={calcCost('nanactories')}
                >
                  <MonkeyButton
                    onClick={() => spawnNanactory(1)}
                    disabled={!canPurchase('nanactories')}
                  >
                    Build Nanactory ({nanactories})
                  </MonkeyButton>
                </MonkeyBadge>
              </Col>
              <Col xs={12} md={18}>
                <Progress
                  percent={
                    nanactories > 0
                      ? calcBuildPercentRemaining('nanactories')
                      : 0
                  }
                  status="active"
                  showInfo={false}
                />
              </Col>
            </MonkeyTech>
          </Collapse.Panel>
        </Collapse>
      </MonkeyMainScreen>
    </StyleContainer>
  )
}

export default MoneyGamePresentation
