import { useState } from "react";
import { Label } from "./ui/label";
import { MotionInput } from "./ui/input";
import { cn } from "./ui/lib/utils";
import { Banco } from './Banco'
import { ThreeDMarquee } from "./ui/3d-marquee";
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

    const images = [
        "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
        "https://assets.aceternity.com/animated-modal.png",
        "https://assets.aceternity.com/animated-testimonials.webp",
        "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
        "https://s1.elespanol.com/2025/07/11/actualidad/1003743843949_257211307_1024x576.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdaHQ5VLJgzCGPVYbVAM-tJtOWfjdB_EguWw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZjoZVh5lSz1_vtj0EwUpeT9trps0khGp_uw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToRgPI99vGiB3TIEmJQmttV83kvCoblQOgrA&s",
        "https://assets.aceternity.com/hero-highlight.png",
        "https://assets.aceternity.com/carousel.webp",
        "https://assets.aceternity.com/placeholders-and-vanish-input.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAhgpU-NgcmE9_EY-uwPkG7j8nNgXdAKkBsQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcN0VEbOws9ONVXlybtldjDzFAX3GHR_a_zA&s",
        "https://cdn-blog.superprof.com/blog_uy/wp-content/uploads/2024/08/la-bolsa.jpg",
        "https://incae.edu/wp-content/uploads/2023/10/economia_mundial.jpg",
        "https://ekosnegocios.com/image/posts/September2023/KvsM7ymSSMvKYXPpNnA5.png",
        "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
        "https://assets.aceternity.com/tabs.png",
        "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
        "https://www.bbva.com/wp-content/uploads/2020/08/BBVA-Argentina-TorreBBVA-04_opt.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4LVKbMRDDAYQkLBWww_CFUb4C5Gq91ovTxA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTppq3DW8iBP1MdsUJLVy9zstdvgyr4Lm35KQ&s",
        "https://archello.com/thumbs/images/2022/01/28/ghafari-associates-northpointe-bank-operations-center-banks-archello.1643390901.9952.jpg?fit=crop&w=407&h=267&auto=compress",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdbChdNN7auO_a6ndOwQvUAj6q4p9NzlQJzs4tUZ4L-u_lhmJwbM9NXPQAJJV4Eh5aRc&usqp=CAU",
        "https://assets.aceternity.com/macbook-scroll.png",
        "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
        "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
        "https://assets.aceternity.com/multi-step-loader.png",
        "https://concepto.de/wp-content/uploads/2018/02/economia-min-800x438.jpeg",
        "https://www.bbva.com.ar/content/dam/public-web/argentina/images/Empresas_novedad_3.im1749565674333im.jpg?imwidth=1600",
        "https://assets.aceternity.com/world-map.webp",
    ];

    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid;

    return (
        <div className="relative bg-[#162456] min-h-screen flex items-center justify-center overflow-hidden">

            <div className="relative mx-auto my-10 flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-3xl">
                <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
                    ¡Donde los sueños se hacen{" "}
                    <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
                        realidad

                    </span>{" "}
                    Sin límites!.
                </h2>
                <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
                    Este banco esta enfocado en hacer la diferencia,
                    somos la mejor manera de realizar operaciones bancarias.
                    Estamos centrados en hacer realidad los sueños.
                </p>

                <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
                <ThreeDMarquee
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    images={images}
                />
            </div>

            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ml-9">
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

                    <p className="mt-4 text-sm text-center text-[#1C4E88] cursor-pointer hover:underline" onClick={switchAuthHandler}>
                        Already have an account? Sign in
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
