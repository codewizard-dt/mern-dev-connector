const jwt = require('jsonwebtoken')
const config = require('config')

const authCheck = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' })

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ errors: [{ msg: 'Invalid token' }] })
  }
}

module.exports = authCheck;