const api = require('./getAPI')
const token = require('./getAccessToken')
const config = require('./config/githubConfig')

exports.getCode = () => {
    return async (req, res) => {
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
      console.log('strip ', accessTokenStrip2)
      
      req.session.github = accessTokenStrip2
      
      res.status(200).send(accessTokenStrip2)
    }
  }

    exports.getUser = () => {
      return async (req, res) => {
        console.log(req.session)
      const user = await api.getAPI(
        'https://api.github.com/user',
        req.session.github
      )
      res.status(200).send(user)
    }
  }

  exports.getRepos = () => {
    return async (req, res) => {
    const repos = await api.getAPI(
      'https://api.github.com/user/repos',
      req.session.github
    )
    res.status(200).send(repos)
  }
}