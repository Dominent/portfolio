import React, { Component } from 'react';
import Stylez from '../common/Stylez';

//https://www.codeply.com/go/tjC0LYqJHA/bootstrap-tab-wizard-with-progress-bar
class ProgresiveWizard extends Component {
    render() {
        return <div>
            {
                Stylez.apply( ProgresiveWizard.name,
                    `
                        .progressive-wizard {
                            border: 30px solid #ccc;
                        }
                    `, 
                    <div className="progressive-wizard">
                        <p className="colorh"> Test </p>
                    </div>
                )
            }
            {
                Stylez.apply( ProgresiveWizard.name,
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

            
            
        </div> 
    }
}

export default ProgresiveWizard;