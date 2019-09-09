import React, { Component, createRef } from 'react'
import TitleForm from './TitleForm'
import ItemForm from './ItemForm'
import invertColour from '../../../utils/colourInverter'

import { Empty, Button, Icon, Card, Typography } from 'antd'
const ButtonGroup = Button.Group

const { Paragraph } = Typography

// A component to manage an individual board.
class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditingTitle: false,
      isCreatingItem: false,
      isEditingCurrentItem: false,
      isAttemptingToRemoveItem: false,
      isAttemptingToRemoveBoard: false
    }

    this.form = createRef()
  }

  // This tells the boardPanel to delete this board.
  confirmAttemptToRemoveBoard = () => {
    this.props.actions.removeBoard(this.props.boardIndex)
    this.setState({ isAttemptingToRemoveBoard: false })
  }

  // Toggle the board title editing form
  toggleEditTitle = () => this.setState({ isEditingTitle: true })
  // Toggle the board item creation form.
  toggleCreateItem = () => this.setState({ isCreatingItem: true })
  // Toggle the board edit item form.
  toggleEditItem = id => this.setState({ isEditingCurrentItem: id })
  // Toggle this board into DELETION MODE
  toggleAttemptToRemoveBoard = () => this.setState({ isAttemptingToRemoveBoard: this.props.boardIndex })
  // Toggle this item into DELETION MODE
  toggleAttemptToRemoveItem = id => this.setState({ isAttemptingToRemoveItem: id })

  // Cancel Editing this board title
  cancelEditTitle = () => this.setState({ isEditingTitle: false })
  // Cancel Editing the selected item
  cancelCreateItem = () => this.setState({ isCreatingItem: false })
  // Cancel Editing this board title
  cancelEditItem = () => this.setState({ isEditingCurrentItem: false })
  // Cancel attempt to Remove this board.
  cancelAttemptToRemoveBoard = () => this.setState({ isAttemptingToRemoveBoard: false })
  // Cancel attempt to Remove this item.
  cancelAttemptToRemoveItem = () => this.setState({ isAttemptingToRemoveItem: false })

  // Start dragging an item
  dragStart = (ev, itemIndex, boardIndex, data) => {
    ev.dataTransfer.setData('itemIndex', itemIndex)
    ev.dataTransfer.setData('boardIndex', boardIndex)
    ev.dataTransfer.setData('itemData', data)
  }

  // Ensure dragOver doesn't cause side-effects
  dragOver = ev => ev.preventDefault()

  // On drop, prepare to submit an action to transfer items
  dragDrop = (ev, toBoard, toItemIndex = 0) => {
    let fromBoard = ev.dataTransfer.getData('boardIndex')
    let fromItemIndex = ev.dataTransfer.getData('itemIndex')
    let data = ev.dataTransfer.getData('itemData')
    this.props.actions.transferItem(fromItemIndex, fromBoard, data, Number(toBoard), Number(toItemIndex))
  }

  // This is used to ensure this.props.updateBoard receives all the board data at once.
  prepareBoardForUpdate = (boardIndex, values) => {
    const board = {
      ...values,
      data: this.props.data,
      colour: this.props.colour
    }
    // Submit this to the parent component for saving.
    this.props.actions.updateBoard(boardIndex, board)

    // Update the board state to show the new title without the form.
    this.setState({ isEditingTitle: false })
  }

  // Create an item and add it to this board.
  createItem = async ({ item }) => {
    const index = this.props.boardIndex
    this.props.actions.updateBoard(index, {
      category: this.props.category,
      data: this.props.data.concat(item),
      colour: this.props.colour
    })
    this.setState({ isCreatingItem: false })
  }

  // Update a board item by it's index
  updateItem = (id, values) => {
    let data = this.props.data
    data[id] = values.item
    this.props.actions.updateBoard(this.props.boardIndex, {
      category: this.props.category,
      data,
      colour: this.props.colour
    })
    this.setState({ isEditingCurrentItem: false })
  }

  // Remove a board item by it's index
  removeItem = id => {
    let data = this.props.data.filter((_, index) => id !== index)
    this.props.actions.updateBoard(this.props.boardIndex, {
      category: this.props.category,
      data,
      colour: this.props.colour
    })
    this.setState({ isAttemptingToRemoveItem: false })
  }

  // Render Each Item
  renderItems = items => {
    if (items.length > 0) {
      return items.map((value, index) => {
        if (this.state.isEditingCurrentItem === index) {
          return (
            <ItemForm
              key={index}
              initialValues={{ item: value }}
              onSubmit={values => this.updateItem(index, values)}
              cancelForm={this.cancelEditItem}
            />
          )
        } else {
          return (
            <div
              draggable
              onDragOver={this.dragOver}
              onDrop={e => this.dragDrop(e, this.props.boardIndex, index)}
              onDragStart={e => this.dragStart(e, index, this.props.boardIndex, value)}
              key={index}
              id={`${this.props.category}-${index}`}
              className="board-item droppable grabbable"
            >
              <span>{value}</span>
              <ButtonGroup>
                <Button type="dashed" onClick={() => this.toggleEditItem(index)} size="small">
                  <Icon type="edit" />
                </Button>
                <Button type="danger" onClick={() => this.removeItem(index)} size="small">
                  <Icon type="delete" />
                </Button>
              </ButtonGroup>
            </div>
          )
        }
      })
    } else {
      const className = 'board-item board-empty droppable'
      return (
        <div className={className} onDragOver={this.dragOver} onDrop={e => this.dragDrop(e, this.props.boardIndex)}>
          <Empty style={{ margin: '0 auto', textAlign: 'center' }} />
        </div>
      )
    }
  }

  // Render the board
  render() {
    const boardProps = this.props
    const invertedColour = invertColour(boardProps.colour, true) || '#000000'
    const { isEditingTitle, isCreatingItem, isAttemptingToRemoveBoard } = this.state

    const actions = [
      <div onClick={this.toggleCreateItem} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Icon type="plus" style={{ width: 32 }} />
        <span>Add Item</span>
      </div>,
      <Icon type="delete" onClick={this.toggleAttemptToRemoveBoard} />
    ]

    const BoardHeader = (
      <header className="card-header" style={{ backgroundColor: boardProps.colour }}>
        <div className="card-header-title" style={{ color: invertedColour }}>
          {/* If the user is editing the title */}
          {isEditingTitle ? (
            <TitleForm
              initialValues={{ category: boardProps.category }}
              onSubmit={values => this.prepareBoardForUpdate(boardProps.boardIndex, values)}
              cancelForm={this.cancelEditTitle}
            />
          ) : (
            <React.Fragment>
              {boardProps.category}
              <Button type="dashed" style={{ marginLeft: '0.5rem' }} onClick={this.toggleEditTitle} size="small">
                <Icon type="edit" />
              </Button>
            </React.Fragment>
          )}
        </div>
      </header>
    )
    return (
      <Card
        id={`board_${boardProps.boardIndex}`}
        className="board"
        bodyStyle={{ padding: 0 }}
        cover={BoardHeader}
        actions={actions}
      >
        {isAttemptingToRemoveBoard === boardProps.boardIndex ? (
          <div className="overlay">
            <Typography>
              <Paragraph style={{ color: 'white' }}>Are you sure you would like to delete this board?</Paragraph>
              <ButtonGroup>
                <Button type="danger" onClick={this.confirmAttemptToRemoveBoard}>
                  Confirm
                </Button>
                <Button onClick={this.cancelAttemptToRemoveBoard}>Cancel</Button>
              </ButtonGroup>
            </Typography>
          </div>
        ) : null}
        {this.renderItems(boardProps.data)}
        {isCreatingItem && <ItemForm onSubmit={this.createItem} cancelForm={this.cancelCreateItem} />}
      </Card>
    )
  }
}

export default Board
