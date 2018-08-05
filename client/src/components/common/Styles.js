import React, { Component } from 'react'

function buildStyleIdFromComponentName (componentName) {
    return `style-${componentName.toLowerCase()}`;
}

class Styles extends Component {
    createStyleElement = (css, id) => {
        return <style id={id ? id: null} type="text/css" ref={(style) => this._style = style}
            dangerouslySetInnerHTML={{  __html: css || ''  }} />
    }

    mergeStyleElements = (id) => {
        let allStyles =  [...document.querySelectorAll(`#style-${id}`)];

        let ownStyle = allStyles
            .filter(x => !x.isEqualNode(this._style))[0];

        if(!ownStyle) {
            return;
        }

        let otherStyles = allStyles
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

    componentDidMount() {
        const { componentName } = this.props;

        const id =  buildStyleIdFromComponentName(componentName)

        this.mergeStyleElements(id);
    }

    render() {
        const { children, css, componentName } = this.props;

        const id =  buildStyleIdFromComponentName(componentName)

        return (<React.Fragment >
            {  this.createStyleElement(css, id)  }
            {children}
        </React.Fragment>)
    }
}

export default {
    apply: (componentName, css, children) => {
        return <Styles {...{ css, componentName } }>{children}</Styles> 
    }
};

