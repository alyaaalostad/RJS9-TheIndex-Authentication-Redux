import * as actionCreators from "./redux/actions";
import React from "react";
import { connect } from "react-redux";
const Logout = props => {
  return (
    <button className="btn btn-danger" onClick={() => this.props.logout()}>
      Logout {props.user.username}
    </button>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout())
  };
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
