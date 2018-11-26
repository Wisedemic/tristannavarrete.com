import React, { Component } from 'react';
import { withSize } from 'react-sizeme';
import Styled from 'styled-components';
import randomColor from 'randomcolor';

const StyledPanel = Styled.nav`
    background-color: white;

    .panel-heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        #timeElapsed {
            marginLeft: 0.7rem;
            fontSize: 16px;
        }
    }
    @media(max-width: 550px) {
        .panel-tabs {
            padding-left: 4rem;
        }
    }
    .panel-tabs {
        color: #3273dc;
        overflow-x: auto;
    }
`;

/** The box that provides styles for the bar graph. */
const SortingContainer = Styled.div`
    display: flex;
    flex-direction: row;    
    flex-wrap: no-wrap;
    padding: 0.3rem;
    .bar {
        align-self: flex-end;
        flex-grow: 1;
        border: 1px solid #ccc;
    }
`;

const sleep = TIMEOUT => new Promise(resolve => setTimeout(resolve, TIMEOUT));
const capitalize = text => text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
const sortingTypes = ['quicksort', 'bubblesort', 'mergesort', 'selectsort', 'insertionsort'];

class SortingExamples extends Component {
    state = {
        timeElapsed: 0,
        sorting: false,
        list: [],
        value: 0,
        sortType: 'quicksort'
    };

    // On mount, setup the form.
    componentWillMount() {
        this.setState({ list: this.generateList(20), value: 20 });
    }

    // A clock initalizer
    timer = null;

    /**
     * Generates an array.
     * @param {Number} length - The length of the array to generate.
     */
    generateList = length => {
        let list = [];
        for (var i = 0; i < length; i++) {
            list.push({
                index: (Math.floor(Math.random() * (100)) + 1),
                color: randomColor()
            });
        }
        return list;
    };

    // Stop the clock 
    stopClock = async () => clearInterval(this.timer);

    // Start clock
    startClock = async () => {
        const startTime = Date.now();
        this.timer = setInterval(() => this.setState(({ timeElapsed: (Date.now() - startTime + 1) })), 10);
    };

    /**
     * Change the sorting type
     * @param {String} ENUM - A type predefined above. 
     */
    changeType = sortType => {
        this.setState({ sortType, list: this.generateList(this.state.value) });
    };

    // Reset and stop sorting.
    reset = () => {
        this.stopClock();
        this.setState({
            timeElapsed: 0,
            sorting: false,
            list: this.generateList(this.state.value)
        });
    };

    // Begin sorting the array.
    startSorting = async (type) => {
        if (this.state.sorting) {
            return;
        }
        await this.setState({ sorting: true });
        await this.startClock(); // Start the clock
        const list = await this[this.state.sortType](this.state.list);
        await this.stopClock();
        await this.setState({ sorting: false, list });
    };

    // When the input changes, generate a new list of number.
    onChange = event => {
        if (event.target.value > Math.floor(this.props.size.width / 2) || event.target.value < 0) return;
        this.setState({ list: this.generateList(event.target.value), value: event.target.value });
    };





    selectsort = async (origArray) => {

        let copy = origArray,
            len = copy.length,
            minIdx, temp;

        for (let i = 0; i < len; i++) {
            minIdx = i;
            for (let j = i + 1; j < len; j++) {
                if (copy[j].index < copy[minIdx].index) {
                    minIdx = j;
                }
            }
            await sleep(1);
            temp = copy[i];
            copy[i] = copy[minIdx];
            copy[minIdx] = temp;
            await this.setState({ list: copy });
        }
        return copy;
    };

    /**
     * The official quicksorting function.
     * @param {Array} origArray - The array to be sorted
     */
    quicksort = (origArray) => {
        // If array is empty, just return it.
        if (!this.state.sorting || origArray.length <= 1) return origArray;

        // Utility Variables
        let left = [];
        let right = [];
        let pivot = origArray.pop();
        let length = origArray.length;

        // Sort the array
        for (let i = 0; i < length; i++) {
            if (origArray[i].index <= pivot.index) {
                left.push(origArray[i]);
            } else {
                right.push(origArray[i]);
            }
        }
        // We have a result array.
        return [].concat([], this.quicksort(left), [pivot], this.quicksort(right));
    };

