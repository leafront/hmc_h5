import { observable } from 'mobx'

class ModalState {
  @observable modalIsOpen = false

  openModal = () => {
    this.modalIsOpen = true
  }

  closeModal = () => {
    this.modalIsOpen = false
  }

}

export default new ModalState()
