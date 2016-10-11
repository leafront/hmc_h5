import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

require('../../sass/index/car_brand_list.scss')

// class CarBrandListState {
//   @observable positionOfLetterGroupList = 'absolute'
//
//   setPositionOfLetterGroupList(positionProp){
//     //absolute or fixed
//     this.positionOfLetterGroupList = positionProp
//   }
// }

@observer
class CarBrandLetterGroupList extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    return (
      <ul className="car_first_letter_list" style={{position:this.props.carBrandListState.positionOfLetterGroupList}}>
        {
          this.props.carBrandListData.map(
            (carBrandInfo, index) => <li><button onClick={this.props.jumpToBrandLetterGroup.bind(this, index)}>{carBrandInfo.spell}</button></li>
          )
        }
      </ul>
    )
  }
}

@observer
class CarBrandListComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount(){
  }
  render(){
    return (
      <dl className="car_brand_list" ref={'carBrand'}>
        <dt>{this.props.carBrandInfo.spell}</dt>
        {
          this.props.carBrandInfo.list.map(
            (carBrandInfo, index) => <dd onClick={this.props.carModelListState.showCarModelList.bind(this.props.carModelListState, carBrandInfo.topBrandId)}><img src={carBrandInfo.brandLogo}/>{carBrandInfo.brandName}</dd>
          )
        }
      </dl>
    )
  }
}

@observer
class CarBrandList extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount(){
    this.props.carBrandListState.offsetTop = this.refs.carBrandListWrapper.offsetTop
    // console.log()
    window.onscroll = this.setLetterGroupPositionWhenScroll.bind(this)
  }
  componentWillUnmount(){
    window.onscroll = null
  }
  setLetterGroupPositionWhenScroll(e){
    let scrollTop = document.body.scrollTop
    if(scrollTop > this.refs.carBrandListWrapper.offsetTop){
      if(this.props.carBrandListState.positionOfLetterGroupList == 'fixed'){
        return false
      }
      this.props.carBrandListState.setPositionOfLetterGroupList('fixed')
    }else{
      if(this.props.carBrandListState.positionOfLetterGroupList == 'absolute'){
        return false
      }
      this.props.carBrandListState.setPositionOfLetterGroupList('absolute')
    }
  }
  jumpToBrandLetterGroup(index){
    const brandListWrapperOffsetTop = this.refs.carBrandListWrapper.offsetTop
    const targetOffsetTop = this.refs['carBrandList' + index].refs.carBrand.offsetTop
    window.scrollTo(0,brandListWrapperOffsetTop + targetOffsetTop)
  }
  render(){
    return (
      <div className="car_brand_list_wrapper" ref="carBrandListWrapper">
        <CarBrandLetterGroupList carBrandListData={this.props.carBrandListData} carBrandListState={this.props.carBrandListState} jumpToBrandLetterGroup={this.jumpToBrandLetterGroup.bind(this)}/>
        {
          this.props.carBrandListData.map(
            (carBrandInfo, index) => <CarBrandListComponent ref={'carBrandList' + index} componentIndex={index} carBrandInfo={carBrandInfo} carModelListState={this.props.carModelListState} carBrandListState={this.carBrandListState}/>
          )
        }
      </div>
    )
  }
}

export default CarBrandList
