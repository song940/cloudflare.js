require('isomorphic-fetch');

const debuglog = name => {
  const { NODE_DEBUG } = process.env;
  return (...args) => {
    if (NODE_DEBUG && NODE_DEBUG.includes(name)) {
      console.debug(...args);
    };
  };
};

const debug = debuglog('cloudflare');

const handleError = res => {
  const { success, errors, messages, result } = res;
  if (success) return result;
  for (const message of messages) {
    debug('response message:', message);
  }
  for (const error of errors) {
    const { code, message } = error;
    throw new Error(`${code}: ${message}`);
  }
};

class HTTPClient {
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    const { email, key, token } = this;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      headers['X-Auth-Email'] = email;
      headers['X-Auth-Key'] = key;
    }
    return headers;
  }
  async request(method, path, payload) {
    const { api } = this;
    const headers = this.getHeaders();
    debug('request', method, api + path, payload);
    const response = await fetch(api + path, { method, headers, body: JSON.stringify(payload) });
    const res = await response.json();
    return handleError(res);
  }
  get(path, payload) {
    return this.request('GET', path, payload);
  }
  post() {
    return this.request('POST', path, payload);
  }
}

module.exports = HTTPClient;