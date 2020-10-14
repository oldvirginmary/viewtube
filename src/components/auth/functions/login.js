import getUserToken from "./getUserToken.js"


export function login (user, allUsers) {
  let userLogins = Object.keys(allUsers)  
  let userToken = getUserToken(user)

  for (let l in userLogins) {
    if (userLogins[l] === user.login && allUsers[userLogins[l]] === userToken.key) {
      return userToken
    }
  }

  return {}
}


export function registration (user) {
  return getUserToken(user)
}