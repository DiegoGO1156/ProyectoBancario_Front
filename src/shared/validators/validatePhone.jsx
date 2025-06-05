export const validatePhone = (phone) => {
    const regex = /^\S{8}$/;
    return regex.test(phone);
}

export const validatePhoneMessage = 'El numero de telefono debe tener 8 caracteres y no debe contener espacios';