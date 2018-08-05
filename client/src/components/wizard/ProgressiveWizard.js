import React, { Component } from 'react';
import Styles from '../common/Styles';
import classnames from 'classnames';

//https://www.codeply.com/go/tjC0LYqJHA/bootstrap-tab-wizard-with-progress-bar
class ProgresiveWizard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stepsActiveStatus: {
                "1" : true
            }
        }
    }

    onClickHandler(id) {
       let stepsActiveStatus = JSON.parse(JSON.stringify(this.state.stepsActiveStatus));

        Object.keys(stepsActiveStatus)
            .forEach(x => stepsActiveStatus[x] = false)

        stepsActiveStatus[id] = true;

        this.setState({stepsActiveStatus});
    }

    render() {
        const current = +(Object.keys(this.state.stepsActiveStatus)
            .filter(x => this.state.stepsActiveStatus[x] )[0]);

        return Styles.apply( ProgresiveWizard.name,
            `
                .progressive-wizard {
                    margin: 1%;
                }

                .progressive-wizard-step {
                    display: inline-block;
                    border-right: 10px solid #fff;
                    border-left: 10px solid #fff;
                    position: relative;
                    color: #777;
                }

                .progressive-wizard-inner {
                    list-style: none;
                    padding: 20px 0 0 0;
                    min-height: 50px;
                    text-align: justify;
                }

                .progressive-wizard-step-details {
                    font-size: 15px;
                    padding: 8px;
                    background: #eee;
                    border: 1px solid #eee;
                }

                /* --- Shapes  --- */

                .progressive-wizard-step-arrow {
                    position: absolute;
                    top: 0px;
                    right: -20px;
                    width: 0px;
                    height: 0px;
                    border-style: solid;
                    border-width: 20px 0 20px 20px;
                    border-color: transparent transparent transparent #eee;
                    z-index: 150;
                }

                .progressive-wizard-step-wedge {
                    position: absolute;
                    top: 0px;
                    left: -20px;
                    width: 0px;
                    height: 0px;
                    border-style: solid;
                    border-width: 20px 0 20px 20px;
                    border-color: #eee #eee #eee transparent;
                    z-index: 150;
                }

                /* --- Hover Wizard Step  --- */

                .progressive-wizard-step:not(.progressive-wizard-step--active):hover
                .progressive-wizard-step-details {
                    background: #aaa;
                    cursor: not-allowed;
                    color: #fff;
                    border: 1px solid #aaa;
                }

                .progressive-wizard-step:not(.progressive-wizard-step--active):hover
                .progressive-wizard-step-arrow {
                    border-color: transparent transparent transparent #aaa;
                }

                .progressive-wizard-step:not(.progressive-wizard-step--active):hover
                .progressive-wizard-step-wedge {
                    border-color: #aaa #aaa #aaa transparent;
                }

                /* --- Active Wizard Step  --- */

                .progressive-wizard-step--active {
                    color: #fff;
                }

                .progressive-wizard-step--active
                .progressive-wizard-step-details {
                    border: 1px solid #428bca;
                    background: #428bca;
                }

                .progressive-wizard-step--active
                .progressive-wizard-step-arrow {
                    border-color: transparent transparent transparent #428bca;
                }

                .progressive-wizard-step--active
                .progressive-wizard-step-wedge {
                    border-color: #428bca #428bca #428bca transparent;
                }

                /* --- First Wizard Step  --- */

                .progressive-wizard-step:first-child 
                .progressive-wizard-step-details {
                    border-radius: 5px 0 0 5px;
                }

                .progressive-wizard-step:first-child {
                    border-left: 0px;
                }

                .progressive-wizard-step:first-child .progressive-wizard-step-wedge {
                    display: none;
                }

                /* --- Last Wizard Step  --- */

                .progressive-wizard-step:last-child 
                .progressive-wizard-step-details {
                    border-radius: 0 5px 5px 0;
                }

                .progressive-wizard-step:last-child {
                    border-right: 0px;
                }

                .progressive-wizard-step:last-child
                .progressive-wizard-step-arrow {
                    display: none;
                }

                /* --- Responsive Media  --- */

                @media screen and (max-width: 768px) {
                    .progressive-wizard-step:not(.progressive-wizard-step--active)
                    .progressive-wizard-step-details-title {
                        display: none;
                    }
                }

            `,
            <div className="progressive-wizard">
                <h3 className="progressive-wizard-title">Title</h3>
                <hr />
                <div className="progressive-wizard-progress">
                    {ProgressBarTemplate(current, 3)}
                </div>
                <ul className="progressive-wizard-inner">
                    {ProgresiveWizardItemTemplate(1, 'Details', !!this.state.stepsActiveStatus[1], this.onClickHandler.bind(this, 1))}
                    {ProgresiveWizardItemTemplate(2, 'Shipping', !!this.state.stepsActiveStatus[2], this.onClickHandler.bind(this, 2))}
                    {ProgresiveWizardItemTemplate(3, 'Payment', !!this.state.stepsActiveStatus[3], this.onClickHandler.bind(this, 3))}
                </ul>
                <h3>1. Details</h3>
                <div className="card">
                    Content
                </div>
            </div>
        )
    }
}

const ProgresiveWizardItemTemplate = (id, title, isActive, onClickHandler) => (
    <li 
        className={classnames("progressive-wizard-step", {
            'progressive-wizard-step--active' : isActive
        })}
        onClick={onClickHandler}
    >
        <div className="progressive-wizard-step-details">
            <span className="progressive-wizard-step-details-id">{id}.</span>
            <span className="progressive-wizard-step-details-title">{title}</span> 
        </div>
        <div className="progressive-wizard-step-arrow"></div>
        <div className="progressive-wizard-step-wedge"></div>                        
    </li>
)

const ProgressBarTemplate = (current, count) => {
    const maxPercentage = 100;

    const step = Math.round(maxPercentage / count);

    const currentPercentage =  current * step;

    return (
        <div 
            className="progress-bar bg-success"
            role="progressbar"
            style={{width: `${currentPercentage}%` }} 
            aria-valuenow={currentPercentage} 
            aria-valuemin="0" 
            aria-valuemax={maxPercentage}
        >
            Step {current} of {count}
        </div>
    )
}

export default ProgresiveWizard;