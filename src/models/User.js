export class User {

  _id;

  email;

  username;

  password;

  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}