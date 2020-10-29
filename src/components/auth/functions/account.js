import sha256 from 'crypto-js/sha256'
import hmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'


function getUserToken (user) {
  let header = {
    alg: "HS512",
    type: "JWT"
  }

  const SALT = "8JdwnLZ12"

  const UNSIGNED_TOKEN =
    sha256(JSON.stringify(header)) + "." +
    sha256(JSON.stringify(user.login) + JSON.stringify(user.password))

  const SIGNATURE = Base64.stringify(hmacSHA512(UNSIGNED_TOKEN, SALT))

  return { login: user.login, key: SIGNATURE }
}


export function authentication (user, allUsers) {
  let userLogins = Object.keys(allUsers)
  let userToken = getUserToken(user)

  for (let i in userLogins) {
    let login = userLogins[i]

    if (login === user.login && allUsers[login].key === userToken.key) {
      return userToken
    }
  }

  return {}
}


export function registration (user) {
  return getUserToken(user)
}