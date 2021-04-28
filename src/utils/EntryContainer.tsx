import React, {FC } from 'react'
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';


export const EntryContainer: FC<CSSTransitionProps> = ({ children, ...props }) => {
  const nodeRef = React.useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      {...props}
    >
      <div ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};