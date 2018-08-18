import React from 'react'

const Overlay = (props) => {
  const style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: '0.7',
    cursor: 'pointer',
    zIndex: '1050'
  }

  return (
    <div className="overlay" >
      <div className="bg-dark" style={Object.assign(style, props.style)}
        onClick={(ev) => {
          return props.onClick(ev);
        }}>
      </div>
    </div>
  )
}

export default Overlay;
