import React from 'react'
import spinner from './spinner.gif';

export default (width = '200px') => {
    return (
        <div>
            <img
                src={spinner}
                style={{ width, margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </div>
    )
}
