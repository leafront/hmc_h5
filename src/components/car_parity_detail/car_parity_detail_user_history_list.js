import React from 'react'
import { observer } from 'mobx-react'
import Gallery from '../common/Gallery'
import Popup from '../common/Popup'
import UserHistoryState from '../../models/UserHistoryState'
import { CarParityButtonOne } from './car_parity_detail_button'
import CarParity from '../common/car_parity'

@observer
class UserHistoryListItem extends React.Component {
  constructor(props) {
    super(props)
    this.toggleMore = this.toggleMore.bind(this)
    this.state = {
      acitveClass: ''
    }
  }

  toggleMore() {
    if (this.props.userHistoryState.isShowMore){
      this.setState({
        acitveClass: ''
      })
    } else {
      this.setState({
        acitveClass: 'active'
      })
    }
    this.props.userHistoryState.isShowMore = !this.props.userHistoryState.isShowMore
  }

  getTimelines() {
    let { item } = this.props
    let timelines = item.timelines.map((timeline, i) => {
      let images = timeline.images.map((image, i) => {
        return ({
          src: image.imageUrl,
          thumbnail: image.imageUrl
        })
      })
      let userHistoryStateClass, statusClass

      switch (timeline.timelineType) {
        case 5:
        case 6:
        case '签单':
        case '提车':
          statusClass = 'active'
          break;
        default:
          statusClass = ''
      }

      if (i > 1 && this.props.userHistoryState.isShowMore) {
        userHistoryStateClass = ''
      } else if (i > 1) {
        userHistoryStateClass = 'hide'
      }

      return (
        <li className={userHistoryStateClass}>
          <div className={statusClass}>
            <span className="track_circle"><i></i></span>
            <span className="track_type">{ timeline.timelineType }</span>
            <span className="track_content">{ timeline.timelineContent }</span>
            { timeline.images.length > 0 ?
              <div className="track_image">
                <Gallery images={images} isShowSmallImg={true}/>
              </div> : null
            }
            <span className="track_time">{ timeline.timelineTime.split(' ')[0] }</span>
          </div>
        </li>
      )
    })
    return timelines
  }

  render() {
    let { item } = this.props
    return (
      <li>
        <div className="history_price_header">
          <div className="store_parity_user_img">
            <span className="img_wrapper">
              <img src={ item.user.timelineUserPic } />
            </span>
          </div>
          <p>
            <strong>{ item.user.timelineUserName }</strong>
            <span>{ item.user.timelinePhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') }</span>
          </p>
        </div>
        <div className="track_records">
          <ol>
            { this.getTimelines() }
          </ol>
        </div>
        <strong className={'toggle_more ' + this.state.acitveClass} onClick={this.toggleMore}>
          <i></i>
        </strong>
      </li>
    )
  }
}

@observer
class CarParityDetailUserHistoryList extends React.Component {
  constructor(props) {
    super(props)
  }

  getUserHistoryList() {
    let userHistoryStates = this.props.carParityUserHistory.map((timeline, i) => {
      return new UserHistoryState()
    })

    if (this.props.carParityUserHistory.length === 0) {
      return
    }

    return (
      this.props.carParityUserHistory.map((history, i) => {
        return (
          <UserHistoryListItem
            item={history}
            {...this.props}
            index={i}
            userHistoryState={userHistoryStates[i]}
          />
        )
      })
    )
  }

  render() {
  	return(
  		<div className="car_user_history_list">
        <ul>
          { this.getUserHistoryList() }
        </ul>
        <Popup
          component={CarParity}
          button={CarParityButtonOne}
          data={this.props.carParityState}
          {...this.props}
          popupClassName="popup_car_parity animated"
          animateClass="bounceIn"
          type="center"
        />
  		</div>
  	)
  }
}

export default CarParityDetailUserHistoryList
