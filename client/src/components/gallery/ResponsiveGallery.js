import React, { Component } from 'react'

class ResponsiveGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles
        }
    }

    render() {
        const images = [
            "http://via.placeholder.com/350x150",
            "http://via.placeholder.com/150x200",
            "http://via.placeholder.com/80x100",
            "http://via.placeholder.com/150x200",
            "http://via.placeholder.com/350x65"
        ]


        const columnCount = 4;
        const imagesByColumnCount = Math.floor(images.length / columnCount);

        const extraImages = images.length % columnCount;

        const columns = [];

        for (let index = 0; index < columnCount; index++) {
            let start = index * columnCount ;
            columns.push(images.slice(start, start + columnCount));
        }

        // Set Extra Columns

        return (
            <Media onResize={(width, height) => {
                let _styles = JSON.parse(JSON.stringify(this.state.styles));

                if (width <= 600) {
                    _styles.column.flex = '100%';
                    _styles.column.maxWidth = '100%';
                } else if (width <= 800) {
                    _styles.column.flex = '50%';
                    _styles.column.maxWidth = '50%';
                } else {
                    _styles = styles;
                }

                this.setState({ styles: _styles });
            }}>
                <div style={this.state.styles.row}>
                    <div style={this.state.styles.column}>
                        <img src="http://via.placeholder.com/350x150" alt="" style={this.state.styles.img} />

                        <img src="http://via.placeholder.com/150x200" alt="" style={this.state.styles.img} />
                    </div>
                    <div style={this.state.styles.column}>
                        <img src="http://via.placeholder.com/80x100" alt="" style={this.state.styles.img} />
                    </div>
                    <div style={this.state.styles.column}>
                        <img src="http://via.placeholder.com/150x200" alt="" style={this.state.styles.img} />
                    </div>
                    <div style={this.state.styles.column}>
                        <img src="http://via.placeholder.com/350x65" alt="" style={this.state.styles.img} />
                    </div>
                </div>
            </Media>
        )
    }
}

const styles = {
    row: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    column: {
        flex: '25%',
        maxWidth: '25%',
        padding: '0.1%'
    },
    img: {
        padding: '0.1%',
        width: '100%',
        verticalAlign: 'middle'
    }
}

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

export default ResponsiveGallery;
