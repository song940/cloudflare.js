
class Tokens {
  constructor(cf) {
    this.cf = cf;
  }
  list() {
    return this.cf.get('/user/tokens');
  }
  get(id) {
    return this.cf.get(`/user/tokens/${id}`);
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