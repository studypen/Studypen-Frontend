import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useClassId, useIsClassOwner } from '@hooks/index'
import React, { FC, useEffect, useState } from 'react'
import './ClassDetail.scss'
import { faArrowLeft, faBackward, faCopy, faShare } from '@fortawesome/free-solid-svg-icons'
import { copy, share } from '@utils/index'
import { getClassInviteId } from '../../data/rest/index'
import { useHistory } from 'react-router'

export const ClassDetail: FC<{ id: string }> = ({ id }) => {
  const cls = useClassId(id)
  const isOwner: boolean = useIsClassOwner(cls)
  let [inviteLink, setInviteLink] = useState('')
  useEffect(() => {
    if (isOwner) {
      getClassInviteId(id).then(setInviteLink)
    } else setInviteLink('')
  }, [isOwner])

  const {goBack}= useHistory()

  if (cls === undefined) {
    return <h1>Class Not found</h1>
  }

  const InviteLink = <div className="invite-link">
    <div className="code">
      {inviteLink}
    </div>
    <button onClick={() => copy(inviteLink)} className="copy"> <FontAwesomeIcon icon={faCopy}/></button>
    <button onClick={() => share(inviteLink)} className="share"> <FontAwesomeIcon icon={faShare}/></button>
  </div>


  return <div className="class-detail">
    <h1>
      <button onClick={goBack}> <FontAwesomeIcon icon={faArrowLeft}/> </button>
      <div className="class__logo"></div>
      <div className="class__title">{cls.name} {isOwner ? '🖊️' : ''} </div>
    </h1>
    <h3>
      <div className="class__code">{cls.code} {isOwner ? '🖊️' : ''}</div>
      {isOwner ? InviteLink : ''}
    </h3>

  </div>

}