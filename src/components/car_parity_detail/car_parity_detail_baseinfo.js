import React from 'react'
import { observer } from 'mobx-react'
import Gallery from '../common/Gallery'
import Popup from '../common/Popup'
import { CarParityButtonTwo } from './car_parity_detail_button'
import CarParity from '../common/car_parity'
import { MoneyByTenThousand } from '../../../helpers/formatters'

@observer
class CarParityDetailBaseinfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { carParityTopInfo, carParityImages } = this.props
    let images = carParityImages.map((image, i) => {
      return ({
        src: image.tpicPath,
        thumbnail: image.tpicPath
      })
    })

  	return(
      <div className="base_info_wrap clearfix">
        <div className="base_info">
          <div className="img_container">
            <img src={ carParityTopInfo.typePic } />
          </div>
          <div className="car_desc">
            <h1>
              { carParityTopInfo.carBrand } { carParityTopInfo.typeName }
            </h1>
            <h2>指导价：{ MoneyByTenThousand(carParityTopInfo.minPrice) }-{ MoneyByTenThousand(carParityTopInfo.maxPrice) }万</h2>
            <Popup
              component={CarParity}
              button={CarParityButtonTwo}
              data={this.props.carParityState}
              {...this.props}
              popupClassName="popup_car_parity animated"
              animateClass="bounceIn"
              type="center"
            />
          </div>
        </div>
        <Gallery images={images} />
      </div>
  	)
  }
}

export default CarParityDetailBaseinfo
