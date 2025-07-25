export const validateIncome = (income) => {
    const regex = /^\S{2,8}$/;
    return regex.test(income);
}

export const validateIncomeMessage = 'El ingreso debe ser entre 100 y 8000, no debe contener espacios';