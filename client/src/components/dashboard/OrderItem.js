import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/course";
import { approveOrder } from "../../actions/order";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const leverageStyles = makeStyles({
  gridItem: {
    "& a": { textDecoration: "none" }
  },
  approveButton: {
    margin: "0 1rem"
  }
});

const OrderItem = ({
  order: { course, date, approved, user, _id },
  isAdmin,
  approveOrder
}) => {
  const classes = leverageStyles();
  return (
    <Grid item className={classes.gridItem}>
      <Card variant="outlined">
        <CardActionArea href={course.url}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {course.name}
            </Typography>
            <Typography variant="subtitle1">
              Provider: {course.provider}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Price: {course.price}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Applied on <Moment format="DD/MM/YYYY">{date}</Moment>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          {isAdmin && (
            <Typography variant="subtitle1" paragraph color="textSecondary">
              Applied by: {user.name}
            </Typography>
          )}
          {approved ? (
            <Chip color="primary" label="Approved" />
          ) : (
            <Chip label="Pending" />
          )}
          {isAdmin && !approved && (
            <Button
              variant="outlined"
              color="primary"
              className={classes.approveButton}
              onClick={() => approveOrder(_id)}
            >
              Approve
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

OrderItem.defaultProps = {
  showActions: true
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  approveOrder: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, approveOrder })(
  OrderItem
);
