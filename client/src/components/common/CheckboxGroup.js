import React from 'react';
import classnames from 'classnames';
import Styles from '../common/Styles';

//https://bootsnipp.com/snippets/featured/funky-radio-buttons
const CheckboxGroup = ({
    icon,
    placeholder,
    name,
    onChange,
    error
}) => Styles.apply('CheckboxGroup', 
    `
        .btn-default {
            border: 1px solid #D1D3D4;
        }

      
        .input-group input[type="checkbox"] {
            display: none;
        }

        .input-group input[type="checkbox"] + .btn-group > label span {
            width: 15px;
        }

        .input-group input[type="checkbox"] + .btn-group > label span:first-child {
            display: none;
        }

        .input-group input[type="checkbox"] + .btn-group > label span:last-child {
            display: inline-block;   
        }

        .input-group input[type="checkbox"]:not(:checked) + .btn-group > label:first-child {
            background-color: #D1D3D4;
            border-color: #D1D3D4
        }

        .input-group input[type="checkbox"]:checked + .btn-group > label span:first-child {
            display: inline-block;
        }

        .input-group input[type="checkbox"]:checked + .btn-group > label span:last-child {
            display: none;   
        }
    `,
    <React.Fragment>
        <div className="checkboxgroup-header">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className={icon} />
                    </span>
                </div>
                <div className="form-control form-control-lg"> {placeholder} </div>
            </div>
        </div>

        <div className="checkboxgroup-body">
            {checkbox('Primary Checkbox', 'primary', (ev) => { console.log(ev.target.checked) })}
            {checkbox('Success Checkbox', 'success')}
            {checkbox('Success Checkbox', 'success')}
        </div>
    </ React.Fragment>
)

const GUID_Generator = () => {
    const chr4 = () => Math.random().toString(16).slice(-4);

    return chr4() + chr4() +
      '-' + chr4() +
      '-' + chr4() +
      '-' + chr4() +
      '-' + chr4() + chr4() + chr4();
  }

const checkbox = (title, type, changeHandler) => {
    const types = [
        'secondary',
        'primary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'link'
    ];

    if(!types.includes(type)) {
        throw `Invalid Checkbox Type - ${type}, Valid Options - ${types.join(',')}`
    }

    const id = GUID_Generator();
    
    return (
        <div className="input-group mb-3">
            <input type="checkbox" id={`checkbox-default-${type}-${id}`} onChange={() =>changeHandler}/>
            <div className="btn-group">
                <label htmlFor={`checkbox-default-${type}-${id}`} className={`btn btn-${type}`}>
                    <span className="fas fa-check" />
                    <span className="placeholder" />
                </label>
                <label htmlFor={`checkbox-default-${type}-${id}`} className="btn btn-default">
                    {title}
                </label>
            </div>
        </div>
    )
}

export default CheckboxGroup;