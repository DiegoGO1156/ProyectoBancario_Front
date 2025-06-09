import { useState } from "react";
import { Label } from "./ui/label";
import { MotionInput } from "./ui/input";
import { cn } from "./ui/lib/utils";
import { Banco } from './Banco'
import { Spotlight } from "../components/ui/spotlight-new"
import {
    IconBrandGithub,
    IconBrandGoogle,
} from "@tabler/icons-react";
import {
    emailValidationMessage,
    validateEmail,
    validatePasswordMessage,
    validatePassword
} from '../shared/validators';
import { useLogin } from '../shared/hooks'

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

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

                <form onSubmit={handleSubmit} className="my-8">
        
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email</Label>
                            <MotionInput id="email" placeholder="projectmayhem@fc.com"
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
                            <Label htmlFor="password">Password</Label>
                            <MotionInput id="password" placeholder="••••••••"
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
                        <button onClick={handleLogin} disabled={isSubmitButtonDisable}
                            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                            type="submit">
                            Sign on &rarr;
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
                            </div>
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
