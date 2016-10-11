import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
class DirectSaleDetailImgSlide extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    // console.log(this.props.popupDirectSaleOptionsState)
    const { optionsData, currentCarModelOptionIndex } = this.props.popupDirectSaleOptionsState
    if(optionsData.length === 0){
      return null
    }
    return(
      <div className="ds_img_slide">
        <ul>
          <li><img src={optionsData[currentCarModelOptionIndex].modelPhoto}/></li>
        </ul>
      </div>
    )
  }
}

export default DirectSaleDetailImgSlide
