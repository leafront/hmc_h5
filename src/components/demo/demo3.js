import React from 'react'
import Slider from 'react-slick'

const settings = {
  className: 'slider variable-width',
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1/*,
  variableWidth: true,
  centerMode: true,
  beforeChange: function (currentSlide, nextSlide) {
    console.log('before change', currentSlide, nextSlide);
  },
  afterChange: function (currentSlide) {
    console.log('after change', currentSlide);
  },
  slickGoTo: this.state.slickGoTo || 0,
  rtl: true,
  pauseOnHover: true,
  lazyLoad: true,
  fade: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />*/
}

export class Demo4 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    //settings.autoplay = true
		return (
			<div className="demo4">
        <Slider {...settings}>
          <div>
            <a href="http://event.haomaiche.com/substitute_licence/h5/">
              <img width="100%" src="http://www.haomaiche.com//upload/finalFileDir/2016-08-04/4325ca10d81541c9985820fb9b366eae.jpg"/>
            </a>
          </div>
          <div>
            <a href="http://campaign.haomaiche.com/h5/activity2.html?eventCode=10006&amp;terminalType=h5&amp;eventName=kaidilake0804&amp;activityCode=SH-KDLK-160803-H5">
              <img width="100%" src="http://www.haomaiche.com//upload/finalFileDir/2016-08-04/839eda271b9b4ad28eb880e0d0df231c.jpg"/>
            </a>
          </div>
          <div>
            <a href="http://event.haomaiche.com/w5_return/h5/">
              <img width="100%" src="http://www.haomaiche.com//upload/finalFileDir/2016-06-27/437a8e23911143f1b8962dacb87373d7.jpg"/>
            </a>
          </div>
          <div>
            <a href="http://campaign.haomaiche.com/h5/activity2.html?eventCode=10007&amp;terminalType=h5&amp;eventName=rav40811">
              <img width="100%" src="http://www.haomaiche.com//upload/finalFileDir/2016-08-11/40ca2226c46c41ed90c2f44df31bedbd.jpg"/>
            </a>
          </div>
          <div>
            <a href="http://event.haomaiche.com/upgrade">
              <img width="100%" src="http://www.haomaiche.com//upload/finalFileDir/2016-07-05/8aa731ec49f94b9b9551e44a3c08ced7.jpg"/>
            </a>
          </div>
          <div>
            <a href="http://event.haomaiche.com/new_energy_car_160715/h5/">
              <img width="100%" src="http://www.haomaiche.com//upload/finalFileDir/2016-07-20/8f5c08b05b1a47f685fb3e90cae64b4f.jpg"/>
            </a>
          </div>
        </Slider>
			</div>
		)
  }
}

class Demo3 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
		return (
			<div className="slider">
        <Slider {...settings}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Slider>
			</div>
		)
  }
}

export default Demo3
