import React from 'react';
import {connect} from 'react-redux';
import { Dialog } from 'material-ui';
import _ from 'lodash';
import { closeMovieModal } from '../redux/actions/movieModal';
import { getMovieDetails } from '../redux/actions/movieBrowser';
import Loader from '../components/loader';

const styles = {
  // Can use functions to dynamically build our CSS
  dialogContent: (backgroundUrl) => ({
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
    minHeight: 400,
    color: 'white',
    padding: 10
  })
}

class MovieModal extends React.Component {
  // Triggered right after a property is changed
  componentWillReceiveProps(nextProps) {
    // If we will receive a new movieId
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.getMovieDetails(nextProps.movieId);
    }
  }

  render() {
    const {isOpen, closeMovieModal, isLoading} = this.props;
    const movie = this.props.movie ? this.props.movie : {};
    const loadingStatus = isLoading ? 'loading' : 'hide';
    const genres = (movie && movie.Genre) ? movie.Genre : '';
    
    return (
      <Dialog
        autoScrollBodyContent={true}
        title={null}
        modal={false}
        open={isOpen}
        onRequestClose={closeMovieModal}
      >
        <Loader isLoading={isLoading}>
          <div style={styles.dialogContent()}>
            <h1>{movie.Title}</h1>
            <h5>{genres}</h5>
            <p>{movie.Plot}</p>
            <p>Popularity: {movie.imdbRating}</p>
            <p>Language: {movie.Language}</p>
          </div>
        </Loader>
    </Dialog>
    );
  }
}
// "connect" our movie modal to the component store
export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    // Using lodash get, recursively check that a property is defined
    // before try to access it - if it is undefined, it will return your default value
    // _.get(object, 'path.to.targets[0].neat.stuff', defaultValue)
    isOpen: _.get(state, 'movieBrowser.movieModal.isOpen', false),
    movieId: _.get(state, 'movieBrowser.movieModal.movieId'),
    movie: _.get(state, 'movieBrowser.movieDetails.response', {}),
    isLoading: _.get(state, 'movieBrowser.movieDetails.isLoading', false),
  }),
  // Map an action to a prop, ready to be dispatched
  { closeMovieModal, getMovieDetails }
)(MovieModal);