"use client";
import { useState } from 'react';
import React from "react";
import { Label } from "./ui/label";
import { MotionInput  } from "./ui/input";
import { cn } from "./ui/lib/utils";
import { Banco } from './Banco'
import { Spotlight } from "../components/ui/spotlight-new"
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import {
    validateName,
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirPassword,
    validateAddress,
    validateCompany,
    validateDpi,
    validateIncome,
    validatePhone,
    nameValidationMessage,
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
import { div } from 'motion/react-client';

export function Register({ switchAuthHandler }) {

    const { register, isLoading } = useRegister();

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    };

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
            case 'name': isValid = validateName(value); break;
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
            formState.name.value,//
            formState.email.value,//
            formState.password.value,//
            formState.username.value,//
            formState.dpi.value,//
            formState.address.value,
            formState.phone.value,//
            formState.companyName.value,
            formState.income.value
        );
    };

    const isSubmitButtonDisable =
        isLoading ||
        !formState.name.isValid ||
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
    <div className="relative bg-[#162456] min-h-screen flex items-center justify-center overflow-hidden">
    
    <div className="absolute inset-0 z-0">
      <Spotlight />
    </div>

    <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-10">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Spotlight <br /> which is not overused.
        </h1>
        <p className="mt-4 text-base text-neutral-300 max-w-md mx-auto md:mx-0">
          A subtle yet effective spotlight effect, because the previous version is used a bit too much these days.
        </p>
      </div>
    </div>

    <div className="flex-1 w-full max-w-md bg-[#162456] dark:bg-black shadow-input rounded-md p-6 md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <MotionInput  id="firstname" placeholder="Tyler"
                field="name" 
                label="Name" 
                value={formState.name.value} 
                onChangeHandler={handleInputValueChange}
                type="text" 
                onBlurHandler={handleInputValidationOnBlur} 
                validationMessage={nameValidationMessage}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <MotionInput  id="username" placeholder="Tyler20"
                field="username" 
                label="Username" 
                value={formState.username.value} 
                onChangeHandler={handleInputValueChange}
                type="text" 
                onBlurHandler={handleInputValidationOnBlur} 
                showErrorMessage={formState.username.showError}
                validationMessage={validateUsernameMessage} 
            />
          </LabelInputContainer>
        </div>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="dpi">DPI</Label>
            <MotionInput  id="dpi" placeholder="4025849530101"
                field="dpi" 
                label="DPI" 
                value={formState.dpi.value} 
                onChangeHandler={handleInputValueChange}
                type="text" 
                onBlurHandler={handleInputValidationOnBlur} 
                showErrorMessage={formState.dpi.showError}
                validationMessage={validateDpiMessage} 
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phone">Phone</Label>
            <MotionInput  id="phone" placeholder="4221-7005"
                field="phone" 
                label="Phone" 
                value={formState.phone.value} 
                onChangeHandler={handleInputValueChange}
                type="text" 
                onBlurHandler={handleInputValidationOnBlur} 
                showErrorMessage={formState.phone.showError}
                validationMessage={validatePhoneMessage} 
            />
          </LabelInputContainer>
        </div>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="company">Company</Label>
            <MotionInput  id="company" placeholder="example.C.A"
                field="companyName" 
                label="CompanyName" 
                value={formState.companyName.value} 
                onChangeHandler={handleInputValueChange}
                type="text" 
                onBlurHandler={handleInputValidationOnBlur} 
                validationMessage={validateCompanyMessage} 
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="income">income</Label>
            <MotionInput  id="income" placeholder="100.00"
                field="income" 
                label="Income" 
                value={formState.income.value} 
                onChangeHandler={handleInputValueChange}
                type="text" 
                onBlurHandler={handleInputValidationOnBlur} 
                showErrorMessage={formState.income.showError}
                validationMessage={validateIncomeMessage}  
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email</Label>
          <MotionInput  id="email" placeholder="projectmayhem@fc.com"
                field="email" 
                label="Email" 
                value={formState.email.value} 
                onChangeHandler={handleInputValueChange}
                type="text" 
                onBlurHandler={handleInputValidationOnBlur} 
                validationMessage={emailValidationMessage} 
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Address</Label>
          <MotionInput  id="address" placeholder="Guatemala-Example"
                field="address" 
                label="Address" 
                value={formState.address.value} 
                onChangeHandler={handleInputValueChange}
                type="text" 
                onBlurHandler={handleInputValidationOnBlur} 
                showErrorMessage={formState.address.showError}
                validationMessage={validateAddressMessage} 
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <MotionInput  id="password" placeholder="••••••••"
                field="password" 
                label="Password" 
                value={formState.password.value} 
                onChangeHandler={handleInputValueChange}
                type="password" 
                onBlurHandler={handleInputValidationOnBlur} 
                showErrorMessage={formState.password.showError}
                validationMessage={validatePasswordMessage}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="passwordConfir">Confirm Password</Label>
          <MotionInput  id="PasswordConfir" placeholder="••••••••"
                field="passwordConfir" 
                label="Confirm Password" 
                value={formState.passwordConfir.value}
                onChangeHandler={handleInputValueChange} 
                type="password" 
                onBlurHandler={handleInputValidationOnBlur}
                showErrorMessage={formState.passwordConfir.showError} 
                validationMessage={passwordConfirmationMessage} 
          />
        </LabelInputContainer>

        <button onClick={handleRegister} disabled={isSubmitButtonDisable}
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit">
                Sign up &rarr;
            <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
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

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
