import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import InfoTab from '../components/user_center/info_tab'
import * as loginAndReg from '../../helpers/login_and_reg'
// import MyInfo from '../components/user_center/my_info'
import MySubscription from '../components/user_center/my_subscription'
import MyFavorite from '../components/user_center/my_favorite'

import InfoTabState from '../models/InfoTabState'
// import UserHistoryState from '../models/UserHistoryState'

require('../sass/user_center.scss')

@observer
class UserCenter extends React.Component {
  constructor(props) {
    super(props)

    this.infoTabState = new InfoTabState()
    console.log(this.props.route.path)
  }

  render(){
    console.log(this.props.route.path)
    if(this.props.route.path == ''){
      browserHistory.replace('/my_info')
    }

    return (
      <div className="user_center">
        <InfoTab infoTabState={this.infoTabState} userHistoryState={this.userHistoryState} currentPath={this.props.route.path}/>
        {
          this.props.route.path == 'my_subscription' ? <MySubscription/> : null
        }
        {
          this.props.route.path == 'my_favorite' ? <MyFavorite/> : null
        }
      </div>
    )
  }
}

export default UserCenter
