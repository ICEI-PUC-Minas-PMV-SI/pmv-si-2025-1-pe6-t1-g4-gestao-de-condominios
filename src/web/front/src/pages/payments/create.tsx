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
  FormControl,
  Select,
  FormHelperText,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";

export const PaymentCreate: React.FC = () => {

  const {
    saveButtonProps,
    control,
    register,
    formState: { errors },
  } = useForm();

  const { data: usersData, isLoading: usersLoading, error: usersError } = useList({
    resource: "users",
    meta: {
      condominiumId: 'CURRENT',
    },
  });
  const { data: apartmentsData, isLoading: apartmentsLoading, error: apartmentsError } = useList({
    resource: "apartments"
  });
  const { data: feesData, isLoading: feesLoading, error: feesError } = useList({
    resource: "fees"
  });

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
                    format="DD/MM/YYYY"
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
                      apartmentsData.data.map((item: any) => (
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
              <InputLabel id="user-label">Usuário</InputLabel>
              <Controller
                name="userId"
                control={control}
                rules={{
                  required: 'Usuário é obrigatório',
                }}
                render={({ field }) => (
                  <Select labelId="user-label" label="Usuário" {...field}>
                    {usersLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : usersError ? (
                      <MenuItem disabled>Error loading options</MenuItem>
                    ) : (
                      usersData.data.map((item: any) => (
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
                      feesData.data.map((item: any) => (
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

