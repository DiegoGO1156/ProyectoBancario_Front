export const validateDpi = (dpi) => {
    const regex = /^\S{13}$/;
    return regex.test(dpi);
}

export const validateDpiMessage = 'El dpi debe tener 12 caracteres y no debe contener espacios';