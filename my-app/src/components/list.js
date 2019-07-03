import React from "react";
import { Row, Col } from "react-bootstrap";
import CardComponent from "./card";
import LoaderComponent from "./loader";

const styles = {
  movieColumn: {
    marginBottom: 20
  }
};

const filterMovies = (movies, filterOn) => {
  if (filterOn === 1) {
    return movies;
  }
  if (filterOn === 2) {
    return movies.filter(movie => movie.Type === "movie");
  }
  if (filterOn === 3) {
    return movies.filter(movie => movie.Type === "episode");
  }
};

const sortMovies = (movies, sortOrder) => {
  if (sortOrder === 1) {
    return movies.sort((a, b) => a.Year - b.Year)
  }
  
  if (sortOrder === 2) {
    return movies.sort((a, b) => b.Year - a.Year)
  }
  return movies;
};
const ListComponent = ({ movies, isLoading, filterOn, sortOrder }) => {
  let movieColumns;
  if (movies) {
    const filteredMovies = filterMovies(movies.Search, filterOn);
    const sortedMovies = sortMovies(filteredMovies, sortOrder);
    movieColumns = sortedMovies.map(movie => (
      <Col
        style={styles.movieColumn}
        key={movie.imdbID}
        xs={12}
        sm={4}
        md={3}
        lg={3}
      >
        <CardComponent movie={movie} />
      </Col>
    ));
  } else {
    movieColumns = null;
  }

  return (
    <Row>
      {movieColumns}
      <LoaderComponent isLoading={isLoading} />
    </Row>
  );
};

export default ListComponent;
