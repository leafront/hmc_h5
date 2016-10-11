import React from 'react'
import { Link } from 'react-router'
import { observer } from 'mobx-react'
import { getCarConfiguration } from '../../helpers/ajax'

@observer
export class CarParityButtonOne extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="car_parity_button_one">
        <button className="parity_btn" onClick={this.props.openModal}>我也去比价</button>
      </div>
    )
  }
}

@observer
export class CarParityButtonTwo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="car_parity_button_two">
        <button className="compare_price_popup" onClick={this.props.openModal}>去比价 &gt;</button>
      </div>
    )
  }
}

@observer
export class CarParityButtonThree extends React.Component {
  constructor(props) {
    super(props)

    this.carParityData = this.props.data.carParityData
    this.skipToSelectColor = this.skipToSelectColor.bind(this)
  }

  skipToSelectColor() {
    this.carParityData.step = 3
    this.props.openModal()
  }

  render() {
    let { model } = this.props
    let typeId = model.modelType
    return (
      <div className="btn_groups_right">
        <button className="go_to_parity" onClick={this.skipToSelectColor}>选定比价 &gt;</button>
        {
          model.hasDsCar === '1' ?
            <Link className="go_to_direct_sale" to={'/direct_sale_detail/' + typeId}>
              <button >自营直销&gt;</button>
            </Link>
            : null
        }
      </div>
    )
  }
}

@observer
export class CarParityButtonFour extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let typeId = this.props.model.modelType
    let modelId = this.props.model.modelId
    return (
      <div className="btn_groups_left">
        <button onClick={getCarConfiguration.bind(this, typeId, modelId, this.props.openModal)}>配置</button>
      </div>
    )
  }
}
