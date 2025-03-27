
import { useState } from 'react';

export type FormValue = any;
export type FormValues = Record<string, FormValue>;
export type FormErrors = Record<string, string>;
export type FormTouched = Record<string, boolean>;
export type ValidateFunction = (values: FormValues) => FormErrors;
const useForm = (
    initialValues: FormValues,
    validateOnChange: boolean = false,
    validate?: ValidateFunction
) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<FormTouched>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, id } = e.target;

        // Check if the field is nested (contains dots)
        if (id.includes('.')) {
            const [parent, child] = id.split('.');

            setValues(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent] as object),
                    [child]: value
                }
            }));
        } else {
            setValues(prev => ({
                ...prev,
                [name]: value
            }));
        }

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        if (validateOnChange && validate) {
            validate(values);
        }
    };

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, id, checked } = e.target;

        // Check if the field is nested (contains dots)
        if (id.includes('.')) {
            const [parent, child] = id.split('.');

            setValues(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent] as object),
                    [child]: checked
                }
            }));
        } else {
            setValues(prev => ({
                ...prev,
                [name]: checked
            }));
        }

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        if (validateOnChange && validate) {
            validate(values);
        }
    }

    // Handle blur for both flat and nested fields
    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    // Set field value manually (useful for nested objects)
    const setFieldValue = (name: string, value: any) => {
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setValues(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent] as object),
                    [child]: value
                }
            }));
        } else {
            setValues(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        setValues,
        setFieldValue,
        errors,
        setErrors,
        touched,
        setTouched,
        handleInputChange,
        handleCheckBoxChange,
        handleBlur,
        resetForm
    };
};

export default useForm;