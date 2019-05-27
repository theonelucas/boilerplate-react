import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DATA = gql`
{
  artworks {
    id
    artist {
      id
      name
    }
    category
    date
    href
    image {
      image_versions
      image_url
    }
    title
    displayLabel
    price
    is_for_sale
  }
}
`;

const styles = theme => ({
  card: {
    width: '230px',
    margin: '15px',
    display: 'inline-block',
    fontFamily: `adobe-garamond-pro, serif`
  },
  wrapper: {
    margin: '10px'
  },
  cardContent: {
    padding: '0 !important'
  },
  artTitle: {
    padding: '10px 10px 0 10px',
    fontFamily: 'inherit',
    height: '70px',
    fontSize: '20px'
  },
  artDate: {
    padding: '0 10px 10px 10px',
    fontFamily: 'inherit',
    height: '30px'
  },
  artPrice: {
    padding: '0 10px 10px 10px',
    fontFamily: 'inherit',
    fontSize: '22px'
  },
  artCover: {
    position: 'relative',
    bottom: '-6px'
  },
  cardHeader: {
    height: '130px'
  }
});

const Cinemas = (props) => {
  const { classes } = props;

  return (
    <Query query={GET_DATA}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <div className={classes.wrapper}>

            {data.artworks.map((artwork) =>
              <Card className={classes.card} key={artwork.id}>
                <CardContent className={classes.cardContent}>
                  <div className={classes.cardHeader}>
                    <Typography className={classes.artTitle}>{artwork.title}</Typography>
                    <Typography className={classes.artDate}>{artwork.date}</Typography>
                    <Typography className={classes.artPrice}>{artwork.price || 'No price'}</Typography>
                  </div>
                  <img
                    src={artwork.image.image_url.replace(':version', 'square')}
                    title={artwork.displayLabel}
                    className={classes.artCover}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )
      }}
    </Query>
  );
}

Cinemas.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmitUrl: PropTypes.func.isRequired,
  url: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired,
  urlShortened: PropTypes.shape({
    url: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  url: state.shortener.url,
  urlShortened: state.shortener.urlShortened,
  loading: state.shortener.loading
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitUrl: () => dispatch(shortenUrl()),
  onUrlChange: (newValue) => dispatch(urlFieldChanged(newValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cinemas));
