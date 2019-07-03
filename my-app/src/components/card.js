import React from "react";
import { connect } from "react-redux";
import { Card, CardTitle, CardMedia } from "material-ui";
import { openMovieModal } from "../redux/actions/movieModal";
import placeholder from '../assets/images/placeholder.png'

const styles = {
  cardTitle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  cardMedia: {
    maxHeight: 394,
    overflow: "hidden"
  },
  card: {
    cursor: "pointer",
    height: 400,
    overflow: "hidden"
  },
  bgImage: {
    width: "100%"
  }
};

class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false
    };
  }

  loadDefaultImage = (e) => {
      e.target.onerror = null;
      e.target.src = placeholder;
  }

  render() {
    const { movie, openMovieModal } = this.props;

    return (
      <Card
        style={styles.card}
        onMouseOver={() => this.setState({ isMouseOver: true })}
        onMouseLeave={() => this.setState({ isMouseOver: false })}
        onClick={() => openMovieModal(movie.imdbID)}
      >
        {/* <CardTitle title={<div style={styles.cardTitle}>{movie.title}</div>} /> */}
        <CardMedia
          style={styles.cardMedia}
          overlay={<CardTitle title={movie.Title} subtitle={movie.Year} />}
        >
          <img
            style={styles.bgImage}
            src={movie.Poster}
            onError={this.loadDefaultImage}
          />
        </CardMedia>
      </Card>
    );
  }
}

export default connect(
  () => ({}),
  { openMovieModal }
)(CardComponent);
