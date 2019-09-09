const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const { PORT, NODE_ENV } = require('./config')

const dev = NODE_ENV !== 'production'

const nextApp = next({ dir: './src', dev })

const handle = nextApp.getRequestHandler()

const { sendMail, isEmail } = require('./mailer')

// Prepare React app before setting up the server
nextApp.prepare().then(() => {
  const server = express()

  // Accept JSON
  server.use(bodyParser.json())

  // Setup /contact route for mailing
  server.post('/api/contact', (req, res) => {
    const { from = '', name = '', message = '' } = req.body

    if (from === '' || !isEmail(from) || message === '') {
      // Vague on purpose to avoid message spam
      res.send({ message: 'Invalid Request' })
    }

    sendMail({ email: from, name, text: message })
      .then(() => {
        console.log(`--- Sucessfully sent mail! --- From: ${from} -> To: navarrete.tristan@gmail.com`)
        res.send({
          success: true,
          message: "Message sent! 👌 Have a nice day! I'll get back to you soon!"
        })
      })
      .catch(error => {
        console.log('--- Failed to send email! ---  Error:', JSON.stringify(error, null, 2))
        res.send({
          success: false,
          message: "Something unexpected happened on the backend! Don't worry. Ninja's have been dispatched."
        })
      })
  })

  // Serve React/Next App
  server.get('*', (req, res) => handle(req, res))

  // Start the server using the provided PORT
  server.listen(PORT, err => {
    if (err) throw err
    console.log('> Read on http://localhost:3000')
  })
})
