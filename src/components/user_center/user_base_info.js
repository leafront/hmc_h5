import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import * as loginAndReg from '../../helpers/login_and_reg'

require('../../sass/user_center/user_base_info.scss')

@observer
class UserBaseInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.userCenterTrackActivity.hasOwnProperty('user')) {
      return null
    }

    let userTrack = this.props.userCenterTrackActivity
    return (
        <div className="user_base_info">
          <div className="user_avatar"><img width="100" src={userTrack.user.timelineUserPic}/></div>
          <div className="contact">
            <p>{userTrack.user.timelineUserName}</p>
            <p className="phone_number">{userTrack.user.timelinePhone}</p>
          </div>
          <div className="logout_btn"><button onClick={loginAndReg.DoLogout}>退出登录</button></div>
        </div>
    )
  }
}

export default UserBaseInfo
