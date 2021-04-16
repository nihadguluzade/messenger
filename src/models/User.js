export class User {

  _id;

  email;

  username;

  password;

  joindate;

  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.joindate = new Date();
  }


  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}
