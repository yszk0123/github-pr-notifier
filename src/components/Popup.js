import React from 'react';
import User from '../User';

const LIMIT = 20;
const AVATAR_SIZE = 32;
const styles = {
  Popup: {
    minWidth: 300,
    padding: 15,
  },
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
      return <div>Nothing !</div>;
    }

    return (
      <ul style={styles.Popup}>
        {search.edges
          .map(e => e.node)
          .map(({ title, url, author: { avatarUrl, login } }) =>
            <li key={title}>
              <img
                src={avatarUrl}
                alt={login}
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
              />
              <span>{title.slice(0, 10)} by {login}</span>
              <a href={url}>Open</a>
            </li>,
          )}
      </ul>
    );
  }
}
