import React from "react";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {
  Box,
  Grid,
  TextField as MuiTextField,
  Autocomplete,
  FormControl,
  FormHelperText,
} from "@mui/material";

export const NoticeManagementsCreate: React.FC = () => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
    date: string;
    condominiumId: string;
  }>({
    refineCoreProps: {
      resource: "notice-managements",
      action: "create",
      redirect: "list",
    },
  });

  // Para popular o dropdown de condomínios
  const { autocompleteProps } = useAutocomplete<{ id: string; name: string }>({
    resource: "condominiums",
  });

  return (
    <Create title="Criar Aviso" saveButtonProps={saveButtonProps}>
      <Box>
        <Grid container spacing={2}>
          {/* Título */}
          <Grid item xs={12}>
            <MuiTextField
              fullWidth
              label="Título"
              {...register("title", { required: "Título é obrigatório" })}
              error={!!errors.title}
              // helperText={errors.title?.message}
            />
          </Grid>

          {/* Descrição */}
          <Grid item xs={12}>
            <MuiTextField
              fullWidth
              label="Descrição"
              multiline
              rows={4}
              {...register("description", {
                required: "Descrição é obrigatória",
              })}
              error={!!errors.description}
              // helperText={errors.description?.message}
            />
          </Grid>

          {/* Data */}
          <Grid item xs={12}>
            <MuiTextField
              fullWidth
              label="Data"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("date", { required: "Data é obrigatória" })}
              error={!!errors.date}
              // helperTexKCt={errors.date?.message}
            />
          </Grid>

          {/* Condomínio */}
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.condominiumId}>
              <Controller
                name="condominiumId"
                control={control}
                rules={{ required: "Selecione um condomínio" }}
                render={({ field }) => {
                  const current = autocompleteProps.options?.find(
                    (opt) => opt.id === field.value
                  ) ?? null;
                  return (
                    <Autocomplete
                      {...autocompleteProps}
                      value={current}
                      onChange={(_, v) => field.onChange(v?.id ?? "")}
                      getOptionLabel={(item) => item.name}
                      isOptionEqualToValue={(a, b) => a.id === b.id}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          label="Condomínio"
                          error={!!errors.condominiumId}
                        />
                      )}
                    />
                  );
                }}
              />

            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
