function User(username, password, firstName, lastName, role) {
  this.username = username;
  this.password = password;
  // ...same for rest of properties…

  this.setUsername = setUsername;
  this.getUsername = getUsername;
  // ...same for rest of properties…

  function setUsername(username) {
    this.username = username;
  }
  function getUsername() {
    return this.username;
  }
  // ...same for rest of properties…
}
