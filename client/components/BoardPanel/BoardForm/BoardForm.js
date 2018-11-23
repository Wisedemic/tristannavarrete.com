import React from 'react';
import { Form, Field, FormSpy } from 'react-final-form';

let formReference = null;


const verifyCategory = values => {
    const errors = {};
    if (values.category.length < 3) {
        errors.category = 'Name cannot be shorter than 3 characters!';
    } else if (values.category.length > 56) {
        errors.category = 'Name cannot be greater than 56 characters!';
    }
    return errors;
};


const validate = values => {
    const errors = {};
    if (!values.category) {
        errors.category = 'Name cannot be blank!';
    }

    const result = Object.keys(errors).length ? errors : true;

    if (formReference) {
        const { active } = formReference.form.getState();

        if (active === undefined && result === true) {
            // We can run the async validation
            return verifyCategory(values);
        }

    }

    return result;
}

const OnBlurValidation = ({ mutators: { onBlurValidationMutator } }) => (
    <FormSpy
        subscription={{ active: true }}
        onChange={({ active }) => {
            if (active === undefined) {
                onBlurValidationMutator();
            }
        }}
    />
);

const onBlurValidationMutator = () => { };

const BoardForm = ({ initialValues = { category: '' }, onSubmit, cancelForm }) => (
    <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        mutators={{ onBlurValidationMutator }}
        ref={(form) => {
            formReference = form;
        }}
        render={({ handleSubmit, form, submitError, pristine, invalid }) => {
            const resetForm = () => {
                form.reset();
                cancelForm();
            };
            return (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="category"
                        render={({ input, meta }) => (
                            <div className="field is-grouped has-addons has-addons-right">
                                <div className="control is-expanded">
                                    <input {...input} className="input is-small" />
                                    {meta.touched && meta.error && <p className="help is-danger">{meta.error}</p>}
                                </div>
                                <div className="control">
                                    <button onClick={handleSubmit} className="button is-small has-icon is-success" type="submit" disabled={pristine || invalid}>
                                        <span className="icon"><i className="fas fa-check"></i></span>
                                    </button>
                                </div>
                                <div className="control">
                                    <button className="button is-small has-icon is-dark" onClick={resetForm}>
                                        <span className="icon"><i className="fas fa-times"></i></span>
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                    {submitError && <div className="error">{submitError}</div>}
                    <OnBlurValidation mutators={form.mutators} />
                </form>
            );
        }}
    />
);

export default BoardForm;