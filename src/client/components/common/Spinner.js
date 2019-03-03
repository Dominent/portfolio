import React from 'react'
import spinner from '../../img/spinner.gif'

export default ({ width }) => {
    return (
        <div>
            <img
                src={spinner}
                style={{ width: !!width ? width : '200px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </div>
    )
}
