import { useState } from 'react';
import { Input } from './Input';
import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirPassword,
    validateAddress,
    validateCompany,
    validateDpi,
    validateIncome,
    validatePhone,
    validateUsernameMessage,
    emailValidationMessage,
    validatePasswordMessage,
    passwordConfirmationMessage,
    validateAddressMessage,
    validateCompanyMessage,
    validateDpiMessage,
    validateIncomeMessage,
    validatePhoneMessage
} from '../shared/validators'
import { useRegister } from '../shared/hooks'

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        name: { value: '', isValid: false, showError: false },
        email: { value: '', isValid: false, showError: false },
        username: { value: '', isValid: false, showError: false },
        dpi: { value: '', isValid: false, showError: false },
        address: { value: '', isValid: false, showError: false },
        phone: { value: '', isValid: false, showError: false },
        password: { value: '', isValid: false, showError: false },
        passwordConfir: { value: '', isValid: false, showError: false },
        companyName: { value: '', isValid: false, showError: false },
        income: { value: '', isValid: false, showError: false },
    });

    const handleInputValueChange = (value, field) => {
        setFormState(prev => ({
            ...prev,
            [field]: { ...prev[field], value }
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'email': isValid = validateEmail(value); break;
            case 'username': isValid = validateUsername(value); break;
            case 'dpi': isValid = validateDpi(value); break;
            case 'address': isValid = validateAddress(value); break;
            case 'phone': isValid = validatePhone(value); break;
            case 'password': isValid = validatePassword(value); break;
            case 'passwordConfir': isValid = validateConfirPassword(formState.password.value, value); break;
            case 'companyName': isValid = validateCompany(value); break;
            case 'income': isValid = validateIncome(value); break;
            default: break;
        }
        setFormState(prev => ({
            ...prev,
            [field]: { ...prev[field], isValid, showError: !isValid }
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        register(
            formState.email.value,
            formState.password.value,
            formState.username.value,
            formState.dpi.value,
            formState.address.value,
            formState.phone.value,
            formState.companyName.value,
            formState.income.value
        );
    };

    const isSubmitButtonDisable =
        isLoading ||
        !formState.email.isValid ||
        !formState.password.isValid ||
        !formState.username.isValid ||
        !formState.dpi.isValid ||
        !formState.address.isValid ||
        !formState.phone.isValid ||
        !formState.companyName.isValid ||
        !formState.income.isValid ||
        !formState.passwordConfir.isValid;

    return (
        <div className="min-h-screen bg-[#EAE3D8] flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
                <h2 className="text-4xl font-bold text-[#4B5B6A] mb-9 text-center">Create Account</h2>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-7" onSubmit={handleRegister}>
                    <Input 
                        field="name" 
                        label="Name" 
                        value={formState.name.value} 
                        onChangeHandler={handleInputValueChange}
                        type="text" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.email.showError}
                        validationMessage={emailValidationMessage} 
                    />
                    <Input 
                        field="email" 
                        label="Email" 
                        value={formState.email.value} 
                        onChangeHandler={handleInputValueChange}
                        type="text" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.email.showError}
                        validationMessage={emailValidationMessage} 
                    />
                    <Input 
                        field="username" 
                        label="Username" 
                        value={formState.username.value} 
                        onChangeHandler={handleInputValueChange}
                        type="text" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.username.showError}
                        validationMessage={validateUsernameMessage} 
                    />
                    <Input 
                        field="dpi" 
                        label="DPI" 
                        value={formState.dpi.value} 
                        onChangeHandler={handleInputValueChange}
                        type="text" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.dpi.showError}
                        validationMessage={validateDpiMessage} 
                    />
                    <Input 
                        field="address" 
                        label="Address" 
                        value={formState.address.value} 
                        onChangeHandler={handleInputValueChange}
                        type="text" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.address.showError}
                        validationMessage={validateAddressMessage} 
                    />
                    <Input 
                        field="phone" 
                        label="Phone" 
                        value={formState.phone.value} 
                        onChangeHandler={handleInputValueChange}
                        type="text" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.phone.showError}
                        validationMessage={validatePhoneMessage} />
                    <Input 
                        field="password" 
                        label="Password" 
                        value={formState.password.value} 
                        onChangeHandler={handleInputValueChange}
                        type="password" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.password.showError}
                        validationMessage={validatePasswordMessage} 
                    />
                    <Input 
                        field="passwordConfir" 
                        label="Confirm Password" 
                        value={formState.passwordConfir.value}
                        onChangeHandler={handleInputValueChange} 
                        type="password" 
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.passwordConfir.showError} 
                        validationMessage={passwordConfirmationMessage} 
                    />
                    <Input 
                        field="companyName" 
                        label="CompanyName" 
                        value={formState.companyName.value} 
                        onChangeHandler={handleInputValueChange}
                        type="text" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.company.showError}
                        validationMessage={validateCompanyMessage} 
                    />
                    <Input 
                        field="income" 
                        label="Income" 
                        value={formState.income.value} 
                        onChangeHandler={handleInputValueChange}
                        type="text" 
                        onBlurHandler={handleInputValidationOnBlur} 
                        showErrorMessage={formState.income.showError}
                        validationMessage={validateIncomeMessage} 
                    />

                    <div className="col-span-full">
                        <button
                            type="submit"
                            disabled={isSubmitButtonDisable}
                            className={`w-full py-3 mt-4 text-white font-semibold rounded-lg transition duration-300
                                ${isSubmitButtonDisable
                                    ? 'bg-[#71A9CE] cursor-not-allowed'
                                    : 'bg-[#00A2C1] hover:bg-[#2FB9C7]'}`}
                        >
                            Register
                        </button>
                        <p className="mt-4 text-sm text-center text-[#1C4E88] cursor-pointer hover:underline" onClick={switchAuthHandler}>
                            Already have an account? Sign in
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}