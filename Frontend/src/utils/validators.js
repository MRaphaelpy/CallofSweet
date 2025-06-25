
export const validateCreditCard = (number) => {
  
  const digits = number.replace(/\D/g, "");

  
  if (digits.length < 13 || digits.length > 19) return false;

  
  let sum = 0;
  let shouldDouble = false;

  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const validateExpiryDate = (expiry) => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

  const [month, year] = expiry.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; 
  const currentMonth = currentDate.getMonth() + 1; 

  const expiryMonth = parseInt(month, 10);
  const expiryYear = parseInt(year, 10);

  if (expiryMonth < 1 || expiryMonth > 12) return false;

  
  if (expiryYear < currentYear) return false;
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false;

  return true;
};

export const validateCvv = (cvv) => {
  
  return /^\d{3,4}$/.test(cvv);
};

export const validateCPF = (cpf) => {
  
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  
  if (/^(\d)\1+$/.test(cpf)) return false;

  
  let sum = 0;
  let remainder;

  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  
  return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(phone);
};

export const validateZipCode = (zipCode) => {
  
  return /^\d{5}-\d{3}$/.test(zipCode);
};
