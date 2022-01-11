
class Tokens {
  constructor(cf) {
    this.cf = cf;
  }
  list() {

  }
  get() {

  }
  edit() {

  }
  del() {

  }
  roll() {

  }
  create() {

  }
  verify() {
    return this.cf.get('/user/tokens/verify');
  }
  permission_groups() {

  }
}

module.exports = Tokens;