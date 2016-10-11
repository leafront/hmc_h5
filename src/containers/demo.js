import React from 'react'
import { Link } from 'react-router'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { ToastContainer, ToastMessage } from 'react-toastr'
import Modal from 'react-modal'
import ModalState from '../models/ModalState'
import Gallery from '../components/common/Gallery'
import Popup from '../components/common/Popup'
import Accordion from '../components/common/Accordion'
import Demo1, { PopupButtonCenter, PopupButtonLeft, PopupButtonRight, PopupButtonBottom } from '../components/demo/demo1'
import Demo2 from '../components/demo/demo2'
import Demo3, {Demo4} from '../components/demo/demo3'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)
const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
}

const images = [
  {
    src: 'http://haomaiche.com/upload/finalFileDir/fsInfo/8ec9c701b9dd4fa0b428f75301507d1d.jpg',
    thumbnail: 'http://haomaiche.com/upload/finalFileDir/fsInfo/8ec9c701b9dd4fa0b428f75301507d1d.jpg'
  },
  {
    src: 'http://haomaiche.com/upload/finalFileDir/fsInfo/f32d861653224a749b246e6d3b75490b.jpg',
    thumbnail: 'http://haomaiche.com/upload/finalFileDir/fsInfo/f32d861653224a749b246e6d3b75490b.jpg'
  },
  {
    src: 'http://haomaiche.com/upload/finalFileDir/fsInfo/e20c352a43054e7ca7f2cc3008eb05fb.jpg',
    thumbnail: 'http://haomaiche.com/upload/finalFileDir/fsInfo/e20c352a43054e7ca7f2cc3008eb05fb.jpg'
  },
  {
    src: 'http://haomaiche.com/upload/finalFileDir/fsInfo/8ec9c701b9dd4fa0b428f75301507d1d.jpg',
    thumbnail: 'http://haomaiche.com/upload/finalFileDir/fsInfo/8ec9c701b9dd4fa0b428f75301507d1d.jpg'
  },
  {
    src: 'http://haomaiche.com/upload/finalFileDir/fsInfo/f32d861653224a749b246e6d3b75490b.jpg',
    thumbnail: 'http://haomaiche.com/upload/finalFileDir/fsInfo/f32d861653224a749b246e6d3b75490b.jpg'
  },
  {
    src: 'http://haomaiche.com/upload/finalFileDir/fsInfo/e20c352a43054e7ca7f2cc3008eb05fb.jpg',
    thumbnail: 'http://haomaiche.com/upload/finalFileDir/fsInfo/e20c352a43054e7ca7f2cc3008eb05fb.jpg'
  }
]

const images2 = [
  {
    src: 'http://haomaiche.com/upload/finalFileDir/fsInfo/f32d861653224a749b246e6d3b75490b.jpg',
    thumbnail: 'http://haomaiche.com/upload/finalFileDir/fsInfo/f32d861653224a749b246e6d3b75490b.jpg'
  },
  {
    src: 'http://haomaiche.com/upload/finalFileDir/fsInfo/8ec9c701b9dd4fa0b428f75301507d1d.jpg',
    thumbnail: 'http://haomaiche.com/upload/finalFileDir/fsInfo/8ec9c701b9dd4fa0b428f75301507d1d.jpg'
  },
]

const items = [
  {label: 'hello', text: 'this is panel content'},
  {label: 'title2', text: 'this is panel content2 or other'}
]

@observer
class Demo extends React.Component {
  constructor(props) {
    super(props)
  }


  afterOpenFn = () => {
    console.log('opened')
  }

  requestCloseFn = () => {
    console.log('close')
  }


  addAlert = () => {
    this.refs.container.success(
      `hi! Now is ${new Date()}`, `///title\\\\\\`,
      {
        closeButton: false,
        timeOut: 2000,
        preventDuplicates:false
      }
    )

    this.refs.container.info(
      <strong>I am a strong title</strong>,
      <em>I am an emphasized message</em>,
      {
        closeButton: false,
        timeOut: 2000
      }
    )
  }

  clearAlert = () => {
    this.refs.container.clear()
  }


  render() {
    return (
      <div>
        <br/>
        <br/>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-bottom-center"
        />
        <button className="primary" onClick={this.addAlert} style={{marginRight: '20px'}}>
          Show Message
        </button>
        <button className="primary" onClick={this.clearAlert}>
          CLEAR
        </button>

        <br/>
        <br/>
        <Gallery images={images} heading="提车" subheading="demo" isShowSmallImg={true} />


        <br/>
        <br/>
        <Gallery images={images2} />

        <br/>
        <br/>
        <Popup component={Demo1} button={PopupButtonCenter} popupClassName="pop_center" type="center"/>
        <br/>
        <Popup component={Demo2} button={PopupButtonLeft} popupClassName="pop_left" type="left" />
        <br/>
        <Popup component={Demo1} button={PopupButtonRight} popupClassName="pop_right" type="right" />
        <br/>
        <Popup component={Demo2} button={PopupButtonBottom} popupClassName="pop_bottom" type="bottom" />

        <br/>
        <br/>
        <Accordion title="如何看懂价格曲线" items={items} />

        <br/>
        <br/>
        <Demo3 />
        <Demo4 />
      </div>
    )
  }
}

export default Demo
