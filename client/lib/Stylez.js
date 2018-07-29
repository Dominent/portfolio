import React, { Component } from 'react'

class Stylez extends Component {
    createStyleElement = (css) => {
        return <style type="text/css" ref={(c) => (this._style = c)}
            dangerouslySetInnerHTML={{  __html: css || ''  }} />
    }

    render() {
        const { children, css } = this.props;

        return (<React.Fragment >

        </React.Fragment>)
    }
}

export default Stylez;

