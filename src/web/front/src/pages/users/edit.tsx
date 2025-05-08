import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  FormControlLabel,
  Switch,
  FormHelperText
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { useEffect } from "react";

export const UserEdit = () => {
  const {
    refineCore: { formLoading, queryResult },
    control,
    saveButtonProps,
    formState: { errors },
    reset
  } = useForm({
    refineCoreProps: {
      redirect: "list",
    },
  });

  const userRecord = queryResult?.data?.data;

  // Reset the form with user data when it's loaded
  useEffect(() => {
    if (userRecord) {
      reset({
        ...userRecord,
        birthDate: userRecord.birthDate ? dayjs(userRecord.birthDate) : null
      });
    }
  }, [userRecord, reset]);

  const { options: condominiumOptions } = useSelect({
    resource: "condominiums",
    optionLabel: "name",
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Nome é obrigatório" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome"
              error={!!errors.name}
              fullWidth
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email é obrigatório" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={!!errors.email}
              fullWidth
            />
          )}
        />

         <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nova Senha (deixe em branco para manter a senha atual)"
              type="password"
              error={!!errors.password}
              fullWidth
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Telefone"
              type="tel"
              inputProps={{
                maxLength: 15,
                placeholder: "(XX) XXXXX-XXXX"
              }}
              error={!!errors.phone}
              fullWidth
            />
          )}
        />

        <Controller
          name="birthDate"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                label="Data de Nascimento"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.birthDate,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          name="profile"
          control={control}
          rules={{ required: "Perfil é obrigatório" }}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.profile}>
              <InputLabel id="profile-label">Perfil</InputLabel>
              <Select
                {...field}
                labelId="profile-label"
              >
                <MenuItem value="RESIDENT">Residente</MenuItem>
                <MenuItem value="MANAGER">Síndico</MenuItem>
                <MenuItem value="ADMIN">Administrador</MenuItem>
              </Select>
              {errors.profile && (
                <FormHelperText>{typeof errors.profile.message === 'string' ? errors.profile.message : ''}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="condominiumId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.condominiumId}>
              <InputLabel id="condominium-label">Condomínio</InputLabel>
              <Select
                {...field}
                labelId="condominium-label"
              >
                {condominiumOptions.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {errors.condominiumId && (
                <FormHelperText>{typeof errors.condominiumId.message === 'string' ? errors.condominiumId.message : ''}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="isActive"
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value, ref } }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={!!value}
                  onChange={(e) => onChange(e.target.checked)}
                  inputRef={ref}
                />
              }
              label="Usuário Ativo"
            />
          )}
        />
      </Box>
    </Edit>
  );
};