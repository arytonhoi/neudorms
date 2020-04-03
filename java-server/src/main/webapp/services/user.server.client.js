function UserService() {
  this.findAllUsers = findAllUsers
  this.createUser = createUser
  this.deleteUser = deleteUser
  this.updateUser = updateUser
  this.findUserById = findUserById

  this.url = 'https://wbdv-generic-server.herokuapp.com/api/ahoi/users'

  function createUser(user) {
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response) {
      return response.json()
    })
  }

  function findAllUsers() {
    return fetch(this.url)
      .then(function(response) {
        return response.json()
      })
  }

  function deleteUser(userId) {
    return fetch(`${this.url}/${userId}`, {
      method: 'DELETE'
    })
  }
}

function updateUser(userId, user) {
  return fetch(`${this.url}/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(function(response) {
    return response.json()
  })
}

function findUserById(userId) {
  return fetch(`${this.url}/${userId}`)
    .then(function(response) {
      return response.json()
    })
}