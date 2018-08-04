import React, { Component } from 'react';
import Styles from '../common/Styles';

//https://www.codeply.com/go/tjC0LYqJHA/bootstrap-tab-wizard-with-progress-bar
class ProgresiveWizard extends Component {
    render() {
        return Styles.apply( ProgresiveWizard.name,
            `
                .colorh {
                    color: #d9d9d9;
                    font-size: 50px;
                }
            `, 
            <div className="progressive-wizard">
                <p className="colorh"> Test </p>
            </div>
        )
    }
}

export default ProgresiveWizard;