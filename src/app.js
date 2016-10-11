import 'babel-polyfill'
import 'whatwg-fetch'

import React , { PropTypes } from 'react'
import { render } from 'react-dom'

import { Router, IndexRedirect, Route , Link , Redirect , browserHistory, IndexRoute } from 'react-router'
import { createBrowserHistory } from 'history'

import Index from './containers/index'
import LoginCommon from './containers/login_common'
import NotFound from './containers/not_found'
// import AppLoading from './components/common/AppLoading'

import Demo from './containers/demo'

import DirectSaleDetail from './containers/direct_sale_detail'
import DirectSaleList from './containers/direct_sale_list'
import DirectSalePrice from './containers/direct_sale_price'
import CarParityDetail from './containers/car_parity_detail'
// import UserCenter from './containers/user_center'
import MySubscriptionDetail from './containers/my_subscription_detail'

import MyInfo from './containers/my_info'
import MySubscription from './containers/my_subscription'
import MyFavorite from './containers/my_favorite'
// import InfoTab from './components/user_center/info_tab'

import PriceOrderList from './containers/PriceOrderList'
import AskOrderList from './containers/AskOrderList'

import OrderOfferPrice from './containers/order_offer_price'
import OrderOfferAsk from './containers/order_offer_ask'
require('./sass/app.scss')

import appState from './models/appState'

// import PriceCurve from './components/common/PriceCurve'

// import App from './entry'
// import Index from './containers/index'

// import { CollectVisitData } from './data_collection'

// import TopBar from './top_bar.js'

// import { Router, useRouterHistory } from 'react-router'
// import { createHashHistory } from 'history'
// useRouterHistory creates a composable higher-order function
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
// <Router history={appHistory}/>

// import { Router, useRouterHistory } from 'react-router'
// import { createHashHistory } from 'history'
// // useRouterHistory creates a composable higher-order function
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
// <Router history={appHistory}/>
// const Response = fetch(GetGlobalConfig().env + '/hybrid/ask/getIPCode')

// import { Router, useRouterHistory } from 'react-router'
// import { browserHistory } from 'react-router'
// <Router history={browserHistory} />

// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
// <Router history={appHistory}/>
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

// import RootReducer from './reducers'

// let store = createStore(RootReducer)

window.appState = appState

// class Test extends React.Component {
// <Route path="/" component={Index}/>

// carModelOptions: carInfoData[i].modelName,
// colorOptions: carInfoData[i].modelColorName.split('#') || [],
// modelPaymentOptions: carInfoData[i].modelPaymentOption.split('#') || [],
// licenseOptions: carInfoData[i].modelLicenseOption.split('#') || [],
//
    // <Route path="/ask_order_list" component={AskOrderList}/>
    // <Route path="/test" component={PriceCurve}/>
render ((
  <Router history={browserHistory}>
    <Route path="/" component={Index}/>
    <Route path="/demo" component={Demo}/>
    <Route path="/login" component={LoginCommon}/>
    <Route path="/direct_sale_list" component={DirectSaleList}/>
    <Route path="/direct_sale_detail/:directSaleCarTypeId/:directSaleCarModelId" component={DirectSaleDetail}/>
    <Route path="/direct_sale_price/:directSaleCarTypeId/:directSaleCarModelId/:colorOptionIndex/:payMethodOptionIndex/:licenseOptionIndex" component={DirectSalePrice}/>
    <Route path="/car_parity_detail/:typeId" component={CarParityDetail}/>
    <Route path="/user_center">
      <IndexRedirect to="/user_center/my_info"/>
      <Route path="my_info" component={MyInfo}/>
      <Route path="my_subscription" component={MySubscription}/>
      <Route path="my_favorite" component={MyFavorite}/>
      <Route path="my_subscription_detail/:subscriptionOrder" component={MySubscriptionDetail}/>
    </Route>
    <Route path="/order_offer_list">
      <IndexRedirect to="/order_offer_list/price"/>
      <Route path="price" component={PriceOrderList}/>
      <Route path="ask" component={AskOrderList}/>
    </Route>
    <Route path="/order_offer_price/:askpId" component={OrderOfferPrice}/>
    <Route path="/order_offer_ask/:orderId/:orderType" component={OrderOfferAsk}/>
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('content'))
