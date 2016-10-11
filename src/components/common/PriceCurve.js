import React from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

import { GLOBAL_API_DOMAIN } from '../../config'

require('../../sass/common/price_curve.scss')

class PriceCurveState {
  carTypeId = null
  @observable priceCurveData = {
    // "price":{
    //   "min":223000.0,
    //   "carModel":"3系 2016 316i 1.6T 手自一体 时尚型",
    //   "max":263000.0,
    //   "msrp":283000.0,
    //   "hmcEstimate":243920.0,
    //   "firstQuantile":235975.0,
    //   "sencondQuantile":243000.0,
    //   "thridQuantile":243950.0,
    //   "ratio95":0.6000000238418579,
    //   "factory":268850.0,
    //   "average":243151.0
    // },
    // "chart":[
    //   {
    //     "deal":2.0,
    //     "rang":[222960.0,225352.9]
    //   },
    //   {
    //     "deal":0.0,
    //     "rang":[225352.9,227705.9]
    //   },
    //   {
    //     "deal":0.0,
    //     "rang":[227705.9,230058.8]
    //   },
    //   {
    //     "deal":0.0,
    //     "rang":[230058.8,232411.8]},
    //   {
    //     "deal":15.0,
    //     "rang":[232411.8,234764.7]
    //   },
    //   {
    //     "deal":1.0,
    //     "rang":[234764.7,237117.6]
    //   },
    //   {
    //     "deal":16.0,
    //     "rang":[237117.6,239470.6]
    //   },
    //   {
    //     "deal":8.0,
    //     "rang":[239470.6,241823.5]
    //   },
    //   {
    //     "deal":43.0,
    //     "rang":[241823.5,244176.5]
    //   },
    //   {
    //     "deal":13.0,
    //     "rang":[244176.5,246529.4]
    //   },
    //   {
    //     "deal":0.0,
    //     "rang":[246529.4,248882.4]
    //   },
    //   {
    //     "deal":0.0,
    //     "rang":[248882.4,251235.3]
    //   },
    //   {
    //     "deal":3.0,
    //     "rang":[251235.3,253588.2]
    //   },
    //   {
    //     "deal":2.0,
    //     "rang":[253588.2,255941.2]
    //   },
    //   {
    //     "deal":8.0,
    //     "rang":[255941.2,258294.1]
    //   },
    //   {
    //     "deal":0.0,
    //     "rang":[258294.1,260647.06]
    //   },
    //   {
    //     "deal":5.0,
    //     "rang":[260647.06,263000.0]
    //   }
    // ]
  }

  async getPriceCurveData(){
    const source = 101
    const time = new Date().getTime()
    const mark = 'ask'
    const search = `?source=${source}&time=${time}&mark=${mark}`
    let url = `${GLOBAL_API_DOMAIN}/ware/car/pricecurve/310000/${this.carTypeId}${search}`
    const Response = await fetch(url, 
      {
        method: 'GET'
      }
    )
    const ResponseOK = await Response.ok
    const ResponseJSON = await Response.json()
    if (ResponseOK && ResponseJSON.status === '1') {
      console.log(ResponseJSON.data)
      this.priceCurveData = ResponseJSON.data
    }
  }
}

