import React from "react";
import {
  Create,
} from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import { Controller } from "react-hook-form";
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
    resource: "condominiums", // replace with your endpoint resource name
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
      label: 'RENT',
    },
    {
      value: 'CONDOMINIUM',
      label: 'CONDOMINIUM',
    },
    {
      value: 'OTHER',
      label: 'OTHER',
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
              {...register("name", { required: "Campo obrigatório" })}
              error={!!errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              label="Vencimento"
              {...register("due", { required: "Campo obrigatório" })}
              error={!!errors.due}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormGroup>
                <FormControlLabel control={<Checkbox {...register("isRecurrent", { required: "Campo obrigatório" })} defaultChecked  />} label="Recorrente" />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.condominiumId}>
              <InputLabel id="condominium-label">Condomínio</InputLabel>
              <Controller
                name="condominiumId"
                control={control}
                
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
          </Grid>

        </Grid>
      </Box>
    </Create>
  );
};
