import React from "react";
import {
  Edit,
} from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import {
  Box,
  TextField as MuiTextField,
  Grid,
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
              slotProps={{ inputLabel: { shrink: true } }}
              label="Número"
              type="number"
              {...register("number", { required: "Campo obrigatório", valueAsNumber: true })}
              error={!!errors.block}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              label="Andar"
              type="number"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("floor", { required: "Campo obrigatório", valueAsNumber: true })}
              error={!!errors.floor}
            />
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
