import React, { Component } from 'react';
import Icon from '../common/Icon';
import Media from '../common/Media';

const merge = (...items) => items
    .reduce((obj, item) => {
        Object.keys(item).forEach(x => obj[x] = item[x]);
        return obj;
    }, {})

const data = [
    {
        fas: 'phone',
        name: 'Contacts',
        content: <div> Test </div>,
        selected: true
    },
    {
        fas: 'user',
        name: 'About'
    },
    {
        fas: 'file',
        name: 'Content'
    },
    {
        fas: 'file-image',
        name: 'Design'
    },
    {
        fas: 'chart-line',
        name: 'Marketing'
    },
    {
        fas: 'wrench',
        name: 'Maintenance'
    }
]


class Wizard extends Component {
    render() {
        return (
              <Media
                onPhoneResize={(dimensions, style) => {
                    return Object.assign(style, {width: '30px'})
                }}
                onTabletResize={(dimensions, style) => {
                    return Object.assign(style, {width: '40px'})
                }}
                onLaptopResize={(dimensions, style) => {
                    return Object.assign(style, {width: '60px'})
                }}
                onDesktopResize={(dimensions, style) => {
                    return Object.assign(style, {width: '80px'})
                }}
              >
               {(s) => (
                    <div style={style.stepwizard}>
                        <span style={style.stepwizard_line}></span>
                        <div style={style.stepwizard_row}>
                            {data.map(d =>
                                <div style={style.stepwizard_step}>
                                    <button type="button" className="btn btn-primary" style={style.btn_circle}>
                                        <Icon fas={d.fas} style={{width: s.width, display: 'inline-block'}}/>
                                    </button>
                                    <p>{d.name}</p>
                                </div>
                            )}
                        </div>
                        <div>
                            {data.filter(x => x.selected)[0].content} 
                        </div>
                    </div >
               )}
              </Media>
        )
    }
}

const style = {
    stepwizard: {
        display: 'table',
        position: 'relative',
        width: '100%'
    },
    stepwizard_row: {
        display: 'table-row'
    },
    stepwizard_line: {
        top: '2.4vw',
        bottom: '0',
        position: 'absolute',
        content: '" "',
        width: '80%',
        height: '1px',
        backgroundColor: '#ccc',
        zOrder: '0',
        margin: '0 10%'
    },
    stepwizard_step: {
        display: 'table-cell',
        textAlign: 'center',
        position: 'relative',
    },
    stepwizard_step_button_disabled: {
        opacity: '1',
        border: '1px solid #ccc',
        color: '#ccc',
        zIndex: '30',

        WebkitAppearance: 'initial'
    },
    btn_circle: {
        width: '30%',
        textAlign: 'center',
        padding: '3% 0',
        fontSize: '2vw',
        lineHeight: '1.428571429',
        borderRadius: '50%',

        WebkitAppearance: 'initial'
    }
}

export default Wizard;
