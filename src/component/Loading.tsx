import React, { FC } from "react"
import './Loading.scss'

export const BookLoading: FC = () => {
  return <div className="book">
    <div className="book__cover">
      <div className="book__left"></div>
      <div className="book__middle"></div>
      <div className="book__right"></div>
    </div>
    <ul>
      {Array(16).fill(0).map((_, i) => <li key={i} style={{ '--pos': 1 + i } as React.CSSProperties}> </li>)}
    </ul>
  </div>
}
