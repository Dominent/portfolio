import React, { Component } from 'react';
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

        const index = this.steps.findIndex(x => x.id === currentStepId);

        if (index === -1) {
            throw new Error('Cannot find current step!');
        }

        const currentStep = this.steps[index];

        return (<div className="progressive-wizard">
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
                {
                    this.steps.map((x, i) => <div key={i} className={classnames({
                        "display-none": i !== index
                    })}>{x.content}</div>)
                }
            </div>
            <div className="progressive-wizard-footer">
                {
                    ProgressiveWizardFooterTemplate(
                        () => this.onClickHandler(currentStep.id + 1),
                        () => this.onClickHandler(currentStep.id - 1),
                        this.props.finishClickHandler,
                        (currentStep.id === this.steps.length))
                }
            </div>
        </div>)
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