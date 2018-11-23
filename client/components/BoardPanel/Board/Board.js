import React, { Component, createRef } from 'react';
import BoardForm from '../BoardForm/';
import ItemForm from './ItemForm/';
import invertColour from '../../../utils/colourInverter';

// A component to manage an individual board.
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditingTitle: false,
            isCreatingItem: false,
            isEditingCurrentItem: false,
            isAttemptingToRemoveItem: false,
            isAttemptingToRemoveBoard: false
        };

        this.form = createRef();
    }

    // This tells the boardPanel to delete this board.
    confirmAttemptToRemoveBoard = () => {
        this.props.actions.removeBoard(this.props.boardIndex);
        this.setState({ isAttemptingToRemoveBoard: false });
    };

    // Toggle the board title editing form
    toggleEditTitle = () => this.setState({ isEditingTitle: true });
    // Toggle the board item creation form.
    toggleCreateItem = () => this.setState({ isCreatingItem: true });
    // Toggle the board edit item form.
    toggleEditItem = (id) => this.setState({ isEditingCurrentItem: id });
    // Toggle this board into DELETION MODE
    toggleAttemptToRemoveBoard = () => this.setState({ isAttemptingToRemoveBoard: this.props.boardIndex });
    // Toggle this item into DELETION MODE
    toggleAttemptToRemoveItem = id => this.setState({ isAttemptingToRemoveItem: id });

    // Cancel Editing this board title
    cancelEditTitle = () => this.setState({ isEditingTitle: false });
    // Cancel Editing the selected item
    cancelCreateItem = () => this.setState({ isCreatingItem: false });
    // Cancel Editing this board title
    cancelEditItem = () => this.setState({ isEditingCurrentItem: false });
    // Cancel attempt to Remove this board.
    cancelAttemptToRemoveBoard = () => this.setState({ isAttemptingToRemoveBoard: false });
    // Cancel attempt to Remove this item.
    cancelAttemptToRemoveItem = () => this.setState({ isAttemptingToRemoveItem: false });

    // Start dragging an item
    dragStart = (ev, itemIndex, boardIndex, data) => {
        ev.dataTransfer.setData('itemIndex', itemIndex);
        ev.dataTransfer.setData('boardIndex', boardIndex);
        ev.dataTransfer.setData('itemData', data);
    };

    // Ensure dragOver doesn't cause side-effects
    dragOver = (ev) => ev.preventDefault();

    // On drop, prepare to submit an action to transfer items
    dragDrop = (ev, toBoard, toItemIndex = 0) => {
        let fromBoard = ev.dataTransfer.getData('boardIndex');
        let fromItemIndex = ev.dataTransfer.getData('itemIndex');
        let data = ev.dataTransfer.getData('itemData');
        this.props.actions.transferItem(fromItemIndex, fromBoard, data, Number(toBoard), Number(toItemIndex));
    };

    // This is used to ensure this.props.updateBoard receives all the board data at once.
    prepareBoardForUpdate = (boardIndex, values) => {
        const board = {
            ...values,
            data: this.props.data,
            colour: this.props.colour
        };
        // Submit this to the parent component for saving.
        this.props.actions.updateBoard(boardIndex, board);

        // Update the board state to show the new title without the form.
        this.setState({ isEditingTitle: false });
    };

    // Create an item and add it to this board.
    createItem = async ({ item }) => {
        const index = this.props.boardIndex;
        this.props.actions.updateBoard(index, {
            category: this.props.category,
            data: this.props.data.concat(item),
            colour: this.props.colour
        });
        this.setState({ isCreatingItem: false });
    };

    // Update a board item by it's index
    updateItem = (id, values) => {
        let data = this.props.data;
        data[id] = values.item;
        this.props.actions.updateBoard(this.props.boardIndex, {
            category: this.props.category,
            data,
            colour: this.props.colour
        });
        this.setState({ isEditingCurrentItem: false });
    };

    // Remove a board item by it's index
    removeItem = (id) => {
        let data = this.props.data.filter((_, index) => id !== index);
        this.props.actions.updateBoard(this.props.boardIndex, {
            category: this.props.category,
            data,
            colour: this.props.colour
        });
        this.setState({ isAttemptingToRemoveItem: false });
    };

    // Render Each Item
    renderItems = (items) => {
        if (items.length > 0) {
            return items.map((value, index) => {
                if (this.state.isEditingCurrentItem === index) {
                    return (
                        <div key={index} style={{ margin: '1rem' }}>
                            <ItemForm
                                initialValues={{ item: value }}
                                onSubmit={values => this.updateItem(index, values)}
                                cancelForm={this.cancelEditItem}
                            />
                        </div>
                    );
                } else {
                    return (
                        <div
                            draggable
                            onDragOver={this.dragOver}
                            onDrop={e => this.dragDrop(e, this.props.boardIndex, index)}
                            onDragStart={e => this.dragStart(e, index, this.props.boardIndex, value)}
                            key={index}
                            id={`${index}`}
                            className="panel-block board-item droppable grabbable"
                        >
                            <span>{value}</span>
                            <div className="buttons">
                                <button
                                    onClick={() => this.toggleEditItem(index)}
                                    className="button is-small">
                                    <span className="icon"><i className="fas fa-pencil-alt"></i></span>
                                </button>
                                <button
                                    onClick={() => this.removeItem(index)}
                                    className="button is-danger is-small">
                                    <span className="icon"><i className="fas fa-trash"></i></span>
                                </button>
                            </div>
                        </div>
                    );
                }
            });
        } else {
            return <div className="panel-block droppable"
                onDragOver={this.dragOver}
                onDrop={e => this.dragDrop(e, this.props.boardIndex)}>
                <i>This board is empty!</i>
            </div>;
        }
    }

    // Render the board
    render() {


        const {
            renderItems, toggleEditTitle, toggleCreateItem,
            toggleAttemptToRemoveBoard, cancelEditTitle, cancelCreateItem,
            cancelAttemptToRemoveBoard, confirmAttemptToRemoveBoard,
            prepareBoardForUpdate, createItem
        } = this;
        const boardProps = this.props;
        const invertedColour = invertColour(boardProps.colour, true) || '#000000';
        const { isEditingTitle, isCreatingItem, isAttemptingToRemoveBoard } = this.state;
        return (
            <div id={`board_${boardProps.boardIndex}`} className="card board">
                {isAttemptingToRemoveBoard === boardProps.boardIndex ? (
                    <div className="overlay">
                        <div className="buttons">
                            <button className="button is-danger" onClick={confirmAttemptToRemoveBoard}>Confirm</button>
                            <button className="button" onClick={cancelAttemptToRemoveBoard}>Cancel</button>
                        </div>
                    </div>
                ) : null}
                <header className="card-header" style={{ backgroundColor: boardProps.colour }}>
                    <div className="card-header-title" style={{ color: invertedColour }}>
                        {/* If the user is editing the title */}
                        {isEditingTitle ? (
                            <BoardForm
                                initialValues={{ category: boardProps.category }}
                                onSubmit={values => prepareBoardForUpdate(boardProps.boardIndex, values)}
                                cancelForm={cancelEditTitle}
                            />
                        ) : (
                                <React.Fragment>

                                    {boardProps.category}
                                    <button style={{ marginLeft: '0.5rem' }} onClick={toggleEditTitle} className="button is-small has-icon">
                                        <span className="icon"><i className="fas fa-pencil-alt"></i></span>
                                    </button>
                                </React.Fragment>
                            )}
                    </div>
                </header>
                <div className="panel" style={{ marginBottom: '0' }}>
                    {renderItems(boardProps.data)}
                </div>
                <div className="card-footer">
                    <div className="card-footer-item">
                        {isCreatingItem ? (
                            <ItemForm onSubmit={createItem} cancelForm={cancelCreateItem} />
                        ) : (
                                <div className="buttons">
                                    <button style={{ flexGrow: '1' }} onClick={toggleCreateItem} className="button is-success has-icon">
                                        <span className="icon"><i className="fas fa-plus"></i></span>
                                        <span>Create Item</span>
                                    </button>
                                    <button onClick={toggleAttemptToRemoveBoard} className="button is-danger has-icon"><i className="fas fa-trash"></i></button>
                                </div>
                            )}
                    </div>
                </div>
            </div >
        );
    }
}

export default Board;