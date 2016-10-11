import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
class AppLoading extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    if(!appState.isLoading){
      return null
    }
    return (
      <div className="app_loading"></div>
    )
  }
}

export default AppLoading
