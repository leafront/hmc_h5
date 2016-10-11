import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

require('../../sass/user_center/my_favorite.scss')

@observer
class MyFavoriteComponent extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    return (
      <li>
        <div className="car_image">
          <img src={this.props.favoriteCarInfo.carImageLink}/>
          <b className="discount">{this.props.favoriteCarInfo.discount}</b>
        </div>
        <div className="car_desc">
          <p className="car_series_name">{this.props.favoriteCarInfo.carSeriesName}</p>
          <p className="car_model_name">{this.props.favoriteCarInfo.carModelName}</p>
          <p className="type_tag">
            {
              this.props.favoriteCarInfo.priceTags.map(
                (value, index) => <span>{value}</span>
              )
            }
          </p>
        </div>
        <div className="price">
          <p className="dsrp">{this.props.favoriteCarInfo.dsrp}</p>
          <p className="msrp">{this.props.favoriteCarInfo.msrp}</p>
        </div>
      </li>
    )
  }
}

@observer
class MyFavorite extends React.Component {
  constructor(props) {
    super(props)

  }
  render(){
    const testData = [
      {carImageLink: 'http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png', carSeriesName: 'BMW 3系', carModelName: '340i 手自一体', priceTags: ['可售全国','可售全国','可售全国'], msrp: '55万', dsrp: '49万', discount: '7.7折'},
      {carImageLink: 'http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png', carSeriesName: 'BMW 3系', carModelName: '340i 手自一体', priceTags: ['可售全国','可售全国','可售全国'], msrp: '55万', dsrp: '49万', discount: '7.7折'},
      {carImageLink: 'http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png', carSeriesName: 'BMW 3系', carModelName: '340i 手自一体', priceTags: ['可售全国','可售全国','可售全国'], msrp: '55万', dsrp: '49万', discount: '7.7折'},
      {carImageLink: 'http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png', carSeriesName: 'BMW 3系', carModelName: '340i 手自一体', priceTags: ['可售全国','可售全国','可售全国'], msrp: '55万', dsrp: '49万', discount: '7.7折'}
    ]

    return (
      <div className="my_favorite">
        <ul className="favorite_list">
          {
            testData.map(
              (value, index) => <MyFavoriteComponent favoriteCarInfo={value}/>
            )
          }
        </ul>
      </div>
    )
  }
}

export default MyFavorite
