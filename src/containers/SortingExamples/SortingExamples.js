import React, { Component } from 'react'
import { withSize } from 'react-sizeme'
import Styled from 'styled-components'
import randomColor from 'randomcolor'
import sleep from '../../utils/sleep'
import { Tabs, Divider, Typography } from 'antd'
import CardPanel from '../../components/CardPanel'
const { TabPane } = Tabs
const { Text } = Typography

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
`

/** The box that provides styles for the bar graph. */
const SortingContainer = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    padding: 0.3rem;
    .bar {
        align-self: flex-end;
        flex-grow: 1;
    }
`

const capitalize = text =>
  text.slice(0, 1).toUpperCase() + text.slice(1, text.length)
const sortingTypes = [
  {
    type: 'quicksort',
    description:
      'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm, serving as a systematic method for placing the elements of a random access file or an array in order.',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif'
  },
  { type: 'mergesort', description: '', imgSrc: '' },
  {
    type: 'bubblesort',
    description:
      'Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent pairs and swaps them if they are in the wrong order.',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/5/54/Sorting_bubblesort_anim.gif'
  },
  { type: 'selectsort', description: '', imgSrc: '' },
  { type: 'insertionsort', description: '', imgSrc: '' }
]

class SortingExamples extends Component {
  // A clock initalizer
  timer = null

  constructor(props) {
    super(props)

    this.state = {
      timeElapsed: 0,
      sorting: false,
      list: [],
      value: 0
    }

    this.generateList = this.generateList.bind(this)
    this.stopClock = this.stopClock.bind(this)
    this.startClock = this.startClock.bind(this)
    this.reset = this.reset.bind(this)
    this.startSorting = this.startSorting.bind(this)
    this.onChange = this.onChange.bind(this)
    this.selectsort = this.selectsort.bind(this)
    this.quicksort = this.quicksort.bind(this)
    this.bubblesort = this.bubblesort.bind(this)
    this.merge = this.merge.bind(this)
    this.mergesort = this.mergesort.bind(this)
    this.insertionsort = this.insertionsort.bind(this)
  }

  // On mount, setup the form.
  componentWillMount() {
    this.setState({ list: this.generateList(40), value: 40 })
  }

  /**
   * Generates an array.
   * @param {Number} length - The length of the array to generate.
   */
  generateList = length => {
    let list = []
    for (var i = 0; i < length; i++) {
      list.push({
        index: Math.floor(Math.random() * 100) + 1,
        color: randomColor({ luminosity: 'light' })
      })
    }
    return list
  }

  // Stop the clock
  stopClock = () => clearInterval(this.timer)

  // Start clock
  startClock = async () => {
    const startTime = Date.now()
    this.timer = setInterval(
      () => this.setState({ timeElapsed: Date.now() - startTime + 1 }),
      10
    )
  }

  // Reset and stop sorting.
  reset = () => {
    this.stopClock()
    this.setState({
      timeElapsed: 0,
      sorting: false,
      list: this.generateList(this.state.value)
    })
  }

  // Begin sorting the array.
  startSorting = async type => {
    if (this.state.sorting) return
    await this.setState({ sorting: true })
    await this.startClock() // Start the clock
    const list = await this[type](this.state.list)
    await this.stopClock()
    await this.setState({ sorting: false, list })
  }

  // When the input changes, generate a new list of number.
  onChange = event => {
    if (
      event.target.value > Math.floor(this.props.size.width / 2) ||
      event.target.value < 0
    )
      return
    this.setState({
      list: this.generateList(event.target.value),
      value: event.target.value
    })
  }

  selectsort = async origArray => {
    let copy = origArray,
      len = copy.length,
      minIdx,
      temp

    for (let i = 0; i < len; i++) {
      minIdx = i
      for (let j = i + 1; j < len; j++) {
        if (copy[j].index < copy[minIdx].index) {
          if (!this.state.sorting) {
            return origArray
          }
          minIdx = j
        }
      }
      await sleep(1)
      temp = copy[i]
      copy[i] = copy[minIdx]
      copy[minIdx] = temp
      await this.setState({ list: copy })
    }
    return copy
  }

  /**
   * The official quicksorting function.
   * @param {Array} origArray - The array to be sorted
   */
  quicksort = origArray => {
    // If array is empty, just return it.
    if (!this.state.sorting || origArray.length <= 1) return origArray

    // Utility Variables
    let left = []
    let right = []
    let pivot = origArray.pop()
    let length = origArray.length

    // Sort the array
    for (let i = 0; i < length; i++) {
      if (origArray[i].index <= pivot.index) {
        left.push(origArray[i])
      } else {
        right.push(origArray[i])
      }
    }
    // We have a result array.
    return [].concat([], this.quicksort(left), [pivot], this.quicksort(right))
  }

