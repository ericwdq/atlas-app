import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as d3 from 'd3';

export class InteractiveChart extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    forecastedData: PropTypes.array,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  };

  state = {
    adjustPoint: [],
  };

  componentWillMount() {
    console.log('Chart mount');
    d3.select('#price-chart')
      .style('color', 'red')
      .html('Chart will mount');
  }

  componentDidMount() {
    console.log('Chart did mount');
    d3.select('#price-chart')
      .style('color', 'red')
      .html('Chart did mount');
  }

  drawChart = data => {
    console.log(data);
  };

  render() {
    const { data = [], forecastedData, startDate, endDate } = this.props;
    console.log(this.props);
    return (
      <div className="line-chart" id="price-chart">
        chart content
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InteractiveChart);