@observer
class PriceCurveButtons extends React.Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // console.log(this.refs)
    
    this.setLinesToButton()
  }
  setLinesToButton(){
    const { factory, hmcEstimate, average, msrp, min, max } = this.props.priceCurveData.price
    const ctx = this.refs.canvas.getContext('2d')
    const paperWidth = this.refs.canvas.width
    const paperHeight = this.refs.canvas.height

    // (left * paperWidth) + ',' + (paperHeight * .9 + 9)

    // ctx.beginPath();
    // ctx.moveTo(50,50);
    // ctx.lineTo(100, 100);
    // ctx.stroke();

    const pricePointData = [
      factory,
      average,
      msrp
    ]
    pricePointData.sort(function(a,b){return a - b})
    // console.log(pricePointData)

    var pricePointArray = []
    var totalRange = max - min
    var totalButtonLength = 3

    let pathVerticalHeight = 10

    for(let i = 0; i < pricePointData.length; i++){
      let left = (pricePointData[i] - min) / totalRange
// console.log(left)
      let cornerLeft = paperWidth / totalButtonLength * i + paperWidth / totalButtonLength / 2

      // console.log(paperWidth , left)
      // console.log(this.refs.canvas.height)

      // let pathToButtonWidth = parseInt($(".price_buttons").find("button").eq(i).css("width"), 10);
      // let pathToButtonLeft = Math.abs(parseInt($("#curve").offset().left,10) - parseInt($(".price_buttons").find("button").eq(i).offset().left, 10)) + pathToButtonWidth / 2;
// console.log(cornerLeft)
      ctx.beginPath();
      ctx.moveTo(paperWidth * left,0)
      ctx.lineTo(paperWidth * left, (paperHeight + pathVerticalHeight * pricePointData.length) / 2 + (pathVerticalHeight * i))
      ctx.lineTo(cornerLeft, (paperHeight + pathVerticalHeight * pricePointData.length) / 2 + (pathVerticalHeight * i))
      ctx.lineTo(cornerLeft, paperHeight)
      ctx.strokeStyle = 'rgba(9,175,236,1)'
      ctx.stroke()
    }
  }
  render(){
    const { factory, hmcEstimate, average, msrp, min, max } = this.props.priceCurveData.price

    const pricePointData = [
      { text: '4S店成本价',price: factory },
      { text: '历史平均成交价',price: average },
      { text: '厂商指导价',price: msrp }
    ]
    pricePointData.sort(function(a,b){return a.price - b.price})

    let totalRange = max - min
    let hmcPriceLeft = (hmcEstimate - min) / totalRange * 100
// (pricePointData[i] - min) / totalRange * 100
    return (
      <div className="price_curve_buttons">
        <canvas ref="canvas" width="750"></canvas>
        <ul>
          {
            pricePointData.map(
              (item, index) => {
                return (
                  <li>
                    <button>
                      <p>{item.text}</p>
                      <p>¥{item.price}</p>
                    </button>
                  </li>
                )
              }
            )
          }
        </ul>
        <div className="hmc_price" style={{left:hmcPriceLeft + '%'}}>
          <button>
            <p>好买车预测</p>
            <p>当前成交价</p>
            <p>¥{hmcEstimate}</p>
          </button>
        </div>
      </div>
    )
  }
}

@observer
class Quantiles extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    const { thridQuantile, firstQuantile, sencondQuantile, min, max } = this.props.priceCurveData.price
    const totalRange = max - min
    const quantileDataArray = [
      firstQuantile,
      sencondQuantile,
      thridQuantile,
      max
    ]

    let quantileAttrs = []

    for(var i = 0; i < quantileDataArray.length; i++){
      let left
      let rangeWidth
      if(i > 0){
        rangeWidth = ((quantileDataArray[i] - min) - (quantileDataArray[i-1] - min)) / totalRange
        left = (quantileDataArray[i-1] - min) / totalRange
      }else{
        rangeWidth = (quantileDataArray[i] - min) / totalRange
        left = 0
      }
      // console.log(rangeWidth)
      // rangeWidth = quantileDataArray[i] / max
      // if(i > 0){
      //   left = (quantileDataArray[i-1] - min) / totalRange
      // }else{
      //   rangeWidth = quantileDataArray[i] / max
      //   left = 0
      // }

      quantileAttrs.push({rangeWidth:rangeWidth * 100 + '%', left:left * 100 + '%'})
    }
    return (
      <div className="quantiles">
        {
          quantileAttrs.map(
            (item, index) => <div className="quantile_component" style={{width:item.rangeWidth, left:item.left}}></div>
          )
        }
      </div>
    )
  }
}

