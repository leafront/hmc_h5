import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

require('../../sass/user_center/user_history.scss')

@observer
class UserHistoryComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    return (
      <li>
        <h2 className="history_title">{this.props.historyInfo.timelineType}</h2>
        <p className="history_desc">{this.props.historyInfo.timelineContent}</p>
        <p className="sign_up_time">{this.props.historyInfo.timelineTime}</p>
      </li>
    )
  }
}

@observer
class UserHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    // const testData = [
    //   {title: '注册', desc: '成为好买车用户', signUpTime: new Date().getTime()},
    //   {title: '注册', desc: '成为好买车用户', signUpTime: new Date().getTime()},
    //   {title: '注册', desc: '成为好买车用户', signUpTime: new Date().getTime()},
    //   {title: '注册', desc: '成为好买车用户', signUpTime: new Date().getTime()}
    // ]

    if (!this.props.userCenterTrackActivity.hasOwnProperty('timelines')) {
      return null
    }

    let userCenterTrackTimeline = this.props.userCenterTrackActivity.timelines

    return (
      <div className="user_history">
        <ul>
          {
            userCenterTrackTimeline.map(
              (value, index) => <UserHistoryComponent historyInfo={value}/>
            )
          }
        </ul>
      </div>
    )
  }
}

export default UserHistory
