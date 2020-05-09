import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import ContactForm from './ContactForm'
import sleep from '../../utils/sleep'
import axios from 'axios'
import { message } from 'antd'

const { Paragraph } = Typography

const Link = styled.a`
  color: #3273dc !important;
  &:hover {
    text-decoration: underline !important;
  }
`

const UnknownError = () =>
  message.error('There was an error sending that message...', 5)

// This gets passed to formik as a callback.
const onSubmit = (values, actions) => {
  // Tell our form that we are updating
  actions.setSubmitting(true)
  message.loading(`Broadcasting your message... 📡`, 5)
  sleep(2500)
  return axios
    .post('/api/contact', { ...values })
    .then(response => {
      if (!response.data.success) {
        if (response.data.message) {
          message.error(response.data.message, 5)
        } else {
          UnknownError()
        }
      } else if (response.data.success) {
        message.success(response.data.message, 5)
        actions.resetForm()
      } else {
        UnknownError()
      }
    })
    .catch(error => {
      console.log('Error sending message. Error:', error)
      UnknownError()
    })
    .finally(() => actions.setSubmitting(false))
}

export default () => {
  return (
    <section id="contact" className="hero is-white">
      <div className="hero-body">
        <div className="container" style={{ width: 'unset' }}>
          <h3 className="title is-3 has-text-centered">Get In Contact</h3>
          <h4 className="subtitle is-5 has-text-centered">
            ~ Let's create something amazing together! ~
          </h4>
          <div className="columns is-centered" style={{ margin: '2rem 0' }}>
            {/* <div className="column is-4">
              <Typography>
                <Paragraph>
                  Do you have an interesting project I can help with? Feel free to reach out to me by using one of the
                  following:
                </Paragraph>
                <Paragraph>
                  {'Phone: '}
                  <Link href="tel:16473133401">
                    <strong>1+ (647) 313-3401</strong>
                  </Link>
                </Paragraph>
                <Paragraph>
                  {'Email: '}
                  <Link href="mailto:navarrete.tristan@gmail.com">
                    <strong>navarrete.tristan@gmail.com</strong>
                  </Link>
                </Paragraph>
                <Paragraph>You can also use the contact form on this page.</Paragraph>
              </Typography>
            </div> */}
            <div className="column is-8">
              <ContactForm onSubmit={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
