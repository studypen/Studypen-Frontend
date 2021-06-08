import React, { FC } from 'react'
import '@pages/page.scss'
import { ClassDetail } from '@components/classes/ClassDetail'
import { useRouteMatch } from 'react-router'
import { Chat } from '@components/chat/Chat'

export const ClassPage: FC = ()=>{
  const {params: {id}} = useRouteMatch<{id: string}>("/class/:id")?? {params : {id: ''}}


  return <section className="class-page page">
    <ClassDetail id={id} />
    {/* { TODO: tab or easy layout } */}
    <Chat/>
  </section>
}