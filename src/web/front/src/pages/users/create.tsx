import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

export const UserCreate = () => {
  const {
    refineCore: { formLoading },
    register,
    control,
    saveButtonProps,
    formState: { errors },
  } = useForm();

  const { options: condominiumOptions } = useSelect({
    resource: "condominiums",
    optionLabel: "name"
  });
  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      >
        <TextField
          {...register("name", { required: "Nome é obrigatório" })}
          label="Nome"
          error={!!errors.name}
        />

        <TextField
          {...register("email", { required: "Email é obrigatório" })}
          label="Email"
          type="email"
          error={!!errors.email}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Senha é obrigatória" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Senha"
              type="password"
              error={!!errors.password}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputMask mask="(99) 99999-9999" {...field}>
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  label="Telefone"
                  type="tel"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            </InputMask>
          )}
        />

        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                label="Data de Nascimento"
                value={field.value}
                onChange={field.onChange}
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

        <FormControl fullWidth error={!!errors.profile}>
          <InputLabel id="profile-label">Perfil</InputLabel>
          <Select
            {...register("profile", { required: "Perfil é obrigatório" })}
            labelId="profile-label"
            defaultValue=""
          >
            <MenuItem value="RESIDENT">Residente</MenuItem>
            <MenuItem value="MANAGER">Síndico</MenuItem>
            <MenuItem value="ADMIN">Administrador</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth error={!!errors.condominiumId}>
          <InputLabel id="condominium-label">Condomínio</InputLabel>
          <Select
            {...register("condominiumId")}
            labelId="condominium-label"
            defaultValue=""
          >
            {condominiumOptions.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Create>
  );
};
