import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckboxGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(data) {
        const { checked, title } = data;
        const { value } = this.state;

        const multiple = () => checked ?
            [{ title }, ...value] :
            value.filter(x => x.title === title);

        const single = () => [{ title }]

        this.setState({
            value: this.props.single ?
                single() :
                multiple()
        }, this.props.handler.bind(this, data))
    }

    render() {
        return (<React.Fragment>
            <div className="checkboxgroup-header">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className={this.props.icon} />
                        </span>
                    </div>
                    <div className="form-control form-control-lg"> {this.props.placeholder} </div>
                </div>
            </div>

            {this.props.info && <div className="checkboxgroup-info">
                <small className="form-text text-muted">{this.props.info}</small>
            </div>}

            <div className="checkboxgroup-body">
                {
                    this.props.options.map(x => <Checkbox
                        key={x.title}
                        title={x.title}
                        type={x.type}
                        name={this.props.name}
                        handler={this.changeHandler}
                        checked={this.state.value.some(y => y.title === x.title)}
                        editable={x.editable}
                        placeholder={x.placeholder}
                    />)
                }
            </div>
        </ React.Fragment>)
    }
}

const GUID_Generator = () => {
    const chr4 = () => Math.random().toString(16).slice(-4);

    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            option: ''
        }

        this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    checkboxChangeHandler(checked) {
        let data = {
            title: this.props.title,
            name: this.props.name,
            checked: checked
        };

        if (this.props.editable) {
            data = Object.assign(data, { option: this.state.option });
        }

        this.props.handler(data);
    }

    inputChangeHandler(ev) {
        this.setState({ option: ev.target.value },
            () => this.checkboxChangeHandler(true))
    }

    render() {
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

        if (!types.includes(this.props.type)) {
            throw new Error(`Invalid Checkbox Type - ${this.props.type}, Valid Options - ${types.join(',')}`);
        }

        const guid = GUID_Generator();
        const id = `checkbox-default-${this.props.type}-${guid}`;

        return <div className="input-group mb-3">
            <input
                type="checkbox"
                id={id}
                name={this.props.name}
                onChange={(ev) => this.checkboxChangeHandler(ev.target.checked)}
                checked={this.props.checked}
            />
            <div className="btn-group">
                <label htmlFor={id} className={`btn btn-${this.props.type}`}>
                    <span className="fas fa-check" />
                    <span className="placeholder" />
                </label>
                <label htmlFor={id} className="btn btn-default">
                    {this.props.editable ? (
                        <div className="checkbox-editable">
                            <input
                                type="text"
                                className="checkbox-editable-input"
                                placeholder={this.props.placeholder}
                                onChange={this.inputChangeHandler} />
                        </div>
                    ) : this.props.title}
                </label>
            </div>
        </div>
    }
}

CheckboxGroup.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,

        editable: PropTypes.bool,
        placeholder: PropTypes.string
    })).isRequired,
    name: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,

    value: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string
    })),
    info: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    single: PropTypes.bool
}

CheckboxGroup.defaultProps = {
    value: []
}

export default CheckboxGroup;