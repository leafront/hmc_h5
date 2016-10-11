import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

// import DirectCarScroll from '../../components/common/direct_car_scroll'
import Popup from '../../components/common/Popup'
import ChooseDirectSale ,{DirectSaleDetailCarType} from '../../components/direct_sale_detail/choose_direct_detail_car_type'



@observer
class DirectSaleDetailTabCarTypeContent extends React.Component {
  constructor(props){
    super(props)
  }
  render(){

      // <DirectSaleDetailLandPrice
      //   dsCarTopInfoState={this.props.dsCarTopInfoState}
      // />

        // <DirectSaleDetailPopup/>
    return(
      <div>
        <DirectSaleDetailGift/>
      </div>
    )
  }
}

export default DirectSaleDetailTabCarTypeContent
