import { Component } from "react";

class UserService extends Component {

  async getUsers() {
    const response = await fetch('/api/users');
    const responseBody = await response.json();

    if (response.status !== 200) throw Error(responseBody.message);
    return responseBody;
  }

  async getUser(userId) {
    const response = await fetch(`/api/user/_id=${userId}`);
    const responseBody = await response.json();

    if (response.status !== 200) throw Error(responseBody.message);
    return responseBody;
  }

  async getUserByEmail(email) {
    const response = await fetch(`/api/user/email=${email}`);
    const responseBody = await response.json();

    if (response.status !== 200) throw Error(responseBody.message);
    return responseBody;
  }

  async getUserByUsername(username) {
    const response = await fetch(`/api/user/username=${username}`);
    const responseBody = await response.json();

    if (response.status !== 200) throw Error(responseBody.message);
    return responseBody;
  }

  async authenticate(username, password) {
    const response = await fetch(`/api/user/username=${username}&password=${password}`);
    const responseBody = await response.json();

    if (response.status !== 200) throw Error(responseBody.message);
    return responseBody;
  }

  async saveUser(user) {
    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: user._id,
        email: user.email,
        username: user.username,
        password: user.password,
        joindate: user.joindate
      }),
    });
    return await response.text();
  }

}

export default UserService;
