import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import Overlay from '../common/Overlay';

function chunck(items, pieces) {
    if (!(items instanceof Array)) {
        return [];
    }

    let result = [];

    let piecesLength = Math.floor(items.length / pieces);

    for (let i = 0; i < pieces; i++) {
        let start = piecesLength * i;
        let end = start + piecesLength;
        const elements = items.slice(start, end);

        result.push(elements);
    }

    for (let i = (piecesLength * pieces), j = 0; i < items.length; i++ , j++) {
        result[j].push(items[i])
    }

    return result;
}

function exclude(object, properties) {
    let _object = Object.assign({}, object);

    properties.forEach(p => delete _object[p]);

    return _object;
}

class ResponsiveGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles(props.columns || 4)
        }
    }

    render() {
        const columns = this.props.columns || 4;
        const images = chunck(this.props.images, columns);

        return (
            <Media onResize={(width, height) => {
                let _styles = JSON.parse(JSON.stringify(this.state.styles));

                if (width <= 600) {
                    _styles.column.flex = `${(100 / columns) * 4}%`;
                    _styles.column.maxWidth = `${(100 / columns) * 4}%`;
                } else if (width <= 800) {
                    _styles.column.flex = `${(100 / columns) * 2}%`;
                    _styles.column.maxWidth = `${(100 / columns) * 2}%`;
                } else {
                    _styles = styles(columns);
                }

                this.setState({ styles: _styles });
            }}>
                <div style={this.state.styles.row}>
                    {images.map((x, i) => (
                        <div key={i} style={this.state.styles.column} >
                            {x.map((src, index) => (
                                <Card key={index}
                                    img={{ src, style: this.state.styles.img }}
                                    style={{ position: 'relative' }}
                                    onClick={(src) => { this.props.onClick && this.props.onClick(src) }} />
                            ))}
                        </div >
                    ))}
                </div>
            </Media>
        )
    }


}

const styles = (columns) => ({
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    column: {
        flex: `${100 / columns}%`,
        maxWidth: `${100 / columns}%`,
        padding: '0.1%',
        height: '100%'
    },
    img: {
        padding: '0.1%',
        width: '100%',
        verticalAlign: 'middle'
    }
})

class Media extends Component {
    updateDimensions() {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        this.props.onResize(width, height);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        return (<React.Fragment>
            {this.props.children}
        </React.Fragment>)
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        };
    }

    render() {
        const props = exclude(this.props, [
            'children',
            'onMouseEnter',
            'onMouseLeave',
            'onClick',
            'img'
        ]);

        const { src, style } = this.props.img;

        return (
            <div {...props}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                {this.state.isHovered ? animations.hover((
                    <React.Fragment>
                        <h3> Some example header </h3>
                        <span> Some example description </span>
                    </React.Fragment>
                ), () => { this.props.onClick && this.props.onClick(src) }) : null}

                <img
                    src={src}
                    style={style}
                />
            </div>
        )
    }
}

const animations = {
    hover: (content, onClick) => (
        <Motion defaultStyle={{
            opacity: 0,
            x: 0
        }} style={{
            opacity: spring(0.5),
            x: spring(30)
        }}>
            {(style) => (
                <React.Fragment>
                    <div
                        style={{
                            display: style.display,
                            background: 'none',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            textAlign: 'center',
                            paddingTop: `${style.x}%`
                        }}
                        onClick={onClick}
                    >
                        {content}
                    </div>

                    <Overlay
                        style={{ opacity: style.opacity }}
                    />
                </React.Fragment>
            )}
        </Motion>
    )
}

ResponsiveGallery.defaultProps = {
    onImageClick: () => { }
}

ResponsiveGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onImageClick: PropTypes.func
}

export default ResponsiveGallery;


