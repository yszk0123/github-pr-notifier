import createGraphQLClient from 'graphql-client';
import normalizeISODateString from './common/normalizeISODateString';

const TOKEN_KEY = 'github-private-access-token';
const USERNAME_KEY = 'github-username';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getUsername() {
  return localStorage.getItem(USERNAME_KEY);
}

function setUsername(username) {
  localStorage.setItem(USERNAME_KEY, username);
}

export default class User {
  constructor() {
    this.client = null;
  }

  _reconnect() {
    const token = getToken();
    if (!token) {
      throw new Error(
        'Cannot connect to GitHub GraphQL Client. Token does not exist',
      );
    }

    this.client = createGraphQLClient({
      url: 'https://api.github.com/graphql',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  _connectIfNeeded() {
    if (this.client) {
      return;
    }

    this._reconnect();
  }

  async _executeQuery(query, variables) {
    this._connectIfNeeded();
    return this.client.query(query, variables);
  }

  // TODO: Better solution
  login({ username, token }) {
    setUsername(username);
    setToken(token);
    this._reconnect();
  }

  getLoginInfo() {
    return {
      username: getUsername(),
      token: getToken(),
    };
  }

  async fetchRequestedReviews({ limit, avatarSize, updatedAt }) {
    const username = getUsername();
    if (!username) {
      throw new Error('Username does not exist');
    }

    const variables = {
      limit,
      avatarSize,
    };

    const searchQuery = [
      'is:closed',
      'is:pr',
      `review-requested:${username}`,
      updatedAt && `updated:>=${normalizeISODateString(updatedAt)}`,
    ]
      .filter(Boolean)
      .join(' ');

    return this._executeQuery(
      `
      query ($limit: Int!, $avatarSize: Int) {
        search(query: "${searchQuery}", first: $limit, type: ISSUE) {
          edges {
            node {
              ... on PullRequest {
                id
                title
                url
                author {
                  avatarUrl(size: $avatarSize)
                  login
                }
              }
            }
          }
          issueCount
        }
      }`,
      variables,
    );
  }

  async fetchRequestedReviewsCount({ limit }) {
    const username = getUsername();
    if (!username) {
      throw new Error('Username does not exist');
    }

    const variables = {
      limit,
    };

    return this._executeQuery(
      `
      query ($limit: Int!) {
        search(query: "is:open is:pr review-requested:${username}", first: $limit, type: ISSUE) {
          issueCount
        }
      }`,
      variables,
    );
  }
}
