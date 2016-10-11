import React, { Component, PropTypes } from 'react'

class Header extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
      <div className="title">
				<span>
	        { this.props.title }
				</span>
        {
          this.props.subTitle ? <small>{ this.props.subTitle }</small> : null
        }
      </div>
		)
	}
}

Header.displayName = 'Header'

export default Header
