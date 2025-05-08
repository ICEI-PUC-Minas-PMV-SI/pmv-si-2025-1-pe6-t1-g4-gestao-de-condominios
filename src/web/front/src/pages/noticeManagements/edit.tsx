import React, { useEffect } from "react";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Grid, TextField as MuiTextField } from "@mui/material";

export const NoticeManagementsEdit: React.FC = () => {
  const id = window.location.pathname.split("/").pop() || "";

  const {
    refineCore: { queryResult, formLoading, setId },
    saveButtonProps,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<{
    id: string;
    title: string;
    description: string;
    date: string;
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

  // informa ao refine qual ID buscar
  useEffect(() => {
    if (id) {
      setId(id);
    }
  }, [id, setId]);

  // popula o form quando o registro chega
  const record = queryResult?.data?.data;
  useEffect(() => {
    if (record) {
      reset({
        ...record,
        date: record.date?.slice(0, 10),
      });
    }
  }, [record?.id, reset]);

  if (formLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <Edit title="Editar Aviso" saveButtonProps={saveButtonProps}>
      {/* campos ocultos necessários no payload */}
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("createdAt")} />
      <input type="hidden" {...register("updatedAt")} />

      <Grid container spacing={2}>
        {/* Título */}
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                fullWidth
                label="Título"
                error={!!errors.title}
              />
            )}
          />
        </Grid>

        {/* Descrição */}
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label="Descrição"
                error={!!errors.description}
              />
            )}
          />
        </Grid>

        {/* Data */}
        <Grid item xs={12}>
          <Controller
            name="date"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                fullWidth
                type="date"
                label="Data"
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
              />
            )}
          />
        </Grid>

        {/* Condomínio */}
        <Grid item xs={12}>
          <Controller
            name="condominiumId"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                fullWidth
                label="ID do Condomínio"
                error={!!errors.condominiumId}
              />
            )}
          />
        </Grid>

        {/* Criado por (agora editável) */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="createdBy"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                fullWidth
                label="Criado por"
                error={!!errors.createdBy}
              />
            )}
          />
        </Grid>

        {/* Atualizado por (agora editável) */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="updatedBy"
            control={control}
            defaultValue={record?.updatedBy ?? ""} // ①
            rules={{ required: true }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                fullWidth
                label="Atualizado por"
                error={!!errors.updatedBy}
              />
            )}
          />
        </Grid>
      </Grid>
    </Edit>
  );
};
