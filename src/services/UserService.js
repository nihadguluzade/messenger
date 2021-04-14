import { Component } from "react";

class UserService extends Component {

  async saveUser(user) {
    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: user._id, email: user.email, password: user.password }),
    });
    return await response.text();
  }

}

export default UserService;