import { useIsLoading, useIsLogin } from '../hooks'
import React, { FC } from 'react'
import { LoadingPage } from '@pages/LoadingPage'
import { Nav } from '@components/Nav'
import { LoginPage } from '@pages/LoginPage'
import { ClassPage } from '@pages/Classes'
import { DashboardPage } from '@pages/DashboardPage'
import { UserRoute } from '@components/auth/AuthGuard'
import { Footer } from '@components/Footer'
import '@routes/Routes.scss'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Page404 } from '@pages/404page'


export const Routes: FC = () => {
  const isLoading = useIsLoading()

  if (isLoading) return <LoadingPage />

  return <div className="Routes">
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/login"> <LoginPage /> </Route>
        <UserRoute exact path="/" component={DashboardPage}/>
        <UserRoute exact path="/class/:id" component={ClassPage}/>
        <Route component={Page404} />
      </Switch>
      <Footer />
    </Router>
  </div>
}
