import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class CounterPage extends Component {
  static propTypes = {
    demo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="demo-counter-page">
        <button onClick={this.props.actions.counterMinusOne}>-</button>
        &nbsp;{this.props.demo.count}&nbsp;
        <button onClick={this.props.actions.counterPlusOne}>+</button>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    demo: state.demo,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPage);
