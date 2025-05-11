import React from "react";
import {
  Create,
} from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  Box,
  TextField as MuiTextField,
  FormControlLabel,
  FormGroup,
  FormControl,
  Select,
  FormHelperText,
  InputLabel,
  MenuItem,
  Checkbox,
  Grid,
} from "@mui/material";

export const PaymentCreate: React.FC = () => {

  const {
    saveButtonProps,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const condominiumId = watch("condominiumId");
  const apartmentId = watch("apartmentId");

  const { data: condominiumsData, isLoading: condominiumsLoading, error: condominiumsError } = useList({
    resource: "condominiums"
  });
  const { data: apartmentsData, isLoading: apartmentsLoading, error: apartmentsError } = useList({
    resource: "apartments"
  });
  const { data: usersData, isLoading: usersLoading, error: usersError } = useList({
    resource: "users",
  });
  const { data: feesData, isLoading: feesLoading, error: feesError } = useList({
    resource: "fees"
  });

  const filteredUsers = React.useMemo(() => {
    if (!condominiumId || !usersData?.data) {
      return [];
    }
    return usersData.data.filter((user: any) => {
      const matchesCondominium = user.condominiumId === condominiumId;
      return matchesCondominium;
    });
  }, [condominiumId, usersData]);

  const filteredFees = React.useMemo(() => {
    if (!condominiumId || !feesData?.data) {
      return [];
    }
    return feesData.data.filter((fee: any) => fee.condominiumId === condominiumId);
  }, [condominiumId, feesData]);

  const filteredApartments = React.useMemo(() => {
    if (!condominiumId || !apartmentsData?.data) {
      return [];
    }
    return apartmentsData.data.filter((apartment: any) => apartment.condominiumId === condominiumId);
  }, [condominiumId, apartmentsData]);

  return (
    <Create title="Cadastrar Pagamento" saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              type="amount"
              label="Valor"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("amount", { required: "Campo obrigatório", valueAsNumber: true })}
              error={!!errors.amount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="paymentDate"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    label="Data de Pagamento"
                    value={value}
                    onChange={(date) => {
                      onChange(date);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.paymentDate,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.condominiumId}>
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
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.apartmentId}>
              <InputLabel id="apartment-label">Apartamento</InputLabel>
              <Controller
                name="apartmentId"
                control={control}
                rules={{
                  required: 'Apartamento é obrigatório',
                }}
                render={({ field }) => (
                  <Select labelId="apartment-label" label="Apartamento" {...field}>
                    {apartmentsLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : apartmentsError ? (
                      <MenuItem disabled>Error loading options</MenuItem>
                    ) : (
                      filteredApartments.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.block} - {item.number}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
              {errors.apartmentId && (
                <FormHelperText>{typeof errors.apartmentId.message === 'string' ? errors.apartmentId.message : ''}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.userId}>
              <InputLabel id="user-label">Condômino</InputLabel>
              <Controller
                name="userId"
                control={control}
                rules={{
                  required: 'Usuário é obrigatório',
                }}
                render={({ field }) => (
                  <Select labelId="user-label" label="Condômino" {...field}>
                    {usersLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : usersError ? (
                      <MenuItem disabled>Error loading options</MenuItem>
                    ) : (
                      filteredUsers.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
              {errors.userId && (
                <FormHelperText>{typeof errors.userId.message === 'string' ? errors.userId.message : ''}</FormHelperText>
              )}
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.feeId}>
              <InputLabel id="fee-label">Taxa</InputLabel>
              <Controller
                name="feeId"
                control={control}
                rules={{
                  required: 'Taxa é obrigatória',
                }}
                render={({ field }) => (
                  <Select labelId="fee-label" label="Taxa" {...field}>
                    {feesLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : feesError ? (
                      <MenuItem disabled>Error loading options</MenuItem>
                    ) : (
                      filteredFees.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
              {errors.feeId && (
                <FormHelperText>{typeof errors.feeId.message === 'string' ? errors.feeId.message : ''}</FormHelperText>
              )}
            </FormControl>
          </Grid>

        </Grid>
      </Box>
    </Create>
  );
};

