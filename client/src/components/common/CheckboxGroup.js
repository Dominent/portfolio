import React from 'react';
import classnames from 'classnames';

//https://bootsnipp.com/snippets/featured/funky-radio-buttons
const CheckboxGroup = ({
    icon,
    placeholder,
    name,
    onChange,
    error
}) => (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon} />
            </span>
        </div>
        <div   
            className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
        > {placeholder} </div>
        {error && (<div className="invalid-feedback">
            {error}
        </div>)}
    </div>
)

export default CheckboxGroup;