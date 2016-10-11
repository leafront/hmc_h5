import React from 'react'
import { ToastContainer, ToastMessage } from 'react-toastr'
import * as ajax from '../../helpers/ajax'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

class LoginAndReg extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOldUser: true,
      isShowAttentionMessage: false,
      verifyCodeButtonClass: '',
      verifyCodeButtonLabel: '免费验证码'
    }
    this.timer = null

    this.checkIsOldUser = this.checkIsOldUser.bind(this)
    this.getVerifyCode = this.getVerifyCode.bind(this)
    this.handleLoginAndReg = this.handleLoginAndReg.bind(this)
  }

  validatePhoneFormat(phoneNumber) {
    const PhoneNumberPattern = /^0?1[123456789]\d{9}$/
    return PhoneNumberPattern.test(phoneNumber)
  }

  validatePhoneIsEmpty(phoneNumber) {
    return phoneNumber == ""
  }

  showTips(content) {
    this.refs.container.error(
      ``, `${content}`,
      {
        closeButton: false,
        timeOut: 1400,
        preventDuplicates:false
      }
    )
  }

  checkTelephone(callback1, callback2, isVerifyCode) {
    const PhoneNumber = this.refs.telephone.value
    const PhoneNumberValid = this.validatePhoneFormat(PhoneNumber)
    const PhoneNumberIsEmpty = this.validatePhoneIsEmpty(PhoneNumber)

    if (PhoneNumber.length !== 11) {
      if (PhoneNumber.length > 11) {
        this.refs.telephone.value = this.refs.telephone.value.substr(0, 11)
      }
      if (PhoneNumber.length < 11) {
        if (PhoneNumber.length === 0 && isVerifyCode && isVerifyCode === true) {
          this.showTips('请先输入手机号')
        } else if (isVerifyCode && isVerifyCode === true) {
          this.showTips('手机号格式不正确')
        }
        this.setState({
          isShowAttentionMessage: false
        })
      }
      return false
    }

    if (!PhoneNumberValid) {
      this.showTips('手机号格式不正确')
      return false
    }

    if (this.timer && isVerifyCode) {
      return
    } else {
      callback1 && callback1.call(this, this.refs.telephone.value)
    }
    callback2 && PhoneNumber.length === 11 && callback2.call(this)
  }

  checkVerifyCode() {
    const verifycode = this.refs.verifycode.value
    this.checkTelephone(null, null, true)
    if (verifycode.length === 0) {
      this.showTips('请输入验证码')
      return
    }
  }

  getVerifyCodeTimer() {
    let i = 60

    if (this.timer) {
      return
    }

    this.timer = setInterval(() => {
      --i
      if (i === 0) {
        this.setState({
          verifyCodeButtonLabel: '重新获取',
          verifyCodeButtonClass: ''
        })
        clearInterval(this.timer)
        this.timer = null
        return
      }
      this.setState({
        verifyCodeButtonLabel: `${i}s`,
        verifyCodeButtonClass: 'disabled'
      })
    }, 1000)
  }

  checkIsOldUser() {
    this.checkTelephone(ajax.checkIsOldUser)
  }

  getVerifyCode() {
    this.checkTelephone(ajax.getVerifyCode, this.getVerifyCodeTimer, true)
  }

  getAttentionMessage() {
    let attentionMessage = '为了确保比价结果真实可靠，请您如实填写以下信息'
    if (this.state.isOldUser) {
      attentionMessage = '欢迎回来，尊敬的好买车用户！'
    }
    return attentionMessage
  }

  getNicknameInput() {
    if (!this.state.isOldUser) {
      return (
        <div className="nick_name">
          <input ref="nickname" name="nickname" type="text" placeholder="如何称呼您" onInput={this.checkIsOldUser} />
        </div>
      )
    }
  }

  handleLoginAndReg() {
    let userPhone = this.refs.telephone.value
    let userName = this.refs.nickname ? this.refs.nickname.value : null
    let smsCode = this.refs.verifycode.value
    this.checkVerifyCode()
    this.props.handleLoginAndReg.call(this, userPhone, userName, smsCode)
  }

  render() {
    let attentionMessage = this.getAttentionMessage()

    return (
      <div className="login_footer">
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-center"
        />
        {
          this.state.isShowAttentionMessage ?
            <div className="attention_msg">{attentionMessage}</div>
            : null
        }
        <input
          ref="telephone"
          name="telephone"
          type="text"
          placeholder={this.props.telephoneInputPlaceholderLabel}
          onInput={this.checkIsOldUser}
        />
        <div className="verifycode_wrap">
          <input ref="verifycode" name="verifycode" type="text" placeholder="请输入验证码" />
          <button className={this.state.verifyCodeButtonClass} type="button" onClick={this.getVerifyCode}>
            { this.state.verifyCodeButtonLabel }
          </button>
        </div>
        { this.getNicknameInput() }
        <button type="button" onClick={this.handleLoginAndReg}>{ this.props.submitButtonLabel }</button>
        <p>服务热线：<a href="tel:4008798779"><em>400-879-8779</em></a></p>
      </div>
    )
  }
}
export default LoginAndReg
