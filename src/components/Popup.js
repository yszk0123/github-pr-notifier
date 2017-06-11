import React from 'react';
import User from '../User';

const LIMIT = 20;
const AVATAR_SIZE = 32;
const styles = {
  Popup: {
    minWidth: 300,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
  },
  PullRequestsHeader: {},
  PullRequest: {
    margin: '4px 2px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
  },
  PullRequestIcon: {
    marginRight: 8,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  PullRequestContent: {
    alignContent: 'center',
  },
  PullRequestContentTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '110%',
  },
  PullRequestContentSubtitle: {
    fontSize: '80%',
    color: '#666',
    marginTop: 2,
  },
  PullRequestContentLogin: {},
  PullRequestContentOpen: {},
};

export default class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.user = new User();

    this.state = {
      data: null,
      error: null,
    };
  }

  async _fetchData() {
    try {
      const { data } = await this.user.fetchRequestedReviews({
        limit: LIMIT,
        avatarSize: AVATAR_SIZE,
      });
      this.setState({ data, error: null });
    } catch (error) {
      this.setState({
        data: null,
        error,
      });
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    }

    if (!this.state.data) {
      return <div>Loading...</div>;
    }

    const { search } = this.state.data;
    if (!search.issueCount) {
      return <h2>No Requests</h2>;
    }

    return (
      <ul style={styles.Popup}>
        <li style={styles.PullRequestsHeader}>
          <h2>Review Requested (<span>{search.issueCount}</span>)</h2>
        </li>
        {search.edges
          .map(e => e.node)
          .map(({ title, url, author: { avatarUrl, login } }) =>
            <li key={title} style={styles.PullRequest}>
              <img src={avatarUrl} alt={login} style={styles.PullRequestIcon} />
              <div style={styles.PullRequestContent}>
                <div style={styles.PullRequestContentTitle}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.PullRequestContentOpen}
                  >
                    {title}
                  </a>
                </div>
                <div style={styles.PullRequestContentSubtitle}>
                  <span style={styles.PullRequestContentLogin}>{login}</span>

                </div>
              </div>
            </li>,
          )}
      </ul>
    );
  }
}
