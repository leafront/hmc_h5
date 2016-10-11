import React from 'react'

export class DirectSaleDetailCarType extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="car_type" onClick={this.props.openModal}>
        <ul>
          <li>
            <span>款型：</span>
            <span>3系2016款3系2016款3系2016款3系2016款3系2016款3系2016款</span>
            <i>共12款</i>
            <span>></span>
          </li>
          <li>
            <span>颜色：</span>
            <span>外观|内饰</span>
            <span>></span>
          </li>
          <li>
            <span>购车方式：</span>
            <span>全款购置</span>
            <span>></span>
          </li>
          <li>
            <span>牌照：</span>
            <span>上外牌</span>
            <span>></span>
          </li>
        </ul>
      </div>
    )
  }
}

// class ChooseCarType extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//     return(
//       <div className="choose_car_type">
//           <div className="popup_title">款型</div>
//           <ul>
//             <li><span>20.58万 |</span> 3系 2016款  328Li xDrive 2.0T 手自一体 豪华运动套装</li>
//             <li><span>20.58万 |</span> 3系 2016款  328Li xDrive 2.0T 手自一体</li>
//             <li><span>20.58万 |</span> 3系 2016款  328Li xDrive 2.0T 手自一体</li>
//           </ul>
//       </div>
//     )
//   }
// }
//
// class ChooseColor extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//   return(
//     <div className="choose_color">
//         <div className="popup_title">颜色(外观/内饰)</div>
//         <ul>
//           <li>ddd</li>
//           <li>ddd</li>
//           <li>ddd</li>
//           <li>ddd</li>
//         </ul>
//     </div>
//   )
//   }
// }

// class ChoosePurchaseWay extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//   return(
//     <div className="choose_purchase_way">
//         <div className="popup_title">购车方式</div>
//         <ul>
//           <li>ddd</li>
//           <li>ddd</li>
//           <li>ddd</li>
//           <li>ddd</li>
//         </ul>
//     </div>
//   )
//   }
// }

// class ChooseLicense extends React.Component {
//   constructor(props){
//     super(props)
//   }
//   render(){
//   return(
//     <div className="choose_license">
//         <div className="popup_title">牌照</div>
//         <ul>
//           <li>ddd</li>
//           <li>ddd</li>
//         </ul>
//     </div>
//   )
//   }
// }

// class ChooseDirectSale extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//
//   render() {
//     return (
//       <div className="ds_detail_popup_choose">
//         <ChooseCarType/>
//         <ChooseColor/>
//         <ChoosePurchaseWay/>
//         <ChooseLicense/>
//         <button onClick={this.props.closeModal} className="choose_confirm">确定</button>
//       </div>
//     )
//   }
// }

// export default ChooseDirectSale
