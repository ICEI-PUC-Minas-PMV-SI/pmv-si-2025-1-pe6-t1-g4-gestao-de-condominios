import React from "react";
import {
  Create,
} from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  TextField as MuiTextField,
  Grid,
} from "@mui/material";

export const ApartmentCreate: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Create title="Cadastrar apartamento" saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              label="Bloco"
              {...register("block", { required: "Campo obrigatório" })}
              error={!!errors.block}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              type="number"
              label="Número"
              {...register("number", { required: "Campo obrigatório", valueAsNumber: true })}
              error={!!errors.number}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              type="number"
              label="Andar"
              {...register("floor", { required: "Campo obrigatório", valueAsNumber: true })}
              error={!!errors.floor}
            />
          </Grid>
          <Grid item xs={12}>
            <MuiTextField
              fullWidth
              label="ID do Condomínio"
              {...register("condominiumId", { required: "Campo obrigatório" })}
              error={!!errors.condominiumId}
            />
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
