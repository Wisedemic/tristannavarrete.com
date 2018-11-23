import React, { Component } from 'react';
import Styled from 'styled-components';
import localStorage from 'localStorage';
import BoardForm from './BoardForm';
import Board from './Board';

import LoadingSvg from './loading.svg';

import randomColor from 'randomcolor';
const colours = randomColor({ count: 4 });

const sleep = TIMEOUT => new Promise(resolve => setTimeout(resolve, TIMEOUT));

const StyledPanel = Styled.nav`
    .panel-heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        .subtitle {
            margin-bottom: 0px;
        }
    }

    #saving {
        display: flex;
        align-content: center;
        margin: 0rem 0.5rem;
    }

    #board-wrapper {
        background: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    #createBoard {
        padding: 4rem 2.45rem;
        margin: 1rem;
    }

    .board {
        position: relative;
        height: min-content;
        width: min-content;
        min-width: 190px;
        max-width: 320px;
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
        display: flex;
        flex-grow: 1;
        justify-content: center;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.7);
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .board-item {
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
`;

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
];

class BoardPanel extends Component {
    constructor(props) {
        super(props);
        const boards = () => {
            let parsed = JSON.parse(localStorage.getItem('boards'));
            if (parsed && parsed.length > 1) return parsed;
            return exampleBoards;
        };
        this.state = {
            boards: boards(), // Grab boards from localStorage or use an empty array.
            isCreatingBoard: false,
            saving: false
        };
    }

    // Persist Data to localStorage
    saveData = async (data) => {

        // Adding a slight delay before saving to make it feel like its being saved.
        await sleep(200);
        this.setState({ saving: true });
        // 1500 so you can read it....
        await sleep(1500);
        this.setState({ saving: false });
        // Actually save the data now.
        localStorage.setItem('boards', JSON.stringify(data));
    }

    // Retrieve Data from localStorage
    fetchData = () => {
        localStorage.getItem('boards');
    }

    // Toggle the board creation form.
    toggleCreateBoardForm = () => this.setState({ isCreatingBoard: true });
    // Close the board creation form.
    cancelCreateForm = () => this.setState({ isCreatingBoard: false });

    // Transfer items
    transferItem = (fromItemIndex, fromBoard, data, toBoard, toItemIndex) => {
        if (!fromItemIndex) throw new Error('transferItem requires an "fromItemIndex" arg!');
        if (!fromBoard) throw new Error('transferItem requires a "fromBoard" arg!');
        if (!data) throw new Error('transferItem requires a "data" arg!');
        if (isNaN(toBoard)) throw new Error('transferItem requires a "toBoard" arg!');

        let boards = this.state.boards;

        // Remove the item from it's origin
        boards[fromBoard].data = boards[fromBoard].data.filter((_, index) => index != fromItemIndex);

        // Did we drag over an existing item?
        if (!isNaN(toItemIndex)) {
            // Push our new item infront of the existing item.
            boards[toBoard].data.splice(toItemIndex, 0, data);
        } else {
            // Push item into array
            boards[toBoard].data = boards[toBoard].data.concat(data);
        }

        // Save State.
        this.saveData(boards);
        this.setState({ boards });

    }

    // Create a board
    createBoard = (values) => {
        if (!values.category) {
            throw new Error('createBoard did not receieve a value when attempting to create!')
        }
        // Append new board to boardlist
        const boards = this.state.boards.concat({
            colour: randomColor(),
            category: values.category,
            data: []
        });

        // Save State.
        this.saveData(boards);
        this.setState({ boards, isCreatingBoard: false });

    };

    // Update a board
    updateBoard = (boardIndex, data) => {
        if (typeof boardIndex !== "number") {
            throw new Error('updateBoard did not receieve a boardIndex when attempting to update this board.');
        } else if (!data) {
            throw new Error('updateBoard did not receieve any data when trying to update!');
        }

        let boards = this.state.boards;
        // Update board with new data. 
        boards[boardIndex] = data;

        // Save State.
        this.saveData(boards);
        this.setState({ boards });

    };

    // Remove a board
    removeBoard = (boardIndex) => {
        // Filter out the board we want to remove.
        let boards = this.state.boards.filter((_, index) => index !== boardIndex);

        // Save State.
        this.saveData(boards);
        this.setState({ boards });
    };

    // Render each board
    renderBoards = (boards) => {
        if (boards.length < 1) return null;
        return boards.map((board, index) => <Board
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
        />);
    }

    // Render the panel
    render() {
        const { isCreatingBoard, boards, saving } = this.state;
        const {
            createBoard,
            renderBoards,
            toggleCreateBoardForm,
            cancelCreateForm
        } = this;

        return (
            <StyledPanel id="board-panel" className="panel">
                {/* Panel Header */}
                <div className="panel-heading">
                    <span>Not-A-Trello-Board</span>
                    {saving && (
                        <div id="saving">
                            <img src={LoadingSvg} alt="Loading..." />
                        </div>
                    )}
                    <span>*These Boards are saved to your browser</span>
                </div>

                {/* A style wrapper to create flex-box container for the boards */}
                <div id="board-wrapper" className="panel-block">

                    {/* Render all the boards */}
                    {renderBoards(boards)}

                    {/* Are we trying to create a board? */}
                    {isCreatingBoard ? (
                        <div className="box" style={{ padding: '4rem 1rem ' }}>
                            <BoardForm onSubmit={createBoard} cancelForm={cancelCreateForm} />

                        </div>
                    ) : (
                            <a id="createBoard" className="box" onClick={toggleCreateBoardForm}>
                                <span className="icon"><i className="fas fa-plus"></i></span>
                                <span>Create Board </span>
                            </a>
                        )}
                </div>
            </StyledPanel >
        );
    }
}

export default BoardPanel;