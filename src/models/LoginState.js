import { observable } from 'mobx'

class LoginState {
  @observable logined = false

  async doLogin(){
    // this.logined = !this.logined
    const Response = await fetch(
      '/doLogin',
      {
        body:{
          test:123
        },
        method:'post'
      }
    )
    //
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()

    console.log(ResponseJSON.hello)
  }
}

export default LoginState