@observer
class PricePoint extends React.Component{
  render(){
    const { factory, hmcEstimate, average, msrp, min, max } = this.props.priceCurveData.price
    const pricePointData = [
      factory,
      hmcEstimate,
      average,
      msrp
    ]
    // console.log(pricePointData)
    // pricePointData.sort(function(a,b){return b.value - a.value})
    // console.log(pricePointData)
    pricePointData.sort(function(a,b){return a - b})

    var pricePointArray = []
    var totalRange = max - min
    for(let i = 0; i < pricePointData.length; i++){
      let left = (pricePointData[i] - min) / totalRange * 100
      // console.log(pricePointData[i] - min , pricePointData[i] , min , max, totalRange)
      // var point = paper.circle(left * paperWidth, paperHeight * .9,10)
      pricePointArray.push({left:left + '%', price:pricePointData[i]})
    }
    return (
      <ul className="price_point">
        {
          pricePointArray.map(
            (item, index) => {
              if(item.price === hmcEstimate){
                return (
                  <li className="hmc_point" style={{left:item.left}}></li>
                )
              }else{
                return (
                  <li style={{left:item.left}}></li>
                )
              }
              
            }
          )
        }
      </ul>
    )
  }
}

@observer
class PriceRect extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    // console.log(this.props.chartData.sort((a,b) => a - b))
    const { chart } = this.props

    // console.log(chart)

    var dealCount = []
    var dealCountWithOrder = []
    for(let i = 0; i < chart.length; i++){
      dealCount.push(chart[i].deal)
      dealCountWithOrder.push(chart[i].deal)
    }
    dealCountWithOrder.sort(function(a,b){return b - a})

    var rectArray = []
    for(let i = 0; i < dealCount.length; i++){
      let dealCountChartWidth = 100 / dealCount.length - 2 + '%'
      let dealCountChartHeight = dealCount[i] / dealCountWithOrder[0] * .8 * 100 + '%'
      let dealCountChartLeft = (i / dealCount.length * 80 + 10) + '%'
      // let dealCountChartTop = (100 * .9 - (dealCount[i] / dealCountWithOrder[0] * .8 * 100) * 100 * .9) + '%'
      // let priceRect = paper.rect((i / dealCount.length * 80 + 10) + '%', paperHeight * .9 - dealCountChartHeight * paperHeight * .9 , 50, dealCountChartHeight * paperHeight * .9 )
      rectArray.push({width:dealCountChartWidth,height:dealCountChartHeight,left:dealCountChartLeft})
    }

    return (
      <ul className="charts">
        {
          rectArray.map(
            (item, index) => <li style={{width:item.width,height:item.height,left:item.left}}></li>
          )
        }
      </ul>
    )
  }
}

@observer
class PriceCurve extends React.Component{
  constructor(props) {
    super(props)

    // console.log(this.props)

    this.priceCurveState = new PriceCurveState()
    this.priceCurveState.carTypeId = this.props.carTypeId || null
    // console.log(this.props)

    // this.priceCurveState.priceCurveData = testData
  }
  componentDidMount() {
    this.priceCurveState.getPriceCurveData()
    // http://10.0.0.100:20010/ware/car/pricecurve/310000/74d9c960909c49d88618410501f57e0a?source=101&time=12345&mark=ask
  }
  render(){
    const { priceCurveData } = this.priceCurveState
    if(!priceCurveData.price){
      return null
    }
    // console.log(priceCurveData)
    return (
      <div className="price_curve_wrapper">
        <div className="price_curve">
          <Quantiles priceCurveData={priceCurveData}/>
          {
            priceCurveData.chart ?
              <PriceRect chart={priceCurveData.chart}/>
            : null
          }
          <PricePoint priceCurveData={priceCurveData}/>
        </div>
        <PriceCurveButtons priceCurveData={priceCurveData}/>
      </div>
    )
  }
}

export default PriceCurve
