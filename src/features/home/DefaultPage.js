import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import { Layout, Breadcrumb, Spin, Alert, Form, Row, Col, Button, Select } from 'antd';
import * as d3Selection from 'd3-selection';
// import PriceChart from './PriceChart';
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    initializing: true,
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

  handleD3Click = () => {
    d3Selection.select('.app-title').html('changed from d3');
  };

  handleSubmit = evt => {
    console.log(evt);
    evt.preventDefault();
    d3Selection.select('.app-title').html('changed from d3');
  };

  drawChart = data => {
    console.log(data);
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
            <div className="app-conent" style={{ background: '#fff', padding: 24, minHeight: 600 }}>
              <Spin />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Atlas team @B1 Hackathon 2018 </Footer>
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
    } = this.props.home;
    // const formItemLayout = {
    //   labelCol: { span: 6 },
    //   wrapperCol: { span: 14 },
    // };

    console.log(purchasePriceList);

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
              <Breadcrumb.Item>App</Breadcrumb.Item>
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
                      <FormItem label="Purchasing Time Span:">
                        <Select defaultValue="7" onChange={() => {}}>
                          <Option value="7">7 Days</Option>
                          <Option value="15">15 Days</Option>
                          <Option value="30">1 Month</Option>
                          <Option value="c">Customized</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <FormItem label="Purchasing strategy:">
                        <Select defaultValue="lucy" onChange={() => {}}>
                          <Option value="op1">Option 1</Option>
                          <Option value="op2">Option 2</Option>
                          <Option value="disabled" disabled>
                            Option 3
                          </Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={8}>
                      <Button size="large" type="primary" htmlType="submit" loading={false}>
                        {false ? 'Forecast...' : 'Forecast'}
                      </Button>
                    </Col>
                  </Row>
                  <Row className="form-bottom-buttons-container">
                    {' '}
                    <Col span="24" style={{ textAlign: 'right' }} />
                  </Row>
                </Form>
              </fieldset>
              <fieldset style={{ margin: '10px 0 0 0' }}>
                <legend>Purchasing Price Data</legend>
                <div className="chart-container">
                  {fetchPurchasePriceListError && this.renderError(fetchPurchasePriceListError)}
                  <div className="chart-legend">
                    <span className="line past" />
                    <label>Past Data</label>
                    <span className="line forecast" />
                    <label>Forecast Data</label>
                  </div>
                  <div id="price-chart" style={{ padding: '0 24px' }} />
                </div>
              </fieldset>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Atlas team @B1 Hackathon 2018 </Footer>
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
