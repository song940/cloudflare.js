const Cloudflare = require('..');

const { CF_TOKEN } = process.env;

const cf = new Cloudflare({
  token: CF_TOKEN,
});

(async () => {

  await cf.user.tokens.verify({});

  const zones = await cf.zones.list();
  console.log(zones);
  for (const zone of zones) {
    console.log(zone);
  }

  // const user = await cf.user.get();
  // console.log(user);
  // await cf.user.tokens.list();
  // await cf.user.tokens.get();
  // await cf.user.tokens.create();
  // await cf.user.tokens.edit();
  // await cf.user.tokens.del();
  // await cf.user.tokens.roll();
  // await cf.user.tokens.permission_groups();

})();