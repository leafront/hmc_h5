import React from 'react'

import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

class RecommandCarListState {
  @observable recommandCarListData = []
}

export default RecommandCarListState
