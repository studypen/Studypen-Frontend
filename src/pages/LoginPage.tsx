import React, { useEffect } from 'react'
import { Welcome } from '@components/Welcome'

import '@pages/page.scss'
import { useIsLogin, useQuery } from '@hooks/index'
import { useHistory, useParams, useRouteMatch } from 'react-router'

export const LoginPage: React.FC = () => {
  const isLogin = useIsLogin()
  const history = useHistory()
  const [next] = useQuery(['next'])
  useEffect(() => { if (isLogin) history.push(next) }, [isLogin])


  return (
    <section className="page login-page">
      <Welcome />
    </section>
  )
}