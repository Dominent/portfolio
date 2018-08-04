import React, { Component } from 'react'

class Styles extends Component {
    createStyleElement = (css, component) => {
        return <style id={component ? component : null} type="text/css" ref={(style) => this._style = style}
            dangerouslySetInnerHTML={{  __html: css || ''  }} />
    }

    componentDidMount() {
        const { component } = this.props;

        let ownStyle = [...document.querySelectorAll(`#${component}`)]
            .filter(x => !x.isEqualNode(this._style))[0];

        if(!ownStyle) {
            return;
        }

        let otherStyles = [...document.querySelectorAll(`#${component}`)]
            .filter(x => x.isEqualNode(this._style));

        if(!otherStyles.length) {
            return;
        }
        
        let css = otherStyles
            .map(x => x.innerHTML)
            .join('\n');

        ownStyle.innerHTML += css;

        otherStyles.forEach(el => el.remove());
    }

    render() {
        const { children, css, component } = this.props;

        return (<React.Fragment >
            {  this.createStyleElement(css, component)  }
            {children}
        </React.Fragment>)
    }
}

export default {
    apply: (component, css, children) => {
        return <Styles css={css} component={component}>{children}</Styles> 
    }
};

