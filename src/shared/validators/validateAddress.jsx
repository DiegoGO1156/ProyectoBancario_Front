export const validateAddress = (address) => {
    const regex = /^\S{6,12}$/;
    return regex.test(address);
}

export const validateAddressMessage = 'La direccion debe tener entre 6 y 12 caracteres y no debe contener espacios';