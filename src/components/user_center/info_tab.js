import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import TopBar from '../common/top_bar'

@observer
class InfoTabComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    let activeClass = ""
    let currentHighlightTabIndex = this.props.infoTabState.currentHighlightTabIndex
    let tabIndex = this.props.tabIndex

    if(currentHighlightTabIndex === tabIndex){
      activeClass = "active"
    }
    return (
      <li className={activeClass}><Link to={'/user_center/' + this.props.tabsInfo.link}>{this.props.tabsInfo.text}</Link></li>
    )
  }
}

@observer
class InfoTab extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    const tabsInfoArray = [
      {link: 'my_info', text: '我的信息'},
      {link: 'my_subscription', text: '我的订阅'},
      {link: 'my_favorite', text: '我的收藏'}
    ]
    return (
      <div>
        <TopBar
          pageTitle="个人中心"
          isIndex={false}
          isShowSearch={false}
        />
        <ul className="info_tab">
          {
            tabsInfoArray.map(
              (value, index) => <InfoTabComponent tabsInfo={value} tabIndex={index} infoTabState={this.props.infoTabState}/>
            )
          }
        </ul>
      </div>
    )
  }
}

export default InfoTab
