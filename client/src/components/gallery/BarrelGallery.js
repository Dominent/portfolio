import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

class BarrelGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      images: props.images || []
    };

    this.onImageClickHandler = this.onImageClickHandler.bind(this);

    this.onNextClickHandler = this.onNextClickHandler.bind(this);
    this.onPrevClickHandler = this.onPrevClickHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.images && this.setState({ images: nextProps.images });
}

  onNextClickHandler(e) {
    e.stopPropagation();

    this.setState({
      selected: (this.state.selected + 1) % this.state.images.length
    }, () => this.props.onSelectedImageChange &&
      this.props.onSelectedImageChange(this.state.selected));
  }

  onPrevClickHandler(e) {
    e.stopPropagation();

    this.setState({
      selected: (this.state.selected + (this.state.images.length - 1)) % this.state.images.length
    }, () => this.props.onSelectedImageChange &&
      this.props.onSelectedImageChange(this.state.selected));
  }

  onImageClickHandler(ev, selected) {
    ev.stopPropagation();

    this.setState({ selected },
      () => this.props.onSelectedImageChange &&
        this.props.onSelectedImageChange(this.state.selected));
  }

  render() {
    const arrow = {
      fontSize: '80px',
      paddingTop: '15%'
    }

    const css = (scaleFactor, opacity, shadow) => ({
      height: '80%',
      border: '1px solid #000',
      transform: `scale(${scaleFactor})`,
      opacity: opacity,
      borderRadius: '2px',
      boxShadow: `${shadow}px 0px 10px 1px #aaaaaa`
    })

    return (
      <div className="barrel-gallery">
        <div className="row justify-content-center">
            <i className="fa fa-angle-left mr-3"
              style={arrow}
              onClick={this.onPrevClickHandler}
            ></i>

            {this.state.images && this.state.images.map((x, index) => (
              <Motion key={index}
                defaultStyle={{
                  scaleFactor: 1.2,
                  opacity: 1,
                  shadow: -15
                }}
                style={
                  index === this.state.selected ? {
                    scaleFactor: spring(1.2),
                    opacity: spring(1),
                    shadow: spring(-15)
                  } : {
                      scaleFactor: spring(1),
                      opacity: spring(0.7),
                      shadow: spring(-8)
                    }
                }>
                {(style) => (
                  <div className="col-md-3">
                    <img
                      src={x.src}
                      alt={x.alt}
                      style={css(style.scaleFactor, style.opacity, style.shadow)}
                      onClick={(ev) => this.onImageClickHandler(ev, index)}
                    >
                    </img>
                  </div>
                )}
              </Motion>
            ))}

            <i className="fa fa-angle-right ml-3"
              style={arrow}
              onClick={this.onNextClickHandler}
            ></i>
          </div>
      </div>
    )
  }
}

export default BarrelGallery;
