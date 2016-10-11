import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
class PopupWorkFlowDetail extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const { imageSrcArray, currentImageIndex, hidePopupProcess, isPopupProcessDetailVisible } = this.props.serviceFlowState

    if(imageSrcArray.length === 0 || !isPopupProcessDetailVisible){
      return null
    }

    return (
      <div className="popup_work_flow_detail">
        <div>
          <div className="work_flow_detail_title">好买车服务及购车流程<button onClick={hidePopupProcess.bind(this.props.serviceFlowState)}>×</button></div>
          <div>
            <div>
              <img width="100%" src={imageSrcArray[currentImageIndex]}/>
            </div>
            <div className="service_desc">
              <p>test</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ServiceFlowState {
  @observable imageSrcArray = []
  @observable serviceFlowTitleArray = ['在线预定','','','','','','','']

  @observable currentImageIndex = 0

  @observable isPopupProcessDetailVisible = false

  switchImage(toIndex){
    this.currentImageIndex = toIndex
  }
  showPopupProcess(index){
    this.isPopupProcessDetailVisible = true
    this.currentImageIndex = index
  }
  hidePopupProcess(){
    this.isPopupProcessDetailVisible = false
  }
}

@observer
class DirectSaleDetailServiceFlow extends React.Component {
  constructor(props){
    super(props)

    this.serviceFlowState = new ServiceFlowState()
  }
  componentDidMount(){
    this.setImageData()
  }
  setImageData(){
    const imageNamePrefix = 'process_'
    const imageLength = 8
    let imageSrcArray = []
    for(let i = 0; i < imageLength; i++){
      imageSrcArray.push(`/images/direct_sale_detail/${imageNamePrefix}${i + 1}.png`)
    }

    this.serviceFlowState.imageSrcArray = imageSrcArray
  }
  render(){
    const { imageSrcArray , serviceFlowTitleArray , currentImageIndex } = this.serviceFlowState
    return(
      <div className="service_flow">
        <div className="title">好买车服务及购车流程</div>
        <div className="service_process_preview">
          <ul style={{width:imageSrcArray.length * 90 + '%', left: this.serviceFlowState.currentImageIndex * 90 * .9 * -1 + '%'}}>
            {
              imageSrcArray.map(
                (value, index) => {
                  return (
                    <li
                      style={{width:90 / imageSrcArray.length + '%'}}>
                      <p className="work_flow_title"><i>{index + 1}</i>{serviceFlowTitleArray[index]} &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt; &gt;</p>
                      <div
                        className={currentImageIndex === index ? ' active ' + 'process_img' : 'process_img'}
                        onClick={this.serviceFlowState.switchImage.bind(this.serviceFlowState, index)}>
                        <img width="95%" src={value}/>
                      </div>
                      <div className="process_popup_btn">
                        <button onClick={this.serviceFlowState.showPopupProcess.bind(this.serviceFlowState, index)}>查看详情&gt;</button>
                      </div>
                    </li>
                  )
                }
              )
            }
          </ul>
        </div>
        <PopupWorkFlowDetail serviceFlowState={this.serviceFlowState}/>
      </div>
    )
  }
}

export default DirectSaleDetailServiceFlow
