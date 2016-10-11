import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import BottomBarCommon from '../common/bottom_bar_common'


// require('../../sass/user_center/user_base_info.scss')

import UserBaseInfo from './user_base_info'
import UserHistory from './user_history'

@observer
class MyInfo extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    return (
      <div className="my_info">
        <UserBaseInfo/>
        <UserHistory/>
        <BottomBarCommon/>
      </div>
    )
  }
}

export default MyInfo
