import React, { useEffect } from "react";
import { Create, Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Grid,
  TextField as MuiTextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export const NoticeManagementsCreate: React.FC = () => {
  const {
    saveButtonProps,
    control,
    register,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
    date: Date | null;
    condominiumId: string;
  }>();

  const {
    data: condominiumsData,
    isLoading: condominiumsLoading,
    error: condominiumsError,
  } = useList({
    resource: "condominiums",
    config: { pagination: { pageSize: 100 } },

  });

  return (
    <Create title="Criar Aviso" saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MuiTextField
              fullWidth
              label="Título"
              {...register("title", { required: "Título é obrigatório" })}
              error={!!errors.title}
            />
          </Grid>

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
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.date}>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Data é obrigatória" }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Data"
                      format="DD/MM/YYYY"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      slotProps={{
                        textField: { fullWidth: true, error: !!errors.date },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.feeId && (
                <FormHelperText>
                  {typeof errors.feeId.message === "string"
                    ? errors.feeId.message
                    : ""}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.condominiumId}>
              <InputLabel id="condominium-label">Condomínio</InputLabel>

              <Controller
                name="condominiumId"
                control={control}
                rules={{ required: "Selecione um condomínio" }}
                render={({ field }) => (
                  <Select
                    labelId="condominium-label"
                    label="Condomínio"
                    {...field}
                  >
                    {condominiumsLoading ? (
                      <MenuItem disabled>Carregando...</MenuItem>
                    ) : condominiumsError ? (
                      <MenuItem disabled>Erro ao carregar</MenuItem>
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
              {errors.feeId && (
                <FormHelperText>
                  {typeof errors.feeId.message === "string"
                    ? errors.feeId.message
                    : ""}
                </FormHelperText>
              )}{" "}

            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
