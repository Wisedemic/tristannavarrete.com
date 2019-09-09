import React from 'react'
import { Formik, Field } from 'formik'

const validate = v => {
  let errors = {}

  if (v.name === '' || v.name === undefined) {
    errors.name = 'Who am I replying to?'
  }

  // Email
  if (v.from === undefined || !v.from || v.from.length === 0) {
    errors.from = 'Email cannot be blank!'
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(v.from).toLowerCase()
    )
  ) {
    errors.from = 'I need your email, so I can reply!'
  }
  // Message
  if (v.message === undefined || v.message === '') {
    errors.message = "There's nothing you want to say ? 😢"
  }

  return errors
}

function ContactForm({ onSubmit }) {
  return (
    <Formik
      validate={validate}
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        from: '',
        message: ''
      }}
      render={props => {
        return (
          <form onSubmit={props.handleSubmit}>
            <Field
              name="name"
              render={props => {
                return (
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input className="input" placeholder="Elon Musk" type="text" {...props.field} />
                      {props.form.submitCount > 0 && props.form.errors.name && (
                        <p className="help is-warning">{props.form.errors.name}</p>
                      )}
                    </div>
                  </div>
                )
              }}
            />
            <Field
              name="from"
              render={props => {
                return (
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input className="input" placeholder="elon@spacex.com" type="text" {...props.field} />
                      {props.form.touched.from && props.form.errors.from && (
                        <p className="help is-warning">{props.form.errors.from}</p>
                      )}
                    </div>
                  </div>
                )
              }}
            />
            <Field
              name="message"
              render={props => {
                return (
                  <div className="field">
                    <label className="label">Message</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder={
                          props.form.touched.message && props.form.errors.message
                            ? props.form.errors.message
                            : 'I have an intriguing offer for you...'
                        }
                        type="textarea"
                        {...props.field}
                      />
                    </div>
                  </div>
                )
              }}
            />
            <div className="field">
              <div className="control">
                <button
                  className={`button is-medium is-primary${props.isSubmitting ? ' is-loading' : ''}`}
                  type="submit"
                  disabled={props.isSubmitting}
                >
                  Send Message <i className="fas fa-paper-plane" style={{ marginLeft: '0.5rem' }} />
                </button>
              </div>
            </div>
          </form>
        )
      }}
    />
  )
}

export default ContactForm
