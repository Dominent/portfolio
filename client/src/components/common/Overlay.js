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
      <div className="overlay" onClick={props.onClick}>
        <div className="bg-dark" style={Object.assign(style, props.style)}>
        </div>
      </div>  
  )
}

export default Overlay;
