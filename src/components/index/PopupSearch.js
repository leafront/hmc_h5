import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { GLOBAL_API_DOMAIN } from '../../config'

require('../../sass/index/PopupSearch.scss')

class PopupSearchState {
  @observable queryKeyword = ''
  @observable recommandList = []
  @observable isRecommandListInitialed = false

  fetchRecommandTimer = null
}

@observer
class RecommandList extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <ul>
        {
          this.props.recommandListData.map(
            (carInfo, value) => <li>{carInfo.typeName}</li>
          )
        }
      </ul>
    )
  }
}

@observer
class InitialSuggestion extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <dl className="initial_suggestion">
        <dt>热搜推荐：</dt>
        <dd><Link to="">奔驰</Link></dd>
        <dd><Link to="">奔驰</Link></dd>
        <dd><Link to="">奔驰</Link></dd>
        <dd><Link to="">奔驰</Link></dd>
      </dl>
    )
  }
}

@observer
class PopupSearch extends React.Component {
  constructor(props) {
    super(props)

    this.popupSearchState = new PopupSearchState()
  }
  getSearchSuggetsion(e){
    if(this.popupSearchState.fetchRecommandTimer){
      clearTimeout(this.popupSearchState.fetchRecommandTimer)
    }
    let currentInput = e.target
    this.popupSearchState.queryKeyword = currentInput.value

    this.popupSearchState.fetchRecommandTimer = setTimeout(async () => {
      if(appState.isLoading){
        return false
      }

      appState.I_M_Fucking_Loading()

      const time = new Date().getTime()
      const source = 101
      const queryKeyword = this.popupSearchState.queryKeyword
      const Response = await fetch(
        `${GLOBAL_API_DOMAIN}/ware/car/310000/car-type?source=${source}&time=${time}&queryMsg=${queryKeyword}`,
        {
          method:'GET'
        }
      )
      const ResponseOK = await Response.ok
      const ResponseJSON = await Response.json()

      if(ResponseOK && ResponseJSON.status === '1'){
        if(!this.popupSearchState.isRecommandListInitialed){
          this.popupSearchState.isRecommandListInitialed = true
        }
        this.popupSearchState.recommandList = ResponseJSON.data || []
      }

      appState.I_Have_Done_Fucking_Loading()

      this.popupSearchState.fetchRecommandTimer = null
    }, 500)
  }
  render(){
    if(!this.props.popupSearchState.isPopupSearchVisible){
      return null
    }

    return (
      <div className="popup_search">
        <div>
          <input className="search_bar" type="text" onInput={this.getSearchSuggetsion.bind(this)} value={this.popupSearchState.queryKeyword} placeholder="请输入你要搜索的车型，例如 宝马 3系"/>
          <button className="close_btn" onClick={this.props.popupSearchState.hidePopupSearch.bind(this.props.popupSearchState)}>×</button>
        </div>
        <div className="search_recommand_list">
          {
            this.popupSearchState.isRecommandListInitialed ?
              <RecommandList recommandListData={this.popupSearchState.recommandList}/>
            :
              <InitialSuggestion/>
          }
        </div>
      </div>
    )
  }
}

export default PopupSearch
