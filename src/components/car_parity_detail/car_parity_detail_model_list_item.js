import React from 'react'
import Popup from '../common/Popup'
import CarConfiguration from '../common/car_configuration'
import { CarParityButtonThree, CarParityButtonFour } from './car_parity_detail_button'
import CarParity from '../common/car_parity'
import { MoneyByTenThousand } from '../../../helpers/formatters'

class CarParityDetailModelListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  selectCarModel(typeId, modelId, modelName) {
    this.props.selectCarModel(typeId, modelId, modelName)
  }

  getModelListItem() {
    let { item } = this.props
    let typeId = this.props.carParityState.carParityData.selectedOptions.askpType
    if (!item) { return }
    let items = item.carModelList.map((model, i) => {
      return (
        <li onClick={this.selectCarModel.bind(this, typeId, model.modelId, model.modelName)}>
          <div className="model_list_item">
            <div className="item_left">
              <p>{ model.modelName }</p>
              <span>{ model.modelDrive } { model.modelGearbox }</span>
            </div>
            <div className="item_right">
              <p><em>{ MoneyByTenThousand(model.modelPrice) }万</em><br/>指导价</p>
            </div>
          </div>
          {
            this.props.isPopup ?
              null :
              <div className="btn_groups">
                <Popup
                  component={CarConfiguration}
                  button={CarParityButtonFour}
                  model={model}
                  data={this.props.carParityState}
                  {...this.props}
                  popupClassName="car_configuration animated"
                  animateClass="slideInUp"
                  type="bottom"
                  isPopup={true}
                />
                <Popup
                  component={CarParity}
                  button={CarParityButtonThree}
                  model={model}
                  data={this.props.carParityState}
                  {...this.props}
                  popupClassName="popup_car_parity animated"
                  animateClass="bounceIn"
                  type="center"
                />
              </div>
          }
        </li>
      )
  	})
    return items
  }

  render() {
    let items = this.getModelListItem()
    return (
      <ul>{ items }</ul>
    )
  }
}

export default CarParityDetailModelListItem
