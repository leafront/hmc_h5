import React from 'react'
import { observer } from 'mobx-react'


class ShopComment extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="shop_comment">
        <div className="dislike">
          <span>踩：</span>
          <img src="/images/common/handdown.png" />
        </div>
        <div className="like">
          <img src="/images/common/handup.png"/>
          <span>赞：</span>
        </div>
      </div>
    )
  }
}

export default ShopComment