import React from "react";
import {
  Show,
  NumberField,
  DateField,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { Box, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";


export const PaymentShow: React.FC = () => {
  const { queryResult } = useShow();
  const payment = queryResult?.data?.data;

  return (
    <Show title="Detalhes da Pagamento">
      <Box>
        <Stack spacing={2}>
          <Typography variant="h6">ID</Typography>
          <TextField value={payment?.id} />

          <Typography variant="h6">Valor</Typography>
          <TextField value={payment?.amount} />

          <Typography variant="h6">ID do Condomínio</Typography>
          <TextField value={payment?.condominiumId} />

          <Typography variant="h6">ID do Apartamento</Typography>
          <TextField value={payment?.apartmentId} />

          <Typography variant="h6">ID do Usuário</Typography>
          <TextField value={payment?.userId} />

          <Typography variant="h6">ID da Taxa</Typography>
          <TextField value={payment?.feeId} />

          <Typography variant="h6">Criado em</Typography>
          <DateField value={payment?.createdAt} />

          <Typography variant="h6">Atualizado em</Typography>
          <DateField value={payment?.updatedAt} />

          <Typography variant="h6">Criado por</Typography>
          <TextField value={payment?.createdBy ?? "–"} />

          <Typography variant="h6">Atualizado por</Typography>
          <TextField value={payment?.updatedBy ?? "–"} />
        </Stack>
      </Box>
    </Show>
  );
};