    /** 
     * Bubblesorting method
     * @param {Array} origArray - The array to sort.
     */
    bubblesort = async (origArray) => {
        if (!this.state.sorting) return origArray;
        let copy = origArray,
            length = copy.length,
            stop;

        // Step through array.
        for (let i = 0; i < length; i++) {
            // Move to a new index after checking if sorted
            for (let j = 0, stop = length - i; j < stop; j++) {
                if (!this.state.sorting) return copy;
                // Check if item is greater
                if (copy[j] && copy[j + 1] && copy[j].index > copy[j + 1].index) {
                    let temp = copy[j];
                    // Swap
                    copy[j] = copy[j + 1];
                    copy[j + 1] = temp;
                }
                await sleep(1);
                await this.setState({ list: copy });
            }
        }
        return copy;
    };

    /**
     * Sorts the array by breaking it down
     * into smaller chunks.
     * @param {Array} array The array to sort
     */
    mergesort = (origArray) => {
        if (!this.state.sorting) return origArray;
        let len = origArray.length;
        if (len < 2) return origArray;
        let mid = Math.floor(len / 2),
            left = origArray.slice(0, mid),
            right = origArray.slice(mid);
        return this.merge(this.mergesort(left), this.mergesort(right));
    };

    /**
     * Merges two sublists back together.
     * Shift either left or right onto
     * the result depending on which is
     * lower (assuming both exist), and simply
     * pushes on a list if the other doesn't
     * exist.
     *
     * @param {Array} left The left hand sublist
     * @param {Array} right The right hand sublist
     */
    merge = (left, right) => {
        let result = [],
            lLen = left.length,
            rLen = right.length,
            l = 0,
            r = 0;
        while (l < lLen && r < rLen) {
            if (left[l].index < right[r].index) {
                result.push(left[l++]);
            }
            else {
                result.push(right[r++]);
            }
        }
        return result.concat(left.slice(l)).concat(right.slice(r));
    };

    /**
     * Sorts the array by breaking it down
     * into smaller chunks.
     * @param {Array} array The array to sort
     */
    insertionsort = async (origArray) => {
        if (!this.state.sorting) return origArray;
        let result = origArray;
        for (var i = 0; i < result.length; i++) {
            let value = result[i];
            // store the current item value so it can be placed right
            for (var j = i - 1; j > -1 && result[j].index > value.index; j--) {
                // loop through the items in the sorted array (the items from the current to the beginning)
                // copy each item to the next one
                result[j + 1] = result[j];
            }
            // the last item we've reached should now hold the value of the currently sorted item
            result[j + 1] = value;
        }

        return result;
    }

    render() {
        const { value, list, timeElapsed, sortType, sorting } = this.state;
        const timeTaken = new Date(timeElapsed).toISOString().substr(11, 8);
        return (
            <StyledPanel className="panel">
                <div className="panel-heading">
                    <span>Sorting Algorithms</span>
                    <strong id="timeElapsed">{timeTaken}</strong>
                </div>

                <p className="panel-tabs">
                    {sortingTypes.map(type => type === sortType ? (
                        <a key={type} className="is-active">
                            {capitalize(type)}
                        </a>
                    ) : (
                            <a key={type} onClick={() => this.changeType(type)}>
                                {capitalize(type)}
                            </a>
                        ))}
                </p>
                <div className="panel-block">
                    <div className="field is-horizontal" style={{ flexGrow: '1' }}>
                        <label className="field-label">Item Count</label>
                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded">
                                    <input className="input is-fullwidth" onChange={this.onChange} value={value} type="number" />
                                    <p className="help is-info">Cannot be greater than the content width ({Math.floor(this.props.size.width / 2)}px)</p>
                                </div>
                            </div>
                            <div className="field">
                                <div className="buttons">
                                    <button className="button is-success" disabled={sorting ? true : false} onClick={() => this.startSorting(sortType)}>Start</button>
                                    <button className="button is-light" onClick={this.reset}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SortingContainer className="panel-block">
                    {list.map((value, index) => <div
                        key={index}
                        style={{
                            height: value.index, backgroundColor: value.color
                        }}
                        className="bar"></div>
                    )}
                </SortingContainer>
            </StyledPanel>
        );
    }
}

export default withSize()(SortingExamples);