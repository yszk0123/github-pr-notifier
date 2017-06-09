import React from 'react';
import User from '../User';

export default class Options extends React.Component {
  constructor(props) {
    super(props);

    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._handleTokenChange = this._handleTokenChange.bind(this);
    this._handleSave = this._handleSave.bind(this);

    this.user = new User();
    this.state = this.user.getLoginInfo();
  }

  _handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  _handleTokenChange(event) {
    this.setState({
      token: event.target.value,
    });
  }

  _handleSave(event) {
    this.user.login({
      username: this.state.username,
      token: this.state.token,
    });
  }

  render() {
    const { username, token } = this.state;

    return (
      <div>
        <label labelFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={this._handleUsernameChange}
        />
        <label labelFor="token"> token:</label>
        <input
          id="token"
          type="text"
          value={token}
          onChange={this._handleTokenChange}
        />
        <button onClick={this._handleSave}>Save</button>
      </div>
    );
  }
}
