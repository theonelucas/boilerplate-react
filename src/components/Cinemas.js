import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Artworks from './query.gql';

const styles = () => ({
  artCover: {
    bottom: '-6px',
    position: 'relative'
  },
  artDate: {
    fontFamily: 'inherit',
    height: '30px',
    padding: '0 10px 10px 10px'
  },
  artPrice: {
    fontFamily: 'inherit',
    fontSize: '22px',
    padding: '0 10px 10px 10px'
  },
  artTitle: {
    fontFamily: 'inherit',
    fontSize: '20px',
    height: '70px',
    padding: '10px 10px 0 10px'
  },
  card: {
    display: 'inline-block',
    fontFamily: 'adobe-garamond-pro, serif',
    margin: '15px',
    width: '230px'
  },
  cardContent: {
    padding: '0 !important'
  },
  cardHeader: {
    height: '130px'
  },
  wrapper: {
    margin: '10px'
  }
});

const Cinemas = (props) => {
  const { classes } = props;

  return (
    <Query query={Artworks}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <div className={classes.wrapper}>

            {data.filter_artworks.hits.map(artwork => (
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
                    alt={artwork.displayLabel}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

Cinemas.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  url: PropTypes.shape({
    error: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  urlShortened: PropTypes.shape({
    short: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  loading: state.shortener.loading,
  url: state.shortener.url,
  urlShortened: state.shortener.urlShortened
});

const mapDispatchToProps = () => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cinemas));
