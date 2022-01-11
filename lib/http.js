const https = require('https');
const assert = require('assert');
const { debuglog } = require('util');

const debug = debuglog('cloudflare');

const request = (method, url, payload, headers) => {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method,
      headers,
    }, resolve);
    req.once('error', reject);
    req.end(payload);
  });
};

const readStream = stream => {
  const buffer = [];
  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', chunk => buffer.push(chunk))
      .on('end', () => resolve(Buffer.concat(buffer)))
  });
};

const ensureStatusCode = expected => {
  if (!Array.isArray(expected))
    expected = [expected];
  return res => {
    const { statusCode } = res;
    assert.ok(expected.includes(statusCode), `status code must be "${expected}" but actually "${statusCode}"`);
    return res;
  };
};

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
      headers.Authorization = `Bearer ${token}`;
    } else {
      headers['X-Auth-Email'] = email;
      headers['X-Auth-Key'] = key;
    }
    return headers;
  }
  request(method, path, payload) {
    const { api } = this;
    const headers = this.getHeaders();
    debug('request', method, api + path, payload);
    return Promise
      .resolve()
      .then(() => request(method, api + path, JSON.stringify(payload), headers))
      .then(ensureStatusCode(200))
      .then(readStream)
      .then(JSON.parse)
      .then(handleError);
  }
  get(path, payload) {
    return this.request('GET', path, payload);
  }
  post() {
    return this.request('POST', path, payload);
  }
}

module.exports = HTTPClient;