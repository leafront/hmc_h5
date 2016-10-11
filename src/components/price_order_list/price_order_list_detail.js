import React from 'react'
import { Link, browserHistory } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class PriceOrderListDetails extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
  	let priceOrderLists = this.props.priceOrderList
    console.log(priceOrderLists)
    console.log(priceOrderLists.responseStates)
    let status = priceOrderLists.responseStates

    let offerPriceCount = 0
    let overtimeCount = 0
    let waitStatus = false//等待报价
    let minPrice = priceOrderLists.askpModelPrice[0]
    let validStatus = false //失效
    for(let i = 0;i < status.length;i++){
      if(status[i] == "1"){
        waitStatus = true
        break;
      }
      if(status[i] == "2"){
        overtimeCount++
      }
      if(status[i] == "3"){
        offerPriceCount++
        minPrice = Math.min(priceOrderLists.askpModelPrice[i],minPrice)
      }
      if(status[i] == "17"){
        validStatus = true;
      }
    }
    


    return (
      <Link to={"/order_offer_price/" + priceOrderLists.askpId}>
      <div>
      	<p className="compare">比价：{priceOrderLists.askpTime}</p>
      </div>
      <div>
    		<div className="car_img">
    			<img src={priceOrderLists.tpicPath}/>
    		</div>
      	<div className="car_info">
      		<p>{priceOrderLists.askpTypeName}</p>
      		<p>{priceOrderLists.askpModelName}</p>
      	</div>
      </div>
    	<div className="shop">
        {
          priceOrderLists.responseStates.map(
            (responseState, index) => <span><i className={'icon' + responseState}></i></span>
          )
        }
        {
          waitStatus == true ?
          <p><b>正在报价 |</b> 最长等待 <b>12:25</b></p>
          :null
        }
        {
          overtimeCount == status.length ?
          <p><b>超时未报价 |</b>{status.length}家均未报价</p>
          :null
        }
    		{
          offerPriceCount > 0 ?
          <p><b>已报价 |</b>{offerPriceCount}家已报,最低总价<b>{minPrice}万</b></p>
          :null
        }
        {
          validStatus == true ?
          <p><b>已下订 |</b>{offerPriceCount}家已报,最低总价<b>{minPrice}万</b></p>
          :null
        }
    	</div>
      </Link>
    )
  }
}

@observer
class PriceOrderListDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    console.log(this.props.priceOrderList)
      if(!this.props.priceOrderList) return null
    return (
      <div className = "price_order_list_detail">
      	{
      		this.props.priceOrderList.map(
      			(priceOrderList, index) => <PriceOrderListDetails priceOrderList = {priceOrderList} />
      		)
      	}
      </div>
    )
  }
}

export default PriceOrderListDetail