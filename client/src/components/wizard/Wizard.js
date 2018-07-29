import React, { Component } from 'react'


const merge = (...items) => items
    .reduce((obj, item) => {
        Object.keys(item).forEach(x => obj[x] = item[x]);
        return obj;
    }, {})

const data = [
    {
        id: 1,
        name: 'Step 1'
    },
    {
        id: 2,
        name: 'Step 2'
    },
    {
        id: 3,
        name: 'Step 3'
    }
]


class Wizard extends Component {
    render() {
        return (
            <div style={style.stepwizard}>
                <span style={style.stepwizard_row_before}></span>
                <div className="setup-panel" style={style.stepwizard_row}>
                    {data.map(d =>
                        <div style={style.stepwizard_step}>
                            <a type="button" className="btn btn-primary" style={style.btn_circle}>{d.id}</a>
                            <p>{d.name}</p>
                        </div>
                    )}
                </div>
            </div >
        )
    }
}

const style = {
    stepwizard: {
        display: 'table',
        width: '50%',
        position: 'relative',
    },
    stepwizard_row: {
        display: 'table-row'
    },
    stepwizard_row_before: {
        top: '14px',
        bottom: '0',
        position: 'absolute',
        content: '" "',
        width: '100%',
        height: '1px',
        backgroundColor: '#ccc',
        zOrder: '0'
    },
    stepwizard_step: {
        display: 'table-cell',
        textAlign: 'center',
        position: 'relative'
    },
    stepwizard_step_button_disabled: {
        opacity: '1',
        border: '1px solid #ccc',
        color: '#ccc',
        zIndex: '30',

        WebkitAppearance: 'initial'
    },
    btn_circle: {
        width: '30px',
        height: '30px',
        textAlign: 'center',
        padding: '6px 0',
        fontSize: '12px',
        lineHeight: '1.428571429',
        borderRadius: '15px',

        WebkitAppearance: 'initial'
    }
}

export default Wizard;
