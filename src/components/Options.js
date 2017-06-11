import React from 'react';
import User from '../User';
import AlarmsService from '../common/AlarmsService';

export default class Options extends React.Component {
  constructor(props) {
    super(props);

    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._handleTokenChange = this._handleTokenChange.bind(this);
    this._handleIntervalChange = this._handleIntervalChange.bind(this);
    this._handleSave = this._handleSave.bind(this);

    this.user = new User();
    this.state = Object.assign({}, this.user.getLoginInfo(), {
      interval: AlarmsService.getInterval(),
    });
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

  _handleIntervalChange(event) {
    this.setState({
      interval: parseInt(event.target.value, 10),
    });
  }

  _handleSave(event) {
    this.user.login({
      username: this.state.username,
      token: this.state.token,
    });
    AlarmsService.setInterval(this.state.interval);

    this.props.onSave();
  }

  render() {
    const { username, token, interval } = this.state;

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
        <label labelFor="interval"> interval:</label>
        <input
          id="interval"
          type="number"
          value={interval}
          onChange={this._handleIntervalChange}
        />
        <button onClick={this._handleSave}>Save</button>
      </div>
    );
  }
}
