import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                        <div key={i} style={this.state.styles.column}>
                            {x.map((y, k) => (
                                <img key={k} src={y} alt="" style={this.state.styles.img}
                                    onClick={() => this.props.onImageClick(y)} />
                            ))}
                        </div>
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
        padding: '0.1%'
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

ResponsiveGallery.defaultProps = {
    onImageClick: () => {}
}

ResponsiveGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onImageClick: PropTypes.func
}

export default ResponsiveGallery;
