export const validateCompany = (company) => {
    const regex = /^\S{6,25}$/;
    return regex.test(company);
}

export const validateCompanyMessage = 'El nombre de la compañia debe tener entre 6 y 25 caracteres y no debe contener espacios';