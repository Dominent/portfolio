import React, { Component } from 'react';
import Overlay from './Overlay';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: !!props.isOpen
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isOpen } = nextProps;
        if (isOpen !== undefined) {
            this.setState({ isOpen });
        }
    }

    render() {
        const { isOpen } = this.state;

        const overlay = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }

        // if(isOpen) {
        //     document.body.classList
        //         .add('disable-scroll');
        // } else {
        //     document.body.classList
        //         .remove('disable-scroll');
        // }

        return (
            <React.Fragment>
                {isOpen ? (
                    <React.Fragment>
                        <Overlay style={overlay} onTop />
                        <Motion
                            defaultStyle={{
                                y: isOpen ? 0 : 100,
                                opacity: isOpen ? 0 : 1
                            }}
                            style={{
                                y: spring(isOpen ? 100 : 0),
                                opacity: spring(isOpen ? 1 : 0)
                            }}
                        >
                            {(style) => (
                                <div className="modal" style={{
                                    display: 'block',
                                    transform: `translateY(${style.y}px)`,
                                    opacity: style.opacity,
                                    color: '#000'
                                }}>
                                    <div className="modal-dialog" style={this.props.style}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                {this.props.header}
                                            </div>
                                            <div className="modal-body">
                                                {this.props.body}
                                            </div>
                                            <div className="modal-footer">
                                                {this.props.footer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Motion>
                    </React.Fragment>
                ) : (null)}
            </React.Fragment>
        )
    }
}

Modal.defaultProps = {
    isOpen: false
}

Modal.propTypes = {
    header: PropTypes.object.isRequired,
    body: PropTypes.object.isRequired,
    footer: PropTypes.object.isRequired,
    isOpen: PropTypes.bool
}

export default Modal;
