const request = require('request-promise')
const config = require('./config/githubConfig')
let ms_access_token = ''
let token = ''

exports.getCode = async (tokenURI) => {
  let parameters = ''
  try {
    parameters = {
      client_id: config.clientID,
      scope: 'user',
      redirect_uri: config.redirectUrl,
      state: '123456789',
      client_secret: config.clientSecret
    }
    console.log(config.authorizeURL + '?client_id=' + config.clientID + '&redirect_uri=' + config.redirectUrl )
    await request.get({ url: config.authorizeURL + '?client_id=' + config.clientID + '&redirect_uri=' + config.redirectUrl }, function callback(
      err,
      httpResponse,
      body
    ) {
      //ms_access_token = JSON.parse(body).access_token

      //console.log('access token: ', ms_access_token)
      console.log('response: ', body)
      return ms_access_token
    })
    return ms_access_token
  } catch (e) {
    //console.error('Could not get access_token', e)
    return e
  }
}

exports.getAccessToken = async (tokenURI, code) => {
    let parameters = ''
    try {
      parameters = {
        client_id: config.clientID,
        code: code,
        redirect_uri: config.redirectUrl,
        client_secret: config.clientSecret
      }
      // console.log(parameters)
      await request.post({ url: tokenURI, formData: parameters }, function callback(
        err,
        httpResponse,
        body
      ) {
        console.log('jau: ', httpResponse.body)
        //ms_access_token = JSON.parse(httpResponse.body).access_token
        token = httpResponse.body
        // console.log('access token: ', ms_access_token)
        return token
      })
      return token
    } catch (e) {
      //console.error('Could not get access_token', e)
      return e
    }
  }