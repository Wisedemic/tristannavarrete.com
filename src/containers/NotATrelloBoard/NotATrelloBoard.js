import React, { Component } from 'react'
import Styled from 'styled-components'
import localStorage from 'localStorage'
import TitleForm from './Board/TitleForm'
import Board from './Board'
import { Button, Icon, Card, Typography } from 'antd'
import randomColor from 'randomcolor'
import sleep from '../../utils/sleep'
const { Text } = Typography

const colours = randomColor({ count: 4 })

const StyledPanel = Styled.nav`
	.panel-heading {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.subtitle {
			margin-bottom: 0px;
		}
	}

	#board-wrapper {
		background: white;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.board {
		position: relative;
		height: min-content;
		width: min-content;
		min-width: 240px;
		max-width: 360px;
		margin: 1rem;
		flex: 1 1 160px;
	}

	.board .card-footer .buttons {
		display: flex;
		flex-grow: 1;
		flex-wrap: nowrap;
	}

	.board .overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 2;
		display: flex;
		flex-grow: 1;
		justify-content: center;
    align-items: center;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
	}

	.board-item {
		&:not(:last-child) {
			border-bottom: 1px solid #e8e8e8;
		}
		padding: 0.5rem;
		display: flex;
		justify-content: space-between;
		font-weight: 600;
	}

	.grabbable {
		cursor: move; /* fallback if grab cursor is unsupported */
		cursor: grab;
		cursor: -moz-grab;
		cursor: -webkit-grab;
	}
`

const exampleBoards = [
  {
    category: 'Banana Bread',
    data: ['Milk', 'Banana'],
    colour: colours[0]
  },
  {
    category: 'Cinnamon Rolls',
    data: ['Baking Soda', 'Nuts'],
    colour: colours[1]
  },
  {
    category: 'French Toast',
    data: ['Eggs', 'Bread'],
    colour: colours[2]
  },
  {
    category: 'Funnel Cake',
    data: ['Icing Sugar', 'Vanilla Extract'],
    colour: colours[3]
  }
]

const boards = () => {
  let parsed = JSON.parse(localStorage.getItem('boards'))
  if (parsed && parsed.length > 1) return parsed
  return exampleBoards
}

class NotATrelloBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boards: boards(), // Grab boards from localStorage or use an empty array.
      isCreatingBoard: false,
      saving: false
    }
  }

  // Persist Data to localStorage
  saveData = async data => {
    // Adding a slight delay before saving to make it feel like its being saved.
    await sleep(100)
    this.setState({ saving: true })
    // 1500 so you can read it....
    // Actually save the data now.
    localStorage.setItem('boards', JSON.stringify(data))
    await sleep(500)
    this.setState({ saving: false })
  }

  // Retrieve Data from localStorage
  fetchData = () => {
    localStorage.getItem('boards')
  }

  // Toggle the board creation form.
  toggleCreateTitleForm = () => this.setState({ isCreatingBoard: true })
  // Close the board creation form.
  cancelCreateForm = () => this.setState({ isCreatingBoard: false })

  // Transfer items
  transferItem = (fromItemIndex, fromBoard, data, toBoard, toItemIndex) => {
    if (!fromItemIndex) throw new Error('transferItem requires an "fromItemIndex" arg!')
    if (!fromBoard) throw new Error('transferItem requires a "fromBoard" arg!')
    if (!data) throw new Error('transferItem requires a "data" arg!')
    if (isNaN(toBoard)) throw new Error('transferItem requires a "toBoard" arg!')

    let boards = this.state.boards

    // Remove the item from it's origin
    boards[fromBoard].data = boards[fromBoard].data.filter((_, index) => index != fromItemIndex)

    // Did we drag over an existing item?
    if (!isNaN(toItemIndex)) {
      // Push our new item infront of the existing item.
      boards[toBoard].data.splice(toItemIndex, 0, data)
    } else {
      // Push item into array
      boards[toBoard].data = boards[toBoard].data.concat(data)
    }

    // Save State.
    this.saveData(boards)
    this.setState({ boards })
  }

  // Create a board
  createBoard = values => {
    if (!values.category) {
      throw new Error('createBoard did not receieve a value when attempting to create!')
    }
    // Append new board to boardlist
    const boards = this.state.boards.concat({
      colour: randomColor(),
      category: values.category,
      data: []
    })

    // Save State.
    this.saveData(boards)
    this.setState({ boards, isCreatingBoard: false })
  }

  // Update a board
  updateBoard = (boardIndex, data) => {
    if (typeof boardIndex !== 'number') {
      throw new Error('updateBoard did not receieve a boardIndex when attempting to update this board.')
    } else if (!data) {
      throw new Error('updateBoard did not receieve any data when trying to update!')
    }

    let boards = this.state.boards
    // Update board with new data.
    boards[boardIndex] = data

    // Save State.
    this.saveData(boards)
    this.setState({ boards })
  }

  // Remove a board
  removeBoard = boardIndex => {
    // Filter out the board we want to remove.
    let boards = this.state.boards.filter((_, index) => index !== boardIndex)
    // Save State
    this.saveData(boards)
    this.setState({ boards })
  }

  // Render each board
  renderBoards = boards => {
    if (boards.length < 1) return null
    return boards.map((board, index) => (
      <Board
        key={index}
        colour={board.colour}
        boardIndex={index}
        category={board.category}
        data={board.data}
        actions={{
          transferItem: this.transferItem,
          updateBoard: this.updateBoard,
          removeBoard: this.removeBoard
        }}
      />
    ))
  }

  // Render the panel
  render() {
    const { isCreatingBoard, boards, saving } = this.state
    const { createBoard, renderBoards, toggleCreateTitleForm, cancelCreateForm } = this

    return (
      <StyledPanel id="board-panel" className="panel">
        <div className="panel-block" style={{ flexDirection: 'column', borderTop: 'none' }}>
          <Text>
            A typical Todo-List app. These Boards are saved to your browser, and you can drag items between boards as
            well
            {saving && <Button type="primary" loading shape="circle" style={{ marginLeft: '1rem' }} />}
          </Text>
        </div>
        {/* A style wrapper to create flex-box container for the boards */}
        <div id="board-wrapper" className="panel-block">
          {/* Render all the boards */}
          {renderBoards(boards)}

          {/* Are we trying to create a board? */}
          {isCreatingBoard ? (
            <Card className="board" style={{ maxWidth: 280 }}>
              <TitleForm onSubmit={createBoard} cancelForm={cancelCreateForm} />
            </Card>
          ) : (
            <Button type="dashed" className="board" onClick={toggleCreateTitleForm} style={{ padding: '3.5rem' }}>
              <Icon type="plus" />
              Create Board
            </Button>
          )}
        </div>
      </StyledPanel>
    )
  }
}

export default NotATrelloBoard
