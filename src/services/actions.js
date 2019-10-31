/**
 * @param {string} url Service url that inserts a new account
 * @param {Object} jsonBody Json element with the new account data to be inserted
 * @returns {Object} Success check with json element inserted
 * @description Responsible for inserting a new account
*/
export const insertUserAccount = (url, jsonBody) => {
    let headerJSON = new Headers({ 'Content-Type': 'application/json' })
    let objTextToJson = jsonBody.replace(/[\\']/g, '"')
    let objBody = JSON.parse(objTextToJson)
    let initPOST = {
        method: 'POST',
        headers: headerJSON,
        mode: 'cors',
        body: JSON.stringify(objBody)
    }
    let request = new Request(url, initPOST);

    const resp = fetch(request)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    return resp.data
}

/**
 * @param {string} url Service url that inserts a new account
 * @returns {Object} Returns according to url, the list of all users or a specific user as id entered in the received url
 * @description Search entered account data
*/
export const getUsers = (url) => {
    let headerJSON = new Headers({ 'Content-Type': 'application/json' })
    let initPOST = {
        method: 'GET',
        headers: headerJSON,
        mode: 'cors'
    }
    let request = new Request(url, initPOST);

    const resp = fetch(request)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    return resp.data
}

/**
 * @param {string} name Username of the account to be entered
 * @param {string} password Password of the user of the account to be entered
 * @param {string} mail Email of the user of the account to be entered
 * @returns {Object} Json element with the data of the account to be inserted
 * @description Formats user data for later json structure conversion
*/
export const createUserElement = (name, password, mail) => {
    const user = `{'user':
                    {
                        'name': '${name}',
                        'password': '${password}',
                        'mail': '${mail}'
                    }
                 }`
    return user
}

/**
 * @returns {} no return
 * @description Redirect url to registration confirmation screen
*/
export const redirectToConfirm = () => {
    const newUrl = window.location.href + '?accountCreated=true';
    window.location.href = newUrl;
}
