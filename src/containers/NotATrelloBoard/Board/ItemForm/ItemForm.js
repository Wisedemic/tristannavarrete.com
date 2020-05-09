import React from 'react'
import { Form, Field, FormSpy } from 'react-final-form'
import { Button, Icon } from 'antd'

let formReference = null

const verifyItem = values => {
  const errors = {}
  if (values.item.length < 3) {
    errors.item = 'Item cannot be shorter than 3 characters!'
  } else if (values.item.length > 56) {
    errors.item = 'Item cannot be greater than 56 characters!'
  }
  return errors
}

const validate = values => {
  const errors = {}
  if (!values.item) {
    errors.item = 'Item cannot be blank!'
  }

  const result = Object.keys(errors).length ? errors : true

  if (formReference) {
    const { active } = formReference.form.getState()

    if (active === undefined && result === true) {
      // We can run the async validation
      return verifyItem(values)
    }
  }

  return result
}

const OnBlurValidation = ({ mutators: { onBlurValidationMutator } }) => (
  <FormSpy
    subscription={{ active: true }}
    onChange={({ active }) => {
      if (active === undefined) {
        onBlurValidationMutator()
      }
    }}
  />
)

const onBlurValidationMutator = () => {}

const ItemForm = ({
  id = null,
  initialValues = { item: '' },
  onSubmit,
  cancelForm
}) => (
  <Form
    initialValues={initialValues}
    onSubmit={onSubmit}
    validate={validate}
    mutators={{ onBlurValidationMutator }}
    ref={form => (formReference = form)}
    render={({ handleSubmit, form, submitError, pristine, invalid }) => {
      const resetForm = () => {
        form.reset()
        cancelForm()
      }

      return (
        <form id={id} onSubmit={handleSubmit} className="board-item">
          <Field
            name="item"
            render={({ input, meta }) => (
              <div
                className="field has-addons has-addons-right is-grouped"
                style={{ width: '100%' }}
              >
                <div className="control is-expanded">
                  <input {...input} className="input is-small" />
                  {meta.touched && meta.error && (
                    <p className="help is-danger">{meta.error}</p>
                  )}
                </div>
                <div className="control">
                  <Button
                    type="primary"
                    size="small"
                    onClick={handleSubmit}
                    disabled={pristine || invalid}
                  >
                    <Icon type="check" />
                  </Button>
                </div>
                <div className="control">
                  <Button type="danger" size="small" onClick={resetForm}>
                    <Icon type="close" />
                  </Button>
                </div>
              </div>
            )}
          />
          {submitError && <div className="error">{submitError}</div>}
          <OnBlurValidation mutators={form.mutators} />
        </form>
      )
    }}
  />
)

export default ItemForm
