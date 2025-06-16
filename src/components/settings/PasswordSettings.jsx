import { useState } from "react";
import {
    validatePasswordMessage,
    validatePassword
} from "../../shared/validators"
import { useChangePassword } from "../../shared/hooks";
import { Input} from "../Input"

const inputs = [
    {
        field: "password",
        label: "password",
        ValidationMessage: validatePasswordMessage,
        type: "password"
    },
    {
        field: "newPassword",
        label: "New Password",
        ValidationMessage: validatePasswordMessage,
        type: "password"
    }
]

export const PasswordSettings = () => {
    const [formState, setFormState] = useState({
        password: {
            isValid: false,
            showError: false,
            value: ''
        },
        newPassword: {
            isValid: false,
            showError: false,
            value: ''
        }
    })

    const { changePassword } = useChangePassword();

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field] : {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, feild) => {

        let isValid = validatePassword(value)

        setFormState((prevState) => ({
            ...prevState,
            [field]:{
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const isSubmitButtonDisabled = !formState.password.isValid ||
    !formState.newPassword.isValid

    const handleFormSubmit = (event) => {
        event.preventDefault();
        changePassword(formState.password.value, formState.newPassword.value)
    }

    return (
        <form className="settings-form">
            {inputs.map((input) => (
                <Input
                    key={input.field}
                    field={input.field}
                    label={input.label}
                    value={formState[input.field].value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState[input.field].showError}
                    validateMessage={input.validateMessage}
                    type={input.type}
                    textarea={input.textarea}
                />
            ))}
            <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
                Actualizar contraseña
            </button>
        </form>
    )
}