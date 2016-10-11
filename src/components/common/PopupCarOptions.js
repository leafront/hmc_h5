import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

require('../../sass/common/popup_car_options.scss')

// export class DirectSaleDetailCarType extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//     return(
//       <div className="car_type" onClick={this.props.openModal}>
//         <ul>
//           <li>
//             <span>款型：</span>
//             <span>3系2016款3系2016款3系2016款3系2016款3系2016款3系2016款</span>
//             <i>共12款</i>
//             <span>></span>
//           </li>
//           <li>
//             <span>颜色：</span>
//             <span>外观|内饰</span>
//             <span>></span>
//           </li>
//           <li>
//             <span>购车方式：</span>
//             <span>全款购置</span>
//             <span>></span>
//           </li>
//           <li>
//             <span>牌照：</span>
//             <span>上外牌</span>
//             <span>></span>
//           </li>
//         </ul>
//       </div>
//     )
//   }
// }

// class ChooseCarType extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//   return(
//     <div className="choose_car_type">
//         <div className="popup_title">款型</div>
//         <ul>
//           <li><span>20.58万 |</span> 3系 2016款  328Li xDrive 2.0T 手自一体 豪华运动套装</li>
//           <li><span>20.58万 |</span> 3系 2016款  328Li xDrive 2.0T 手自一体</li>
//           <li><span>20.58万 |</span> 3系 2016款  328Li xDrive 2.0T 手自一体</li>
//         </ul>
//     </div>
//   )
//   }
// }

// class ChooseColor extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//   return(
//     <div className="choose_color">
//         <div className="popup_title">颜色(外观/内饰)</div>
//         <ul>
//           <li>ddd</li>
//           <li>ddd</li>
//           <li>ddd</li>
//           <li>ddd</li>
//         </ul>
//     </div>
//   )
//   }
// }
//
// class ChoosePurchaseWay extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//   return(
//     <div className="choose_purchase_way">
//         <div className="popup_title">购车方式</div>
//         <ul>
//           <li>ddd</li>
//           <li>ddd</li>
//           <li>ddd</li>
//           <li>ddd</li>
//         </ul>
//     </div>
//   )
//   }
// }
//
// class ChooseLicense extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//   return(
//     <div className="choose_license">
//       <div className="popup_title">牌照</div>
//       <ul>
//         <li>ddd</li>
//         <li>ddd</li>
//       </ul>
//     </div>
//   )
//   }
// }

// class PopupCarOptionsChoosenState {
//   @observable choosedOptionsIndex = []
// }

@observer
class Options extends React.Component {
  constructor(props){
    super(props)

  }
  render(){
    // console.log(this.props.optionsInfo.optionsContent)

    let optionButtons = []

    this.props.optionsInfo.optionsContent.names.map(
      (value, index) => {
        let buttonActiveClass = ''
        const highLightedOptionGroup = this.props.popupCarOptionsState.highLightedOptionIndex[this.props.index]

        for(var i = 0; i < highLightedOptionGroup.length; i++){
          // console.log(highLightedOptionGroup[i])
          if(highLightedOptionGroup[i] === index){
            buttonActiveClass = 'active'
            break
          }
        }
        optionButtons.push(
          <button className={buttonActiveClass}
            onClick={this.props.popupCarOptionsState.switchOptionsButton.bind(this.props.popupCarOptionsState, this.props.index, index, this.props.optionsInfo.isMultipleOption)}>{value}</button>
        )
      }
    )

    return(
      <dl className="choose_license">
        <dt className="popup_title">{this.props.optionsInfo.optionsTitle}</dt>
        <dd>
          {optionButtons}
        </dd>
      </dl>
    )
  }
}

@observer
class PopupCarOptions extends React.Component {
  constructor(props) {
    super(props)

    // this.popupCarOptionsChoosenState = new PopupCarOptionsChoosenState()
  }
    //
    // <ChooseCarType/>
    // <ChooseColor/>
    // <ChoosePurchaseWay/>
    // <ChooseLicense/>
  async confirmFilters(){
    // this.props.directSaleListState.queryParams.page = 2
    // console.log(this.props.popupCarOptionsState)
    const queryParams = this.props.popupCarOptionsState.getChoosedOptions()
    this.props.directSaleListState.queryParams = queryParams
    // return false
    // this.props.directSaleListState.queryParams = {
    //   page: 0,
    //   modelTypeId: null,
    //   modelBrandId: null,
    //   modelMinPrice: null,
    //   modelMaxPrice: null,
    //   priceOrderType: null
    // }
    this.props.directSaleListState.changeQueryString()

    appState.I_M_Fucking_Loading()
    await this.props.directSaleListState.getCarListByFilter()
    this.props.popupCarOptionsState.hidePopupCarOptions()
    appState.I_Have_Done_Fucking_Loading()
  }
  // getChoosedOptions(){
  //   let queryParams = {
  //     page: 0,
  //     modelTypeId: null,
  //     modelBrandId: null,
  //     modelMinPrice: null,
  //     modelMaxPrice: null,
  //     priceOrderType: null
  //   }
  //   const highLightedOptionIndex = this.props.popupCarOptionsState.highLightedOptionIndex
  //   const optionsData = this.props.popupCarOptionsState.optionsData
  //   for(var i = 0; i < highLightedOptionIndex.length; i++){
  //     switch(optionsData[i].optionsType){
  //       case 'brandName':
  //         for(var j = 0; j < highLightedOptionIndex[i].length; j++){
  //           queryParams.modelBrandId = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]]
  //         }
  //         break
  //       case 'carType':
  //         for(var j = 0; j < highLightedOptionIndex[i].length; j++){
  //           queryParams.modelTypeId = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]]
  //         }
  //         break
  //       case 'priceRange':
  //         for(var j = 0; j < highLightedOptionIndex[i].length; j++){
  //           queryParams.modelMinPrice = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]].max
  //           queryParams.modelMaxPrice = optionsData[i].optionsContent.values[highLightedOptionIndex[i][j]].min
  //         }
  //         break
  //       default:
  //     }
  //   }
  //
  //   return queryParams
  //   // console.log(queryParams)
  //   this.props.directSaleListState.queryParams = queryParams
  // }
  render() {
    // console.log(this.props.popupCarOptionsState)
    return (
      <div className="popup_car_options_wrapper" style={{display:this.props.popupCarOptionsState.visiblityClass}} onClick={this.props.popupCarOptionsState.hidePopupCarOptions.bind(this.props.popupCarOptionsState)}>
        <div className="popup_car_options" style={{transform:this.props.popupCarOptionsState.carModelListLeft}}>
          <div className="options_buttons">
            {
              this.props.popupCarOptionsState.optionsData.map(
                (optionsInfo, index) => <Options optionsInfo={optionsInfo} index={index} popupCarOptionsState={this.props.popupCarOptionsState}/>
              )
            }
          </div>
          <div className="confirm_reset_buttons">
            <button onClick={this.props.popupCarOptionsState.resetFilters.bind(this.props.popupCarOptionsState)} className="reset_confirm">重置</button>
            <button onClick={this.confirmFilters.bind(this)} className="choose_confirm">确定</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PopupCarOptions
