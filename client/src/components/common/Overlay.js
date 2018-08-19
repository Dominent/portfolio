import React from 'react'

const Overlay = (props) => {
  const style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: '0.7',
    cursor: 'pointer',

  }

  return (
    <div className="overlay" >
      <div className="bg-dark" style={
        Object.assign(style,
          props.style,
          !!props.onTop ? { zIndex: '1050' } : {})}
        onClick={(ev) => {
          return props.onClick ? props.onClick(ev) : null;
        }}>
      </div>
    </div>
  )
}

export default Overlay;
