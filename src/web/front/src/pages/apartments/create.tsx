import React from "react";
import {
  Create,
} from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
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
import { useList } from "@refinedev/core";


export const ApartmentCreate: React.FC = () => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm();

  const { data: condominiumsData, isLoading: condominiumsLoading, error: condominiumsError } = useList({
    resource: "condominiums"
  });

  return (
    <Create title="Cadastrar apartamento" saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              label="Bloco"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("block", { required: "Campo obrigatório" })}
              error={!!errors.block}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              label="Número"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("number", { required: "Campo obrigatório", valueAsNumber: true })}
              error={!!errors.number}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              type="number"
              label="Andar"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("floor", { required: "Campo obrigatório", valueAsNumber: true })}
              error={!!errors.floor}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.condominiumId}>
              <InputLabel id="condominium-label">Condomínio</InputLabel>
              <Controller
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
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
