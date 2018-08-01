import React, { Component } from 'react';
import Icon from '../common/Icon';
import Media from '../common/Media';

const merge = (...items) => items
    .reduce((obj, item) => {
        Object.keys(item).forEach(x => obj[x] = item[x]);
        return obj;
    }, {})

class Wizard extends Component {
    render() {
        return (
              <Media
                onPhoneResize={(dimensions, style) => {
                    return Object.assign(style, {width: '20px', fontSize: '0.5vw'})
                }}
                onTabletResize={(dimensions, style) => {
                    return Object.assign(style, {width: '30px', fontSize: '1vw'})
                }}
                onLaptopResize={(dimensions, style) => {
                    return Object.assign(style, {width: '40px', fontSize: '1.5vw'})
                }}
                onDesktopResize={(dimensions, style) => {
                    return Object.assign(style, {width: '80px', fontSize: '2vw'})
                }}
              >
               {(s) => (
                    <div style={style.stepwizard}>
                        <div style={style.stepwizard_row}>
                            {this.props.steps.map(d =>
                                <React.Fragment>
                                    <div style={style.stepwizard_step}>
                                        <button type="button" className="btn btn-primary" style={style.btn_circle(s.fontSize)}>
                                            <Icon fas={d.fas} style={{width: s.width, display: 'inline-block'}}/>
                                        </button>
                                        <p className="text-dark">{d.name}</p>
                                    </div>
                                    <span style={style.stepwizard_line}></span>
                                </React.Fragment>
                            )}
                        </div>
                        <div>
                            {this.props.steps.filter(x => x.selected)[0].content} 
                        </div>
                    </div >
               )}
              </Media>
        )
    }
}

const style = {
    stepwizard: {
        width: '100%',
    },
    stepwizard_row: {
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '0 auto'
    },
    stepwizard_line: {
    },
    stepwizard_step: {
        textAlign: 'center',
    },
    stepwizard_step_button_disabled: {
        opacity: '1',
        border: '1px solid #ccc',
        color: '#ccc',
        zIndex: '30',

        WebkitAppearance: 'initial'
    },
    btn_circle: (fs) => ({
        textAlign: 'center',
        fontSize: fs,
        lineHeight: '1.428571429',
        borderRadius: '50%',

        WebkitAppearance: 'initial'
    })
}

export default Wizard;
