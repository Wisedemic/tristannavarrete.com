import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FancyText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      forward: true
    };

    this.updateText = () => {
      const { text, forward } = this.state;
      const sourceText = this.props.text;

      // Typing, And @ Max-Length
      if (forward && sourceText.length === text.length) {
        this.setState({forward: false, text});

      // Deleting, And @ Zero-Length
      } else if (!forward && text.length === 0) {
        this.setState({forward: true, text});

      // Deleting, And Not @ Zero-Length
      } else if (!forward && text.length !== 0) {
        this.setState({text: text.substring(0, text.length - 1)});

      // Typing, and Not @ Zero-Length
      } else {
        this.setState({text: sourceText.substring(0, text.length + 1)});
      }
    };

    this.updateTextArray = () => {
      const { text, forward } = this.state;
      const sourceText = this.props.text;

      // Typing, And @ Max-Length
      if (forward && sourceText.length === text.length) {
        this.setState({forward: false, text});

      // Deleting, And @ Zero-Length
      } else if (!forward && text.length === 0) {
        this.setState({forward: true, text});

      // Deleting, And Not @ Zero-Length
      } else if (!forward && text.length !== 0) {
        this.setState({text: text.substring(0, text.length - 1)});

      // Typing, and Not @ Zero-Length
      } else {
        this.setState({text: sourceText.substring(0, text.length + 1)});
      }
    };
  }

  componentDidMount() {
    clearInterval(this.timer);
  }
  componentDidMount() {
    let speed = this.props.speed || 200;

    // Support for an array of words
    if (Array.isArray(this.props.text)) {
      this.timer = setInterval(this.updateTextArray, speed);
    } // Just a string
    this.timer = setInterval(this.updateText, speed);
  }

  render() {
    return (
      <span>
        {this.state.text}
      </span>
    );
  }

}

FancyText.propTypes = {
  text: PropTypes.oneOf([PropTypes.array, PropTypes.string]).isRequired
};

export default FancyText;
