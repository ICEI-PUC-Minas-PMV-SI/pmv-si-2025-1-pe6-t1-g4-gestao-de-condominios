import { useForm } from "@refinedev/react-hook-form";
import { useList, useSelect } from "@refinedev/core";
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
import InputMask from "react-input-mask";
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
        // condominiumId: userRecord?.condominium?.id ?? "",
        apartmentId: userRecord?.apartment?.id ?? "",
        birthDate: userRecord.birthDate ? dayjs(userRecord.birthDate) : null
      });
    }
  }, [userRecord, reset]);

  // const { data: condominiumsData, isLoading: condominiumsLoading, error: condominiumsError } = useList({
  //   resource: "condominiums"
  // });

  const { data: apartmentsData, isLoading: apartmentsLoading, error: apartmentsError } = useList({
    resource: "apartments"
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

        <FormControl fullWidth error={!!errors.profile}>
          <InputLabel id="profile-label">Perfil</InputLabel>
          <Controller
            name="profile"
            control={control}
            defaultValue={userRecord?.profile ? userRecord.profile : ""}
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
            defaultValue={userRecord?.condominium ? userRecord.condominium.id : ""}
            name="condominiumId"
            control={control}

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
            defaultValue={userRecord.apartment?.id ? userRecord.apartment?.id : ''}
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