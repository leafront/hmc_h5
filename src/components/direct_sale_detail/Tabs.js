import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
class Tabs extends React.Component{
  constructor(props){
    super(props)

  }
  render(){
    const currentTabIndex = this.props.dsCarTopInfoState.currentTabIndex
    return (
      <ul className={this.props.className}>
        {
          this.props.dsCarTopInfoState.tabList.map(
            (tabText, index) => <li onClick={this.props.dsCarTopInfoState.switchTab.bind(this.props.dsCarTopInfoState, index)} className={index === currentTabIndex ? 'active' : ''}>{tabText}</li>
          )
        }
      </ul>
    )
  }
}

export default Tabs
