import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import * as ajax from '../helpers/ajax'
import * as loginAndReg from '../helpers/login_and_reg'

// require('../../sass/user_center/user_base_info.scss')

import InfoTab from '../components/user_center/info_tab'
import UserBaseInfo from '../components/user_center/user_base_info'
import UserHistory from '../components/user_center/user_history'
import Banner from '../components/common/banner'
import DirectCarScroll from '../components/common/direct_car_scroll'

import InfoTabState from '../models/InfoTabState'

import BottomBarCommon from '../components/common/bottom_bar_common'

require('../sass/my_info.scss')

@observer
class MyInfo extends React.Component {
  constructor(props) {
    super(props)

    this.infoTabState = new InfoTabState({currentHighlightTabIndex:0})

    this.state = {
      userCenterTrackActivity:{}
    }


  }

  async componentDidMount() {
    let isLogin = await loginAndReg.CheckLogin()
    if (!isLogin) {
      browserHistory.replace('/login?frompage=user_center/my_info')
    } else {
      let accessToken = loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN') && loginAndReg.GetLocalStorageInfo('HMC_ACCESS_TOKEN').accessToken
      await ajax.getUserCenterTrackActivity.call(this, accessToken)
    }
  }

  render(){
    //console.log(this.state.userCenterTrackActivity)
    return (
      <div className="my_info">
        <InfoTab infoTabState={this.infoTabState}/>
        <UserBaseInfo
          {...this.state}
        />
        <UserHistory
          {...this.state}
        />
        <DirectCarScroll/>
        <Banner/>
        <BottomBarCommon/>
      </div>
    )
  }
}

export default MyInfo
