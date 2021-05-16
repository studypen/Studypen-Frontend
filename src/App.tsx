import React from 'react'
import './App.scss'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'

import { store } from '@data/store'
import { Routes } from '@routes/Routes'

setConfig({
  reloadHooks: false,
})

const App: React.FC = () =>
(
  <Provider store={store}>
    <div className="App">
      <Routes/>
    </div>
  </Provider>
)

export default hot(App)
