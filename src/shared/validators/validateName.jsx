export const validateName = (name) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(name);
}

export const nameValidationMessage = 'Por favor ingresa su primer nombre';