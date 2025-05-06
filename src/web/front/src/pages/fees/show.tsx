import React from "react";
import {
  Show,
  NumberField,
  DateField,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { Box, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";


export const FeeShow: React.FC = () => {
  const { queryResult } = useShow();
  const fee = queryResult?.data?.data;

  return (
    <Show title="Detalhes da Taxa">
      <Box>
        <Stack spacing={2}>
          <Typography variant="h6">ID</Typography>
          <TextField value={fee?.id} />

          <Typography variant="h6">Tipo</Typography>
          <TextField value={fee?.type} />

          <Typography variant="h6">Nome</Typography>
          <NumberField value={fee?.name} />

          <Typography variant="h6">Vencimento</Typography>
          <NumberField value={fee?.due} />

          <Typography variant="h6">Recorrente</Typography>
          <NumberField value={fee?.isRecurrent} />

          <Typography variant="h6">Condomínio ID</Typography>
          <TextField value={fee?.condominiumId} />

          <Typography variant="h6">Criado em</Typography>
          <DateField value={fee?.createdAt} />

          <Typography variant="h6">Atualizado em</Typography>
          <DateField value={fee?.updatedAt} />

          <Typography variant="h6">Criado por</Typography>
          <TextField value={fee?.createdBy ?? "–"} />

          <Typography variant="h6">Atualizado por</Typography>
          <TextField value={fee?.updatedBy ?? "–"} />
        </Stack>
      </Box>
    </Show>
  );
};
