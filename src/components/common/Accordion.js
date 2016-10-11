import React, { Component, PropTypes } from 'react'
import Collapse, { Panel } from 'rc-collapse'

class Accordion extends Component {
	constructor(props) {
		super(props)
	}

  getItems() {
    let accordionItems = this.props.items.map((item, i) => {
      return (
				<Panel header={item.label}>
					<span dangerouslySetInnerHTML={{__html: item.text}} />
				</Panel>
			)
    })
    return accordionItems
  }

	render() {
		return (
			<div className="accordion">
	        {
	          this.props.title ?
						<h3>{this.props.title}<button className="close_modal" onClick={this.props.closeModal}></button></h3>
						: <h3><button className="close_modal" onClick={this.props.closeModal}></button></h3>
	        }
        <Collapse accordion={true}>
          {this.getItems()}
        </Collapse>
			</div>
		)
	}
}

Accordion.displayName = 'Accordion'

export default Accordion
