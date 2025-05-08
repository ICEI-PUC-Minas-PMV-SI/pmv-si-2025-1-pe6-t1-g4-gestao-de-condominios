import React from "react";
import {
  Edit,
} from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {
  Box,
  Grid,
  TextField as MuiTextField,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@mui/material";

export const FeeEdit: React.FC = () => {
  const {
    saveButtonProps,
    control,
    register,
    formState: { errors },
  } = useForm({
    // The Edit component from @refinedev/mui provides the record data automatically
    // Setting defaultValues to the record will populate the form fields including the selectable field
    defaultValues: undefined,
  });

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
            <Controller
              name="isRecurrent"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Recorrente"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <MuiTextField
              disabled
              fullWidth
              label="ID do Condomínio"
              {...register("condominiumId", { required: "Campo obrigatório" })}
              error={!!errors.condominiumId}
            />
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
