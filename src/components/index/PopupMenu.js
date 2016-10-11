import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

require('../../sass/index/PopupMenu.scss')

@observer
class PopupMenu extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    if(!this.props.popupMenuState.isPopupMenuVisible) {
      return null
    }
    return (
      <div className="popup_menu">
        <button className="close_btn" onClick={this.props.popupMenuState.hidePopupMenu.bind(this.props.popupMenuState)}>×</button>
        <ul className="menu_list">
          <li><Link to="">比价购车</Link></li>
          <li><Link to="/direct_sale_list">好买车自营直销车</Link></li>
          <li><Link to="/">我的比价单／订单</Link></li>
          <li><Link to="">个人中心</Link></li>
          <li><Link to="">APP设置</Link></li>
          <li><a href="">拨打400免费服务热线</a></li>
          <li><Link to="">在线客服</Link></li>
        </ul>
        <div className="footer">
          <div className="other_btn"><button>关于</button> | <button>反馈</button></div>
          <div className="">
            <p>© 2013-2016 上海轩言网络信息科技有限公司</p>
            <p>销售服务：上海互言汽车服务有限公司</p>
          </div>
        </div>
      </div>
    )
  }
}

export default PopupMenu
