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

export const FeeCreate: React.FC = () => {

  const { data, isLoading, error } = useList({
    resource: "condominiums"
  });

  const {
    saveButtonProps,
    control,
    register,
    formState: { errors },
  } = useForm();

  const type = [
    {
      value: 'RENT',
      label: 'Aluguel'
    },
    {
      value: 'CONDOMINIUM',
      label: 'Condomínio'
    },
    {
      value: 'OTHER',
      label: 'Outro'
    },
  ];

  return (
    <Create title="Cadastrar Taxa" saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel id="type-label">Tipo</InputLabel>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <Select
                    labelId="type-label"
                    label="Tipo"
                    {...field}
                  >
                    {type.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.type && (
                <FormHelperText>{typeof errors.type.message === 'string' ? errors.type.message : ''}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              label="Nome"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("name", { required: "Campo obrigatório" })}
              error={!!errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="due"
              control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Vencimento"
                  value={value}
                  onChange={(date) => {
                    onChange(date);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.due
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormGroup>
                <FormControlLabel control={<Checkbox {...register("isRecurrent")} />} label="Recorrente" />
              </FormGroup>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
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
                    {isLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : error ? (
                      <MenuItem disabled>Error loading options</MenuItem>
                    ) : (
                      data?.data.map((item: any) => (
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
          </Grid> */}

        </Grid>
      </Box>
    </Create>
  );
};
