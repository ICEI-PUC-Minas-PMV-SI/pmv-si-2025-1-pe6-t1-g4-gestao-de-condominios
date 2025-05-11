import React from "react";
import { useList, useSelect } from "@refinedev/core";
import {
  Edit,
} from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Box,
  Grid,
  TextField as MuiTextField,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  Checkbox,
  InputLabel,
} from "@mui/material";

export const FeeEdit: React.FC = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    control,
    register,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: undefined,
  });

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

  const feeRecord = queryResult?.data?.data;

  useEffect(() => {
    if (feeRecord) {
      reset({
        ...feeRecord,
        due: feeRecord.due ? dayjs(feeRecord.due) : null, 
        condominiumId: feeRecord?.condominium?.id ?? "",
      });
    }
  }, [feeRecord, reset]);
  
  const { data: condominiumsData, isLoading: condominiumsLoading, error: condominiumsError } = useList({
    resource: "condominiums"
  });

  return (
    <Edit title="Editar Taxa" saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel id="type-label">Tipo</InputLabel>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                defaultValue={feeRecord?.type ? feeRecord.type : ""}
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
                defaultValue={dayjs()}
                rules={{ required: "Campo obrigatório" }}
                render={({ field: { onChange, value } }) => (
              
                    <DatePicker
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
                <FormControlLabel control={<Checkbox {...register("isRecurrent")}   />} label="Recorrente" />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
        <FormControl fullWidth error={!!errors.condominiumId}>
          <InputLabel id="condominium-label">Condomínio</InputLabel>
          <Controller
            defaultValue={feeRecord?.condominium ? feeRecord.condominium.id : ""}
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
        </Grid>
      </Box>
    </Edit>
  );
};
