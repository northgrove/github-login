const request = require('request-promise')
let apiResponse = ''



exports.getAPI = async (apiURI, accessToken) => {
  let parameters = ''
  try {
    console.log(apiURI, accessToken )
    await request.get({
      headers: { 
        'User-Agent': 'nav-login',
        'Authorization':'token ' + accessToken
     },
      url: apiURI,
     // auth: { token: accessToken }
    }, function callback(
      err,
      httpResponse,
      body
    ) {
      apiResponse = JSON.parse(body)

      //console.log('access token: ', ms_access_token)
      //console.log('response: ', body)
      return apiResponse
    })
    return apiResponse
  } catch (e) {
    //console.error('Could not get access_token', e)
    return e
  }
}

