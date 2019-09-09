const isEmail = email =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  )
const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = require('./config')

const mailgunConfig = {
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
}

const mailgun = require('mailgun-js')(mailgunConfig)

const sendMail = ({ email, name, text }) => {
  const from = name ? `${name} <${email}>` : email
  const message = {
    from,
    to: 'Tristan Navarrete <navarrete.tristan@gmail.com>',
    subject: `New Message from: ${from} - Contact Form (Tnav.com)`,
    text
  }
  return new Promise((resolve, reject) => {
    mailgun.messages().send(message, (error, body) => (error ? reject(error) : resolve(body)))
  })
}

module.exports = { sendMail, isEmail }
