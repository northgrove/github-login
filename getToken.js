const token = require('./tokens')
const config = require('./config/githubConfig')

exports.getCode = () => {
    return async (req, res) => {
      //const code = await token.getCode(
      //  config.autorizeURI
      //)
      //console.log(code)
      //res.redirect('https://github.com/login/oauth/authorize?client_id=8270f332725a65ab1abe&redirect_uri=http://localhost:5050/callback')
      res.redirect(config.authorizeURL + '?client_id=' + config.clientID + '&redirect_uri=' + config.redirectUrl)
    }
  }

  exports.getToken = () => {
    return async (req, res) => {
        console.log(req.query.code, config.tokenURL)
      const accessToken = await token.getAccessToken(
        config.tokenURL,
        req.query.code
      )
      console.log('jau2: ', accessToken)
      accessTokenStrip = accessToken.replace('access_token=','')
      accessTokenStrip2 = accessTokenStrip.replace('&scope=&token_type=bearer','')
      console.log('strip ', accessTokenStrip)
      res.send(accessTokenStrip2)
    }
  }