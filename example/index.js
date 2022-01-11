const Cloudflare = require('..');

const { CF_TOKEN } = process.env;

const cf = new Cloudflare({
  token: CF_TOKEN,
});

(async () => {
  const list = await cf.zones.dns_records.list('a23330422d79eedb6821579eb313cf68');
  console.log(list);
})();