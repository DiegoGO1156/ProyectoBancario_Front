import { useState } from "react";
import { Input } from './Input';
import {
    emailValidationMessage,
    validateEmail,
    validatePasswordMessage,
    validatePassword
} from '../shared/validators';
import { useLogin } from '../shared/hooks'

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        login(formState.email.value, formState.password.value);
    }

    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EAE3D8]">
            <form onSubmit={handleLogin} className="bg-white shadow-xl rounded-2xl px-10 py-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-[#4B5B6A] mb-6 text-center">Iniciar Sesión</h2>
                <Input
                    field='email'
                    label='Correo Electrónico'
                    value={formState.email.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.email.showError}
                    validationMessage={emailValidationMessage}
                />
                <Input
                    field='password'
                    label='Contraseña'
                    value={formState.password.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.password.showError}
                    validationMessage={validatePasswordMessage}
                />
                <button
                    type="submit"
                    disabled={isSubmitButtonDisable}
                    className={`w-full mt-6 py-3 text-white font-semibold rounded-lg transition duration-300 ${
                        isSubmitButtonDisable ? 'bg-[#71A9CE] cursor-not-allowed' : 'bg-[#00A2C1] hover:bg-[#2FB9C7]'}
                    `}
                >
                    {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
                <p className="mt-4 text-center text-sm text-[#4B5B6A]">
                    ¿No tienes cuenta?{' '}
                    <span
                        onClick={switchAuthHandler}
                        className="text-[#1C4E88] font-semibold cursor-pointer hover:underline"
                    >
                        Regístrate aquí
                    </span>
                </p>
            </form>
        </div>
    );
} 
