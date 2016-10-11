import React from 'react'

export class PopupButtonCenter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={this.props.openModal}>Open Modal Center</button>
    )
  }
}

export class PopupButtonLeft extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={this.props.openModal}>Open Modal Left</button>
    )
  }
}

export class PopupButtonRight extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={this.props.openModal}>Open Modal Right</button>
    )
  }
}

export class PopupButtonBottom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={this.props.openModal}>Open Modal Bottom</button>
    )
  }
}

class Demo1 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <input type="text" name="demo" style={{border:'1px solid black'}}/>
        <p>The popup supports two arrays of buttons, left and right. These just renders two divs with corresponding classes, how you style it is up to you. A button requires the following properties:</p>
        <p>The popup supports two arrays of buttons, left and right. These just renders two divs with corresponding classes, how you style it is up to you. A button requires the following properties:</p>
        <p>The popup supports two arrays of buttons, left and right. These just renders two divs with corresponding classes, how you style it is up to you. A button requires the following properties:</p>
        <input type="text" name="demo2" style={{border:'1px solid black'}}/>
        <button onClick={this.props.closeModal}>Close Modal</button>
      </div>
    )
  }
}

export default Demo1
