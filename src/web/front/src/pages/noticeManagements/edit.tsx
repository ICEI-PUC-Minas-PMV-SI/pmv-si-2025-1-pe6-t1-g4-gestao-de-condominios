import React, { useEffect, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/pt-br';
import { Edit } from "@refinedev/mui";
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
} from "@mui/material";

// Define globalmente a locale para pt-br
dayjs.locale("pt-br");

export const NoticeManagementsEdit: React.FC = () => {
  const {
    refineCore: { queryResult, formLoading, setId },
    saveButtonProps,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<{
    id: string;
    title: string;
    description: string;
    date: Dayjs | null;
    condominiumId: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
  }>({
    refineCoreProps: {
      resource: "notice-managements",
      action: "edit",
      redirect: "list",
    },
  });

  const record = queryResult?.data?.data;

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id) setId(id);
  }, [setId]);

  useEffect(() => {
    if (record) {
      reset({
        ...record,
        date: record.date ? dayjs(record.date) : null,
      });
    }
  }, [record, reset]);

  const {
    data: condosData,
    isLoading: condosLoading,
    error: condosError,
  } = useList({
    resource: "condominiums",
    config: { pagination: { pageSize: 100 } },
  });

  const { data: usersData } = useList({
    resource: "users",
    config: { pagination: { pageSize: 1000 } },
  });
  const userMap = useMemo(() => {
    const m: Record<string, string> = {};
    usersData?.data.forEach((u: any) => (m[u.id] = u.name));
    return m;
  }, [usersData]);

  if (formLoading) {
    return <p>Carregando…</p>;
  }

  return (
    <Edit title="Editar Aviso" saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <Grid container spacing={2}>
          {/* campos ocultos */}
          <input type="hidden" {...register("id")} />
          <input type="hidden" {...register("createdAt")} />
          <input type="hidden" {...register("updatedAt")} />
          <input type="hidden" {...register("createdBy")} />

          {/* Criado por */}
          <Grid item xs={12} sm={6}>
            <MuiTextField
              fullWidth
              label="Criado por"
              value={record ? userMap[record.createdBy] || record.createdBy : ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Título */}
          <Grid item xs={12}>
            <MuiTextField
              fullWidth
              label="Título"
              {...register("title", { required: "Título é obrigatório" })}
              error={!!errors.title}
            />
          </Grid>

          {/* Descrição */}
          <Grid item xs={12}>
            <MuiTextField
              fullWidth
              label="Descrição"
              multiline
              rows={4}
              {...register("description", { required: "Descrição é obrigatória" })}
              error={!!errors.description}
            />
          </Grid>

          {/* Data */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.date}>
              <Controller
                name="date"
                control={control}
                defaultValue={null}
                rules={{ required: "Data é obrigatória" }}
                render={({ field }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="pt-br"
                  >
                    <DatePicker
                      label="Data"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: { fullWidth: true, error: !!errors.date },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>
          </Grid>

          {/* Condomínio */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.condominiumId}>
              <InputLabel id="condo-label-edit">Condomínio</InputLabel>
              <Controller
                name="condominiumId"
                control={control}
                defaultValue=""
                rules={{ required: "Selecione um condomínio" }}
                render={({ field }) => (
                  <Select labelId="condo-label-edit" label="Condomínio" {...field}>
                    {condosLoading ? (
                      <MenuItem disabled>Carregando...</MenuItem>
                    ) : condosError ? (
                      <MenuItem disabled>Erro ao carregar</MenuItem>
                    ) : (
                      condosData?.data.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
