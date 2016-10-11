import React from 'react'
import { observer } from 'mobx-react'
import { browserHistory , Link } from 'react-router'

import PopupMenu from '../index/PopupMenu'
import PopupSearch from '../index/PopupSearch'
import PopupMenuState from '../../models/PopupMenuState'
import PopupSearchState from '../../models/PopupSearchState'

@observer
class TopBar extends React.Component {
  constructor(props) {
    super(props)

    this.showPopupMenu = this.showPopupMenu.bind(this)
    this.clickBackButton = this.clickBackButton.bind(this)

    this.popupMenuState = new PopupMenuState()
    this.popupSearchState = new PopupSearchState()
  }

  showPopupMenu() {
    this.popupMenuState.showPopupMenu()
  }

  clickBackButton() {
    if (this.props.pageTitle === '初次使用') {
      this.props.closeModal && this.props.closeModal()
    } else{
      browserHistory.goBack()
    }
  }

  render() {
    return (
      <div className="">
        <PopupSearch popupSearchState={this.popupSearchState}/>
        <PopupMenu popupMenuState={this.popupMenuState}/>
        <div className="top_bar">
          {
            this.props.isIndex ?
              null
            : <button className="back_btn" onClick={this.clickBackButton}>&lt;</button>
          }
          {
            this.props.isIndex ?
              <div className="index_top_bar">
                <h1 className="logo"><img width="35" src="/images/index/logo.png"/></h1>
              </div>
            : <div className="other_top_bar">
                <h1 className="page_title">{ this.props.pageTitle ? this.props.pageTitle : '' }</h1>
              </div>
          }
          <button className="menu_btn" onClick={this.showPopupMenu}></button>
          {
            this.props.isShowSearch ?
            <button className="search_btn" onClick={this.popupSearchState.showPopupSearch.bind(this.popupSearchState)}></button> : null
          }
        </div>
      </div>
    )
  }
}

export default TopBar
