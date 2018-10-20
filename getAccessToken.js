const request = require('request-promise')
const config = require('./config/githubConfig')
let token = ''

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