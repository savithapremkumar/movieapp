import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { AppBar } from "material-ui";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import * as movieActions from "../redux/actions/movieBrowser";
import MovieList from "../components/list";
import * as scrollHelper from "../helpers/scrollCalculation";
import MovieModal from "./movieModal";

const styles = {
  grid: {
    marginLeft: 30,
    marginRight: 30
  }
};

class MovieBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      query: "star",
      filterType: 1,
      sortOrder: 1
    };
  }
  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.searchMovies(this.state.query, this.state.currentPage);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { movieSearch } = this.props;
    if (!movieSearch.isLoading) {
      let percentageScrolled = scrollHelper.getPercentageScrolledDown(window);
      if (percentageScrolled > 0.8) {
        const nextPage = this.state.currentPage + 1;
        this.props.searchMovies(this.state.query, nextPage);
        this.setState({ currentPage: nextPage });
      }
    }
  };

  handleFilterChange = (event, index, value) => {
    this.setState(prevState => ({
      ...prevState,
      filterType: value
    }));
  };

  handleSortChange = (event, index, value) => {
    this.setState(prevState => ({
      ...prevState,
      sortOrder: value
    }));
  };

  render() {
    const { movieSearch } = this.props;

    return (
      <div>
        <AppBar title="Movie Browser" />
        <div style={styles.grid}>
          <Grid fluid={true}>
            <Row>
              <Col xs={12} sm={6} md={3}>
                <SelectField
                  floatingLabelText="Filter by type"
                  value={this.state.filterType}
                  onChange={this.handleFilterChange}
                >
                  <MenuItem value={1} primaryText="All" />
                  <MenuItem value={2} primaryText="Movie" />
                  <MenuItem value={3} primaryText="Episode" />
                </SelectField>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <SelectField
                  floatingLabelText="Sort by year"
                  value={this.state.sortOrder}
                  onChange={this.handleSortChange}
                >
                  <MenuItem value={1} primaryText="Ascending" />
                  <MenuItem value={2} primaryText="Descending" />
                </SelectField>
              </Col>
            </Row>
            <Row>
              <MovieList
                movies={movieSearch.response}
                isLoading={movieSearch.isLoading}
                filterOn={this.state.filterType}
                sortOrder={this.state.sortOrder}
              />
            </Row>
          </Grid>
        </div>

        <MovieModal />
      </div>
    );
  }
}

export default connect(
  // Map nodes in our state to a properties of our component
  state => ({
    movieSearch: state.movieBrowser.movieSearch
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);