  /**
   * Bubblesorting method
   * @param {Array} origArray - The array to sort.
   */
  bubblesort = async origArray => {
    if (!this.state.sorting) return origArray
    let copy = origArray,
      length = copy.length,
      stop

    // Step through array.
    for (let i = 0; i < length; i++) {
      // Move to a new index after checking if sorted
      for (let j = 0, stop = length - i; j < stop; j++) {
        if (!this.state.sorting) return copy
        // Check if item is greater
        if (copy[j] && copy[j + 1] && copy[j].index > copy[j + 1].index) {
          let temp = copy[j]
          // Swap
          copy[j] = copy[j + 1]
          copy[j + 1] = temp
        }
        await sleep(1)
        await this.setState({ list: copy })
      }
    }
    return copy
  }

  /**
   * Sorts the array by breaking it down
   * into smaller chunks.
   * @param {Array} array The array to sort
   */
  mergesort = origArray => {
    if (!this.state.sorting) return origArray
    let len = origArray.length
    if (len < 2) return origArray
    let mid = Math.floor(len / 2),
      left = origArray.slice(0, mid),
      right = origArray.slice(mid)
    return this.merge(this.mergesort(left), this.mergesort(right))
  }

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
      r = 0
    while (l < lLen && r < rLen) {
      if (left[l].index < right[r].index) {
        result.push(left[l++])
      } else {
        result.push(right[r++])
      }
    }
    return result.concat(left.slice(l)).concat(right.slice(r))
  }

  /**
   * Sorts the array by breaking it down
   * into smaller chunks.
   * @param {Array} array The array to sort
   */
  insertionsort = async origArray => {
    if (!this.state.sorting) return origArray
    let result = origArray
    for (var i = 0; i < result.length; i++) {
      let value = result[i]
      // store the current item value so it can be placed right
      for (var j = i - 1; j > -1 && result[j].index > value.index; j--) {
        // loop through the items in the sorted array (the items from the current to the beginning)
        // copy each item to the next one
        result[j + 1] = result[j]
      }
      // the last item we've reached should now hold the value of the currently sorted item
      result[j + 1] = value
    }

    return result
  }

  render() {
    const { value, list, timeElapsed, sorting } = this.state
    const { title } = this.props
    const timeTaken = new Date(timeElapsed).toISOString().substr(11, 8)
    return (
      <CardPanel title={title}>
        <Tabs
          defaultActiveKey={sortingTypes[0].type}
          style={{ flexGrow: 1 }}
          onChange={() => this.reset()}
        >
          {sortingTypes.map(item => (
            <TabPane key={item.type} tab={capitalize(item.type)}>
              <div>
                <div className="field is-horizontal" style={{ flexGrow: '1' }}>
                  <label className="field-label">Item Count</label>
                  <div className="field-body">
                    <div className="field">
                      <div className="control is-expanded">
                        <input
                          className="input is-fullwidth"
                          onChange={this.onChange}
                          value={value}
                          type="number"
                        />
                        <p className="help is-info">
                          Max: {Math.floor(this.props.size.width / 2)}
                        </p>
                      </div>
                    </div>
                    <div className="field">
                      <div className="buttons">
                        <button
                          className="button is-success"
                          disabled={sorting ? true : false}
                          onClick={() => this.startSorting(item.type)}
                        >
                          Start
                        </button>
                        <button
                          className="button is-light"
                          onClick={this.reset}
                        >
                          Reset
                        </button>
                        <strong
                          id="timeElapsed"
                          style={{
                            marginLeft: '1rem'
                          }}
                        >
                          {timeTaken}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SortingContainer>
                {list.map((value, index) => (
                  <div
                    key={index}
                    style={{
                      height: value.index,
                      backgroundColor: value.color
                    }}
                    className="bar"
                  />
                ))}
              </SortingContainer>
              <Divider />
              <div className="columns">
                <div className="column is-one-third">
                  <img src={item.imgSrc} style={{ height: 150, width: 150 }} />
                </div>
                <div className="column">
                  <Text>{item.description}</Text>
                </div>
              </div>
            </TabPane>
          ))}
        </Tabs>
      </CardPanel>
    )
  }
}

export default withSize()(SortingExamples)
