import React from "react";
import {
  Show,
  DateField,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { Box, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";

export const NoticeManagementsShow: React.FC = () => {
  const { queryResult } = useShow();
  const notice = queryResult?.data?.data;

  return (
    <Show title="Detalhes do Aviso">
      <Box>
        {/* Linha única com Criado em (esquerda) e Título (direita) */}
        <Stack
          direction="row"
          justifyContent="space-between" // espaça até as bordas
          alignItems="center"
        >
          <Box>
            <Typography variant="h6">Título</Typography>
            <TextField value={notice?.title} />
          </Box>
          <Box>
            <Typography variant="h6">Criado em</Typography>
            <DateField value={notice?.createdAt} />
          </Box>
        </Stack>

        {/* Descrição abaixo */}
        <Box mt={3}>
          <Typography variant="h6">Descrição</Typography>
          <TextField value={notice?.description} />
        </Box>

        <Box mt={3}>
          <Typography variant="h6">
            Enviado por: <TextField value={notice?.createdBy} />
          </Typography>
        </Box>
      </Box>
    </Show>
  );
};
