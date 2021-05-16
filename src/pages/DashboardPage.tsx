import React from 'react'
import { Dashboard } from '../components/Dashboard'
import '@pages/page.scss'

export const DashboardPage: React.FC = () => {

  return (
    <section className="page dashboard-page">
      <Dashboard />
    </section>
  )
}