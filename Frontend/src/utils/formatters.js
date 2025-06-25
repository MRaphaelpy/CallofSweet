
export const formatCreditCard = (value) => {
  if (!value) return "";

  
  const digits = value.replace(/\D/g, "");

  
  const limitedDigits = digits.substring(0, 16);

  
  let formatted = "";
  for (let i = 0; i < limitedDigits.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += " ";
    }
    formatted += limitedDigits[i];
  }

  return formatted;
};

export const formatExpiryDate = (value) => {
  if (!value) return "";

  
  const digits = value.replace(/\D/g, "");

  
  const limitedDigits = digits.substring(0, 4);

  
  if (limitedDigits.length > 2) {
    return `${limitedDigits.substring(0, 2)}/${limitedDigits.substring(2)}`;
  } else {
    return limitedDigits;
  }
};

export const formatCPF = (value) => {
  if (!value) return "";

  
  const digits = value.replace(/\D/g, "");

  
  const limitedDigits = digits.substring(0, 11);

  
  let formatted = "";
  for (let i = 0; i < limitedDigits.length; i++) {
    if (i === 3 || i === 6) {
      formatted += ".";
    } else if (i === 9) {
      formatted += "-";
    }
    formatted += limitedDigits[i];
  }

  return formatted;
};

export const formatPhone = (value) => {
  if (!value) return "";

  
  const digits = value.replace(/\D/g, "");

  
  const limitedDigits = digits.substring(0, 11);

  
  if (limitedDigits.length > 0) {
    let formatted = `(${limitedDigits.substring(0, 2)}`;

    if (limitedDigits.length > 2) {
      formatted += `) ${limitedDigits.substring(
        2,
        limitedDigits.length >= 7 ? 7 : limitedDigits.length
      )}`;

      if (limitedDigits.length > 7) {
        formatted += `-${limitedDigits.substring(7)}`;
      }
    }

    return formatted;
  }

  return limitedDigits;
};

export const formatZipCode = (value) => {
  if (!value) return "";

  
  const digits = value.replace(/\D/g, "");

  
  const limitedDigits = digits.substring(0, 8);

  
  if (limitedDigits.length > 5) {
    return `${limitedDigits.substring(0, 5)}-${limitedDigits.substring(5)}`;
  }

  return limitedDigits;
};

export const formatCurrency = (value, locale = "pt-BR", currency = "BRL") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};
