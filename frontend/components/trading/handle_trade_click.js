import React from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = (state) => {
// }

// const mapDispatchToProps = (dispatch) => {
// }

// connect(mapStateToProps, null)()
// class 

function handleTradeClick(props) {
  debugger

  // If user is NOT logged in, redirect to Sign Up Page
  let reduxState = getState();
  if (reduxState.session.id === null) {
    
  }
  
}

export default handleTradeClick;

