import React from 'react'
import Slider from 'react-slick'
import * as ajax from '../../helpers/ajax'

const settings = {
  className: 'slider variable-width',
  //dotsClass: 'banner_dots',
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  swipe: true,
  touchMove: true
}

class Banner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bannersItem: null
    }
  }

  async componentDidMount() {
    await ajax.getBanner.call(this)
  }

  render() {
    if (this.state.bannersItem) {
      return (
  			<div className="banner">
          <Slider {...settings}>
            { this.state.bannersItem }
          </Slider>
  			</div>
  		)
    } else {
      return null
    }
  }
}

export default Banner
