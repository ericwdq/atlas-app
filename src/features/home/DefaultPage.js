import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import {
  Layout,
  Breadcrumb,
  Spin,
  Alert,
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  Tabs,
} from 'antd';
import InteractiveChart from './InteractiveChart';
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY-MM-DD';
const startDate = '2011-01-01';
const endDate = '2017-03-31';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    initializing: true,
    forecasting: false,
    startDate: startDate,
    endDate: endDate,
    timeSpan: null,
    strategy: null,
    dataRangeType: 'all',
  };

  componentWillMount() {
    this.props.actions
      .fetchPurchasePriceList()
      .then(() => {
        this.setState({
          initializing: false,
        });
      })
      .catch(() => {
        this.setState({
          initializing: false,
        });
      });
  }

  handleDateChange = (date, dateString) => {
    // console.log(date, dateString);
    this.props.actions.cleanForecastData();
    if (dateString[0] !== '') {
      this.setState({
        startDate: dateString[0],
        endDate: dateString[1],
      });
      this.setState({
        dataRangeType: 'custom',
      });
    } else {
      this.setState({
        startDate,
        endDate,
        dataRangeType: 'all',
      });
    }
  };

  disabledDate = current => {
    // Can not select days before today and today
    return (
      current &&
      (current.toDate() < moment(startDate, dateFormat).toDate() ||
        current.toDate() > moment(endDate, dateFormat).toDate())
    );
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      forecasting: true,
    });
    this.props.actions
      .fetchForecastPriceList(
        {},
        this.state.timeSpan,
        this.state.strategy,
        this.state.startDate,
        this.state.endDate,
      )
      .then(() => {
        this.setState({
          forecasting: false,
        });
      })
      .catch(() => {
        this.setState({
          forecasting: false,
        });
      });
  };

  handleDateLink = evt => {
    // console.log(evt.target);
    const className = evt.target.className;
    if (className === this.state.dataRangeType) {
      evt.preventDefault();
      return false;
    }

    this.props.actions.cleanForecastData();
    if (className.includes('all')) {
      this.setState({
        startDate,
        endDate,
        dataRangeType: 'all',
      });
    } else if (className.includes('year')) {
      this.setState({
        startDate: '2016-03-31',
        endDate: '2017-03-31',
        dataRangeType: 'year',
      });
    }
  };

  renderInitializing() {
    return (
      <div className="home-default-page">
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="app-title">
              <h2>Atlas POC</h2>
            </div>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0', textAlign: 'left' }}>
              <Breadcrumb.Item>Hackathon</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="app-conent"
              style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 188px)' }}
            >
              <Spin />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Atlas team @The B1 Dev China Hackathon </Footer>
        </Layout>
      </div>
    );
  }

  renderError(err) {
    return (
      <Alert
        message={
          typeof err === 'string'
            ? err
            : 'Fetch data failed, please check your network or try again later.'
        }
        type="error"
        closable
        showIcon
        onClose={this.dismissFetchListError}
      />
    );
  }

  render() {
    const {
      fetchPurchasePriceListPending,
      fetchPurchasePriceListError,
      purchasePriceList,
      fetchForecastPriceListError,
      forecastPriceList,
    } = this.props.home;

    if (fetchPurchasePriceListPending || this.state.initializing) {
      return this.renderInitializing();
    }

    return (
      <div className="home-default-page">
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="app-title">
              <h2>Atlas POC</h2>
            </div>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0', textAlign: 'left' }}>
              <Breadcrumb.Item>Hackathon</Breadcrumb.Item>
              <Breadcrumb.Item>Atlas App</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="app-content"
              style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 188px)' }}
            >
              <fieldset>
                <legend>Configuration</legend>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <FormItem label="Purchase Time Span:">
                        <Select defaultValue="7" onChange={() => {}}>
                          <Option value="7">7 Days</Option>
                          <Option value="15">15 Days</Option>
                          <Option value="30">1 Month</Option>
                          <Option value="c">Customize</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem label="Purchase Strategy:">
                        <Select defaultValue="op1" onChange={() => {}}>
                          <Option value="op1">Option 1</Option>
                          <Option value="op2">Option 2</Option>
                          <Option value="disabled" disabled>
                            Option 3
                          </Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={this.state.forecasting}
                      >
                        {this.state.forecasting ? 'Forecast...' : 'Forecast'}
                      </Button>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={16}>
                      <FormItem label="Past Data Range:">
                        <RangePicker
                          onChange={this.handleDateChange}
                          defaultValue={[
                            moment(startDate, dateFormat),
                            moment(endDate, dateFormat),
                          ]}
                          value={[
                            moment(this.state.startDate, dateFormat),
                            moment(this.state.endDate, dateFormat),
                          ]}
                          format={dateFormat}
                          disabledDate={this.disabledDate}
                          dateRender={current => {
                            const style = {};
                            console.log();
                            // console.log(moment(, dateFormat).toDate());
                            if (
                              current.format(dateFormat) === startDate ||
                              current.format(dateFormat) === endDate
                            ) {
                              style.border = '1px solid #1890ff';
                              style.borderRadius = '50%';
                            }
                            return (
                              <div className="ant-calendar-date" style={style}>
                                {current.date()}
                              </div>
                            );
                          }}
                        />
                        <span className="date-links">
                          <a
                            className={
                              this.state.dataRangeType === 'all' ? 'all link active' : 'all link'
                            }
                            onClick={this.handleDateLink}
                          >
                            All Past
                          </a>
                          <a
                            className={
                              this.state.dataRangeType === 'year' ? 'year link active' : 'year link'
                            }
                            onClick={this.handleDateLink}
                          >
                            Last Year
                          </a>
                        </span>
                      </FormItem>
                    </Col>
                  </Row>

                  <Row className="form-bottom-buttons-container">
                    <Col span="24" style={{ textAlign: 'right' }} />
                  </Row>
                </Form>
              </fieldset>
              <fieldset style={{ margin: '10px 0 0 0' }}>
                <legend>Intelligent Forecast</legend>
                <Tabs defaultActiveKey="price">
                  <TabPane tab="Purchase Price Forecast" key="price">
                    <div className="chart-container">
                      {fetchPurchasePriceListError && this.renderError(fetchPurchasePriceListError)}
                      {fetchForecastPriceListError && this.renderError(fetchForecastPriceListError)}
                      <div className="chart-legend">
                        <span className="line past" />
                        <label>Past Data</label>
                        <span className="line forecast" />
                        <label>Forecast Data</label>
                      </div>
                      <InteractiveChart
                        id="price-chart"
                        data={purchasePriceList}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        forecastedData={forecastPriceList}
                        forecasting={this.state.forecasting}
                      />
                      {this.state.forecasting && <Spin />}
                    </div>
                  </TabPane>
                  <TabPane tab="Sales Quantity Forecast" key="quantity">
                    <div className="chart-container">
                      {fetchPurchasePriceListError && this.renderError(fetchPurchasePriceListError)}
                      {fetchForecastPriceListError && this.renderError(fetchForecastPriceListError)}
                      <div className="chart-legend">
                        <span className="line past" />
                        <label>Past Data</label>
                        <span className="line forecast" />
                        <label>Forecast Data</label>
                      </div>
                      <InteractiveChart
                        id="quantity-chart"
                        data={purchasePriceList}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        forecastedData={forecastPriceList}
                        forecasting={this.state.forecasting}
                      />
                      {this.state.forecasting && <Spin />}
                    </div>
                  </TabPane>
                  <TabPane tab="Purchase Decisions Recommendation" key="planning">
                    Recommendation content
                  </TabPane>
                </Tabs>
              </fieldset>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Atlas team #B1 Hackathon 2018# </Footer>
        </Layout>
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
)(DefaultPage);
