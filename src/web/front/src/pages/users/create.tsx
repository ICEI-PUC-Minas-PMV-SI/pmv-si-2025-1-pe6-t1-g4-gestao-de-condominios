import { useForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  FormHelperText,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import dayjs from "dayjs";

export const UserCreate = () => {
  const {
    refineCore: { formLoading },
    register,
    control,
    saveButtonProps,
    formState: { errors },
  } = useForm();

  // const { data: condominiumsData, isLoading: condominiumsLoading, error: condominiumsError } = useList({
  //   resource: "condominiums"
  // });
  const { data: apartmentsData, isLoading: apartmentsLoading, error: apartmentsError } = useList({
    resource: "apartments"
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
          helperText={typeof errors.name?.message === 'string' ? errors.name?.message : ''}
        />
 
        <TextField
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido",
            },
          })}
          label="Email"
          type="email"
          helperText={typeof errors.email?.message === 'string' ? errors.email.message : ''}
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
              helperText={typeof errors.password?.message === 'string' ? errors.password.message : ''}
              error={!!errors.password}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          rules={{
            pattern: {
              value: /^\(\d{2}\) \d{5}-\d{4}$/,
              message: "Telefone inválido",
            },
          }}
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
          rules={{
            validate(value) {
              if (value) {
                const minDate = dayjs().subtract(18, "year");
                const selectedDate = dayjs(value);

                // Validar se a data não é no futuro
                if (selectedDate.isAfter(dayjs())) {
                  return "Data futura não permitida";
                }

                if (selectedDate.isAfter(minDate)) {
                  return "Usuário deve ter pelo menos 18 anos";
                }

              }
              return true;
            }
          }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                label="Data de Nascimento"
                value={field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    helperText: typeof errors.birthDate?.message === 'string' ? errors.birthDate.message : '',
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
          <Controller
            name="profile"
            control={control}
            rules={{
              required: 'Perfil é obrigatório',
            }}
            render={({ field }) => (
              <Select labelId="profile-label" label="Perfil" {...field}>
                <MenuItem key="RESIDENT" value="RESIDENT">Residente</MenuItem>
                <MenuItem key="MANAGER" value="MANAGER">Síndico</MenuItem>
                <MenuItem key="ADMIN" value="ADMIN">Administrador</MenuItem>
              </Select>
            )}
          />
          {errors.profile && (
            <FormHelperText>{typeof errors.profile.message === 'string' ? errors.profile.message : ''}</FormHelperText>
          )}
        </FormControl>

        {/* <FormControl fullWidth error={!!errors.condominiumId}>
          <InputLabel id="condominium-label">Condomínio</InputLabel>
          <Controller
            name="condominiumId"
            control={control}
            rules={{
              required: 'Condomínio é obrigatório',
            }}
            render={({ field }) => (
              <Select labelId="condominium-label" label="Condomínio" {...field}>
                {condominiumsLoading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : condominiumsError ? (
                  <MenuItem disabled>Error loading options</MenuItem>
                ) : (
                  condominiumsData?.data.map((item: any) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            )}
          />
          {errors.condominiumId && (
            <FormHelperText>{typeof errors.condominiumId.message === 'string' ? errors.condominiumId.message : ''}</FormHelperText>
          )}
        </FormControl> */}
        <FormControl fullWidth error={!!errors.apartmentId}>
          <InputLabel id="apartment-label">Apartamento</InputLabel>
          <Controller
            name="apartmentId"
            control={control}
            rules={{
              // required: 'Condomínio é obrigatório',
            }}
            render={({ field }) => (
              <Select labelId="apartment-label" label="Apartamento" {...field}>
                {apartmentsLoading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : apartmentsError ? (
                  <MenuItem disabled>Error loading options</MenuItem>
                ) : (
                  apartmentsData?.data.map((item: any) => {
                    return <MenuItem key={item.id} value={item.id}>
                      {`Bloco: ${item.block} | Andar: ${item.floor} | Nº ${item.number}`}
                    </MenuItem>
                  })
                )}
              </Select>
            )}
          />
          {errors.apartmentId && (
            <FormHelperText>{typeof errors.apartmentId.message === 'string' ? errors.apartmentId.message : ''}</FormHelperText>
          )}
        </FormControl>
      </Box>
    </Create>
  );
};
