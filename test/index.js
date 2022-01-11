const assert = require('assert');
const Cloudflare = require('..');

const { CF_TOKEN } = process.env;

const cf = new Cloudflare({
  // token: CF_TOKEN,
  email: 'song940@gmail.com',
  key: '99fa17d26066eb82af420cf224087b57f15ed'
});

const test = async (name, fn) => {
  try {
    await fn();
    console.log(("✓ " + name));
  } catch (err) {
    console.error(("✗ " + name));
    throw err;
  }
};

// test("user.tokens.verify", async () => {
//   const res = await cf.user.tokens.verify();
//   assert.equal(res.status, 'active');
// });

test("user.get", async () => {
  const user = await cf.user.get();
  assert.equal(user.id, 'b6e86cdfeeeeb9bfb16a07bcc7c2d1db');
});

test('user.tokens.list', async () => {
  const list = await cf.user.tokens.list();
  assert.equal(list.length, 1);
  assert.equal(list[0].id, '32944715e5bbd7422036cf33f6e57dff');
});

test('user.tokens.get', async () => {
  const token = await cf.user.tokens.get('32944715e5bbd7422036cf33f6e57dff');
  assert.equal(token.id, '32944715e5bbd7422036cf33f6e57dff');
});

test('accounts.list', async () => {
  const accounts = await cf.accounts.list();
  assert.equal(accounts.length, 1);
  assert.equal(accounts[0].id, '516f0ab5d78ab13ba037fceedacd7243');
  assert.equal(accounts[0].name, 'Lsong');
  assert.equal(accounts[0].type, 'standard');
});

test('zones.list', async () => {
  const zones = await cf.zones.list();
  assert.equal(zones.length, 6);
});


test('zones.get', async () => {
  const zone = await cf.zones.get('a23330422d79eedb6821579eb313cf68');
  // console.log(zone);
  assert.equal(zone.id, 'a23330422d79eedb6821579eb313cf68');
  assert.equal(zone.name, 'lsong.org');
  assert.equal(zone.status, 'active');
  assert.equal(zone.type, 'full');
});

test('zones.dns_records.list', async () => {
  const records = await cf.zones.dns_records.list('a23330422d79eedb6821579eb313cf68');
  assert.equal(records.length, 17);
  // console.log(records);
  assert.equal(records[0].id, 'e05ebcdb1e7f1dab701ed63f3b688564');
  assert.equal(records[0].name, 'lsong.org');
  assert.equal(records[0].type, 'A');
  assert.equal(records[0].content, '185.199.111.153');
});