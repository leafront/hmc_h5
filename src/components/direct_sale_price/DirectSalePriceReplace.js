import React from 'react'

class DirectSalePriceReplace extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		const { replacementOption, inputReplacementOption } = this.props.directSalePriceState
		return(
			<div className="ds_car_price_replace">
				<span>旧车置换:</span>
				<input type="text" placeholder="请输入您的旧车品牌/车型" value={replacementOption} onInput={inputReplacementOption.bind(this.props.directSalePriceState)}/>
			</div>
		)
	}
}

export default DirectSalePriceReplace
