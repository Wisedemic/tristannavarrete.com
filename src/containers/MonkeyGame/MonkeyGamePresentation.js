import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Button, Progress, Row, Col, Badge, Collapse } from 'antd'
import TweenOne from 'rc-tween-one'
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin'
import { useContainer } from 'unstated-next'
import { GameState } from './gameState'

TweenOne.plugins.push(Children)

const MonkeyBadge = styled(Badge)`
  .ant-badge-count {
    border-color: #ffeb3b;
    background-color: #ffeb3b;
    color: rgba(0, 0, 0, 0.65);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`

const MonkeyTech = styled(Row)`
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
    <Fragment>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <TweenOne
            animation={{
              Children: {
                value: typeof bananas === 'number' ? bananas : 0
              },
              duration: 5
            }}
            style={{ fontSize: 56, marginBottom: 12 }}
          >
            0
          </TweenOne>
        </Col>
        <Col span={8}></Col>
      </Row>
      <MonkeyTech>
        <Col span={24}>
          <MonkeyButton block size="large" onClick={() => collectBanana(1)}>
            Collect Banana
          </MonkeyButton>
        </Col>
      </MonkeyTech>
      <Collapse>
        <Collapse.Panel header="Technologies" key="1" accordion bordered={false}>
          <MonkeyTech>
            <Col xs={12} md={6}>
              <MonkeyBadge overflowCount={1000000} count={calcCost('recruits')}>
                <MonkeyButton onClick={() => recruitMonkey(1)} disabled={!canPurchase('recruits')}>
                  Recruit Monkey ({recruits})
                </MonkeyButton>
              </MonkeyBadge>
            </Col>
            <Col xs={12} md={18}>
              <Progress
                percent={recruits > 0 ? calcBuildPercentRemaining('recruits') : 0}
                status="active"
                showInfo={false}
              />
            </Col>
          </MonkeyTech>
          <MonkeyTech>
            <Col xs={12} md={6}>
              <MonkeyBadge overflowCount={1000000} count={calcCost('trees')}>
                <MonkeyButton onClick={() => plantTree(1)} disabled={!canPurchase('trees')}>
                  Plant Tree ({trees})
                </MonkeyButton>
              </MonkeyBadge>
            </Col>
            <Col xs={12} md={18}>
              <Progress percent={trees > 0 ? calcBuildPercentRemaining('trees') : 0} status="active" showInfo={false} />
            </Col>
          </MonkeyTech>
          <MonkeyTech>
            <Col xs={12} md={6}>
              <MonkeyBadge overflowCount={1000000} count={calcCost('plantations')}>
                <MonkeyButton onClick={() => buildPlantation(1)} disabled={!canPurchase('plantations')}>
                  Plant Plantation ({plantations})
                </MonkeyButton>
              </MonkeyBadge>
            </Col>
            <Col xs={12} md={18}>
              <Progress
                percent={plantations > 0 ? calcBuildPercentRemaining('plantations') : 0}
                status="active"
                showInfo={false}
              />
            </Col>
          </MonkeyTech>
          <MonkeyTech>
            <Col xs={12} md={6}>
              <MonkeyBadge overflowCount={1000000} count={calcCost('nanactories')}>
                <MonkeyButton onClick={() => spawnNanactory(1)} disabled={!canPurchase('nanactories')}>
                  Build Nanactory ({nanactories})
                </MonkeyButton>
              </MonkeyBadge>
            </Col>
            <Col xs={12} md={18}>
              <Progress
                percent={nanactories > 0 ? calcBuildPercentRemaining('nanactories') : 0}
                status="active"
                showInfo={false}
              />
            </Col>
          </MonkeyTech>
        </Collapse.Panel>
      </Collapse>
    </Fragment>
  )
}

export default MoneyGamePresentation
