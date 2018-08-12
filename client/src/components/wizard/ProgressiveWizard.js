import React, { Component } from 'react';
import Styles from '../common/Styles';
import classnames from 'classnames';
import Icon from '../common/Icon';

class ProgresiveWizard extends Component {
    constructor(props) {
        super(props);

        this.steps = props.steps
            .map((x, i) => Object.assign(x, { id: i + 1 }));

        let stepsActiveStatus = {};

        this.steps.map(x => x.id)
            .forEach(x => stepsActiveStatus[x] = false)

        stepsActiveStatus[1] = true;

        this.state = { stepsActiveStatus };
    }

    onClickHandler(id) {
        let stepsActiveStatus = JSON.parse(JSON.stringify(this.state.stepsActiveStatus));

        Object.keys(stepsActiveStatus)
            .forEach(x => stepsActiveStatus[x] = false)

        stepsActiveStatus[id] = true;

        this.setState({ stepsActiveStatus });
    }

    render() {
        const currentStepId = +(Object.keys(this.state.stepsActiveStatus)
            .filter(x => this.state.stepsActiveStatus[x])[0]);

        const currentStepIndex = this.steps
            .findIndex(x => x.id === currentStepId);

        if (currentStepIndex === -1) {
            throw 'Cannot find current step!';
        }

        const currentStep = this.steps[currentStepIndex];

        return Styles.apply(ProgresiveWizard.name,
            `
                .progressive-wizard {
                    margin: 1%;
                    color: #000;
                    text-align: justify;
                    font-size: 15px;
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
                }

                .progressive-wizard-step-details {
                    font-size: 15px;
                    padding: 8px;
                    background: #eee;
                    border: 1px solid #eee;
                }

                .progressive-wizard-footer {
                    margin-top: 2%
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
                <div className="progressive-wizard-progress">
                    {ProgressBarTemplate(currentStep.id, this.steps.length)}
                </div>
                <ul className="progressive-wizard-inner">
                    {
                        this.steps.map(x => ProgresiveWizardItemTemplate(
                            x.id,
                            x.title,
                            this.state.stepsActiveStatus[x.id],
                            this.onClickHandler.bind(this, x.id)))
                    }
                </ul>
                <h3>{currentStep.id}. {currentStep.title}</h3>
                <div className="progressive-wizard-content">
                    {currentStep.content}
                </div>
                <div className="progressive-wizard-footer">
                    {
                        ProgressiveWizardFooterTemplate(
                            () => this.onClickHandler(currentStep.id + 1),
                            () => this.onClickHandler(currentStep.id - 1),
                            this.props.finishClickHandler,
                            (currentStep.id + 1 === this.steps.length))
                    }
                </div>
            </div>
        )
    }
}

const ProgresiveWizardItemTemplate = (id, title, isActive, onClickHandler) => (
    <li
        key={id}
        className={classnames("progressive-wizard-step", {
            'progressive-wizard-step--active': isActive
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

    const currentPercentage = current * step;

    return (
        <div className="progress" style={{ height: '1.3rem' }}>
            <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${currentPercentage}%` }}
                aria-valuenow={currentPercentage}
                aria-valuemin="0"
                aria-valuemax={maxPercentage}
            >
                Step {current} of {count}
            </div>
        </div>
    )
}

const ProgressiveWizardFooterTemplate = (nextClickHandler, prevClickHandler, finishClickHandler, isFinish = false) => (
    <React.Fragment>
        <button className="btn btn-lg btn-primary mr-2" onClick={prevClickHandler}>
            <Icon fas="chevron-left" style={{
                marginRight: '10px'
            }} />
            <span>Prev</span>
        </button>
        <button className={classnames('btn btn-lg', {
            'btn-success': !isFinish,
            'btn-warning': isFinish
        })} onClick={isFinish ? finishClickHandler : nextClickHandler}>
            <span>{isFinish ? 'Finish' : 'Next'}</span>
            <Icon fas="chevron-right" style={{
                marginLeft: '10px'
            }} />
        </button>
    </React.Fragment>
)


export default ProgresiveWizard;