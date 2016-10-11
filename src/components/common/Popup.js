import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'

class Popup extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modalIsOpen: false,
			animateClass: this.props.animateClass
		}

		this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
	}

	openModal() {
		this.setState({
			modalIsOpen: true,
		})
	}

  closeModal() {
		this.setState({
			modalIsOpen: false
		})
	}

	render() {
    const Children = this.props.component
    const PopupButton = this.props.button
    let customStyles = ''

    switch(this.props.type) {
      case 'center':
        customStyles = customStylesCenter
        break;
      case 'left':
        customStyles = customStylesLeft
        break;
      case 'right':
        customStyles = customStylesRight
        break;
      case 'bottom':
        customStyles = customStylesBottom
        break;
  	}

		return (
			<div className="popup">
        <PopupButton openModal={this.openModal} {...this.props} model={this.props.model} />
        <Modal
					ref="animateEle"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.props.afterOpenFn}
          onRequestClose={this.props.onRequestClose}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
          className={`${this.props.popupClassName} ${this.state.animateClass}`}
          overlayClassName={this.props.overlayClassName}
        >
          <Children closeModal={this.closeModal} {...this.props} />
        </Modal>
			</div>
		)
	}
}

Popup.displayName = 'Popup'

const customStylesCenter = {
  overlay : {
    position          : 'fixed',
    width             : '100%',
    height            : '100%',
    top               : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
		boxSizing                  : 'border-box',
    position                   : 'relative',
    top                        : '9%',
		height                     : '82%',
		width                      : '84%',
		margin                     : '0 auto',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',
    padding                    : '0'
  }
}

const customStylesLeft = {
  overlay : {
		position          : 'fixed',
    width             : '100%',
    height            : '100%',
    top               : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
		boxSizing                  : 'border-box',
    position                   : 'relative',
		height                     : '100%',
		width                      : '100%',
		margin                     : '0 auto',
    background                 : '#fff',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',
    padding                    : '0'
  }
}

const customStylesRight = {
  overlay : {
		position          : 'fixed',
    width             : '100%',
    height            : '100%',
    top               : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
		boxSizing                  : 'border-box',
    position                   : 'relative',
    top                        : '9%',
		height                     : '82%',
		width                      : '84%',
		margin                     : '0 auto',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',
    padding                    : '0'
  }
}

const customStylesBottom = {
  overlay : {
		position          : 'fixed',
    width             : '100%',
    height            : '100%',
    top               : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
		boxSizing                  : 'border-box',
    position                   : 'absolute',
    bottom                     : '0',
		height                     : '95%',
		width                      : '100%',
		margin                     : '0 auto',
    background                 : '#fff',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',
    padding                    : '0'
  }
}

export default Popup
