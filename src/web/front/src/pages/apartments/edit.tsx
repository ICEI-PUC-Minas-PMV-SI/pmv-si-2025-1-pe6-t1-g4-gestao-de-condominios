import React from "react";
import {
  Edit,
} from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  Grid,
  TextField as MuiTextField,
} from "@mui/material";

export const ApartmentEdit: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Edit title="Editar apartamento" saveButtonProps={saveButtonProps}>
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
              type="number"
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
          <Grid item xs={12}>
            <MuiTextField
              fullWidth
              label="ID do Condomínio"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("condominiumId", { required: "Campo obrigatório" })}
              error={!!errors.condominiumId}
            />
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
