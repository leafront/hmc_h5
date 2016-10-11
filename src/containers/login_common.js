import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { ToastContainer, ToastMessage } from 'react-toastr'

import * as ajax from '../helpers/ajax'
import * as loginAndReg from '../helpers/login_and_reg'
import LoginAndReg from '../components/common/login_and_reg'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

@observer
class LoginCommon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fromPage: props.params.fromPage || "",
    }

    this.doAfterLoginAndReg = this.doAfterLoginAndReg.bind(this)
    this.handleLoginAndReg = this.handleLoginAndReg.bind(this)
    this.clickCloseBtn = this.clickCloseBtn.bind(this)
  }

  async componentDidMount() {
    let isLogin = await loginAndReg.CheckLogin()
    let path = window.location.search
    path = path.split('=')[1] || '/'
    if (isLogin && path.length > 0) {
      browserHistory.replace(path)
    }
  }

  doAfterLoginAndReg() {
    let path = window.location.search
    path = path.split('=')[1]
    browserHistory.replace(path)
  }

  handleLoginAndReg(userPhone, userName, smsCode) {
    ajax.registerAndReg(userPhone, userName, smsCode, this.refs.container, this.doAfterLoginAndReg)
  }

  clickCloseBtn() {
    browserHistory.replace('/')
  }

  render() {
    return (
      <div className="login_common">
        <div className="login_common_container">
          <button className="close_btn" onClick={this.clickCloseBtn}></button>
          <h3>亲，我们等您很久了</h3>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="container"
            className="toast-top-center"
          />
          <LoginAndReg
            handleLoginAndReg={this.handleLoginAndReg}
            telephoneInputPlaceholderLabel='输入您的手机号码'
            submitButtonLabel='登录'
          />
        </div>
      </div>
    )
  }
}

export default LoginCommon
