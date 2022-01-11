## cloudflare

> Cloudflare API in JavaScript

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

### Installation

```
~$ npm i @song940/cloudflare
```

### Example

```js
const Cloudflare = require('@song940/cloudflare');

const { CF_TOKEN } = process.env;

const cf = new Cloudflare({
  token: CF_TOKEN,
});
```

### License
    
    Apache License 2.0