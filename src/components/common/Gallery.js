import React, { Component, PropTypes } from 'react'
import Lightbox from 'react-images'

class Gallery extends Component {
	constructor() {
		super()

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		}

		this.closeLightbox = this.closeLightbox.bind(this)
		this.gotoNext = this.gotoNext.bind(this)
		this.gotoPrevious = this.gotoPrevious.bind(this)
		this.handleClickImage = this.handleClickImage.bind(this)
		this.openLightbox = this.openLightbox.bind(this)
	}

	openLightbox(index, event) {
		event.preventDefault()
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		})
	}

	closeLightbox() {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		})
	}
	gotoPrevious() {
		this.setState({
			currentImage: this.state.currentImage - 1,
		})
	}

	gotoNext() {
		this.setState({
			currentImage: this.state.currentImage + 1,
		})
	}

	handleClickImage() {
		if (this.state.currentImage === this.props.images.length - 1) return
		this.gotoNext()
	}

	renderGallery() {
		if (!this.props.images) return
		const gallery = this.props.images.map((obj, i) => {
			return (
				<a
					href={obj.src}
					key={i}
					onClick={(e) => this.openLightbox(i, e)}
					style={styles.thumbnail}
					>
					<img
						height={styles.thumbnail.size}
						src={obj.thumbnail}
						style={styles.thumbnailImage}
						width={styles.thumbnail.size}
					/>
				</a>
			)
		})

		return (
			<div style={styles.gallery}>
				{gallery}
			</div>
		)
	}

  renderIcon() {
    return (
      <span className="gallery_icon" onClick={(e) => this.openLightbox(0, e)}></span>
    )
  }

	handleDownload() {
		window.open(this.props.images[this.state.currentImage].src)
	}

	render() {
		return (
			<div className="gallery">
				{this.props.heading && <h2>{this.props.heading}</h2>}
				{this.props.subheading && <p>{this.props.subheading}</p>}
        {this.props.isShowSmallImg ? this.renderGallery() : this.renderIcon()}
				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickPrev={this.gotoPrevious}
					onClickNext={this.gotoNext}
					onClickImage={this.handleClickImage}
					onClose={this.closeLightbox}
					imageCountSeparator={'/'}
					theme={this.props.theme}
				/>
			</div>
		)
	}
}

Gallery.displayName = 'Gallery'
Gallery.propTypes = {
	heading: PropTypes.string,
	subheading: PropTypes.string,
	images: PropTypes.array,
	isShowSmallImg: PropTypes.bool
}

const THUMBNAIL_SIZE = 72

const styles = {
	gallery: {
		marginLeft: -5,
		marginRight: -5,
		overflow: 'hidden'
	},
	thumbnail: {
		backgroundSize: 'cover',
		float: 'left',
		height: THUMBNAIL_SIZE,
		margin: 5,
		overflow: 'hidden',
		width: THUMBNAIL_SIZE
	},
	thumbnailImage: {
		display: 'block',
		height: '100%',
		maxWidth: '100%'
	}
}

export default Gallery
