
/**
  * @constant backendURL
  * @param {string}
  * @returns {string} Returns the service url
*/
export const backendURL = process.env.API_BACKEND_DOMAIN || 'http://localhost:4000/api'

/**
  * @constant createUserAccount
  * @returns {string} Returns the service url
*/
export const createUserAccount = backendURL + '/users/create'

/**
  * @constant getListUsers
  * @returns {string} Returns the service url
*/
export const getListUsers = backendURL + '/users'

/**
  * @constant getUser
  * @returns {string} Returns the service url
*/
export const getUser = backendURL + '/users/find/'

/**
  * @constant deleteUser
  * @returns {string} Returns the service url
*/
export const deleteUser = backendURL + '/users/delete/'

