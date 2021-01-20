import React from 'react';
import { Field } from 'formik';

const SemanticFieldWrapper = ({ component, ...fieldProps }) => (
    <Field {...fieldProps}>
        {({
            field: { value, onBlur, ...field },
            form: { setFieldValue, setFieldTouched },
            ...props
        }) =>
            React.createElement(component, {
                ...fieldProps,
                ...field,
                ...props,
                ...(typeof value === 'boolean'
                    ? {
                          checked: value,
                      }
                    : {
                          value,
                      }),
                onChange: (e, { value: newValue, checked }) =>
                    setFieldValue(fieldProps.name, newValue || checked),
                onBlur: (e, blurProps) =>
                    blurProps
                        ? setFieldTouched(fieldProps.name, blurProps.value)
                        : onBlur(e),
            })
        }
    </Field>
);

export default SemanticFieldWrapper;
