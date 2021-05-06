import React from 'react'
import './App.scss'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { store } from './data/store'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Footer } from './components/Footer'

setConfig({
  reloadHooks: false,
})

const App: React.FC = () =>
(
  <Provider store={store}>
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/"> <Home/> </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  </Provider>
)

export default hot(App)
