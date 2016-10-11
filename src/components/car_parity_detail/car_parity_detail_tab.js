import React from 'react'
import { observer } from 'mobx-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import CarParityDetailInfo from './car_parity_detail_info'
import CarParityDetailHistoryPrice from './car_parity_detail_history_price'
import CarParityDetailUserHistory from './car_parity_detail_user_history'

@observer
class CarParityDetailTab extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		Tabs.setUseDefaultStyles(false)
		return (
      <div className="car_parity_detail_tab">
  		  <Tabs
  		    onSelect={this.handleSelect}
  		    selectedIndex={this.props.carParityState.carParityData.selectedTabIndex} //被选中的Tab
  		  >
  		    <TabList>
  		      <Tab>车辆信息</Tab>
  		      <Tab>用户比价案例</Tab>
  		      <Tab>用户晒单({ this.props.userHistoryRecordNum })</Tab>
  		    </TabList>
  		    <TabPanel>
  		      <CarParityDetailInfo {...this.props} />
  		    </TabPanel>
  		    <TabPanel>
  		      <CarParityDetailHistoryPrice {...this.props} />
  		    </TabPanel>
  		    <TabPanel>
  		      <CarParityDetailUserHistory {...this.props} />
  		    </TabPanel>
  		  </Tabs>
      </div>
		)
	}
}

export default CarParityDetailTab
