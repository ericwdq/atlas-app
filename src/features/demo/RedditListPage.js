import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class RedditListPage extends Component {
  static propTypes = {
    demo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  render() {
    const { fetchRedditListPending, redditList, fetchRedditListError } = this.props.demo;
    const { fetchRedditList } = this.props.actions;

    return (
      <div className="demo-reddit-list-page">
        <button disabled={fetchRedditListPending} onClick={fetchRedditList}>
          {fetchRedditListPending ? 'Fetching...' : 'Fetch Topics'}
        </button>
        <br />
        <br />
        {fetchRedditListError && (
          <div className="fetch-list-error">Error: {fetchRedditListError.toString()}</div>
        )}
        {redditList.length > 0 ? (<ul>
          {redditList.map(item => (
            <li key={item.id}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>) : (
            <div className="no-items-tip">No items yet.</div>
          )}
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
)(RedditListPage);
