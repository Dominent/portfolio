import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import Overlay from '../common/Overlay';
import Media from '../common/Media';

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
               {() =>  (<div style={this.state.styles.row}>
                    {images.map((x, i) => (
                        <div key={i} style={this.state.styles.column} >
                            {x.map((c, index) => (
                                <Card key={index}
                                    hover={{
                                        header: c.header,
                                        description: c.description
                                    }}
                                    img={{ src: c.src, style: this.state.styles.img }}
                                    style={{ position: 'relative' }}
                                    onClick={(src) => { this.props.onClick && this.props.onClick(src) }} />
                            ))}
                        </div >
                    ))}
                </div>)}
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
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: '100%',
                        height: '30%',
                        margin: 'auto'
                    }}>
                        <h3> {this.props.hover.header} </h3>
                        <span> {this.props.hover.description} </span>
                    </div>
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
            scale: 0
        }} style={{
            opacity: spring(0.5),
            scale: spring(1, { stiffness: 140, damping: 10 })
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
                            transform: `scale3d(${style.scale}, ${style.scale}, ${style.scale})`
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


