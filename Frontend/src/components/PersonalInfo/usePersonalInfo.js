
import { useState } from "react";

const usePersonalInfo = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [userData, setUserData] = useState({
    name: "Ana Silva",
    email: "ana.silva@email.comm",
    phone: "(11) 98765-4321",
    birthday: "1990-05-15",
  });
  const [tempUserData, setTempUserData] = useState({ ...userData });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUserData({
      ...tempUserData,
      [name]: value,
    });

    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null,
      });
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: "A imagem não deve exceder 5MB",
          severity: "error",
        });
        return;
      }

      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!tempUserData.name.trim()) {
      errors.name = "Nome é obrigatório";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempUserData.email)) {
      errors.email = "Email inválido";
    }

    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    if (!phoneRegex.test(tempUserData.phone)) {
      errors.phone = "Telefone inválido. Formato: (XX) XXXXX-XXXX";
    }

    if (!tempUserData.birthday) {
      errors.birthday = "Data de nascimento é obrigatória";
    } else {
      const birthDate = new Date(tempUserData.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (isNaN(birthDate.getTime())) {
        errors.birthday = "Data inválida";
      } else if (age < 18) {
        errors.birthday = "É necessário ter pelo menos 18 anos";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Verifique os campos com erro antes de salvar",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    
    setTimeout(() => {
      setUserData({ ...tempUserData });
      setEditing(false);
      setLoading(false);
      setSnackbar({
        open: true,
        message: "Dados atualizados com sucesso!",
        severity: "success",
      });
    }, 800);
  };

  const handleCancel = () => {
    setTempUserData({ ...userData });
    setAvatarPreview(null);
    setAvatarFile(null);
    setEditing(false);
    setValidationErrors({});
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return {
    editing,
    setEditing,
    loading,
    snackbar,
    userData,
    tempUserData,
    avatarFile,
    avatarPreview,
    validationErrors,
    handleChange,
    handleAvatarChange,
    handleSubmit,
    handleCancel,
    handleSnackbarClose,
  };
};

export default usePersonalInfo;
