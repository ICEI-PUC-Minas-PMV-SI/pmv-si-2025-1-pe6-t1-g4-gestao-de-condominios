import React from "react";
import {
  Show,
  NumberField,
  DateField,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { Box, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";


export const ApartmentShow: React.FC = () => {
  const { queryResult } = useShow();
  const apartment = queryResult?.data?.data;
  console.log(apartment);

  return (
    <Show title="Detalhes do Apartamento">
      <Box>
        <Stack spacing={2}>
          <Typography variant="h6">ID</Typography>
          <TextField value={apartment?.id} />

          <Typography variant="h6">Bloco</Typography>
          <TextField value={apartment?.block} />

          <Typography variant="h6">Número</Typography>
          <NumberField value={apartment?.number} />

          <Typography variant="h6">Andar</Typography>
          <NumberField value={apartment?.floor} />

          <Typography variant="h6">Condomínio ID</Typography>
          <TextField value={apartment?.condominiumId} />

          <Typography variant="h6">Usuário ID</Typography>
          <TextField value={apartment?.userId ?? "–"} />

          <Typography variant="h6">Criado em</Typography>
          <DateField value={apartment?.createdAt} />

          <Typography variant="h6">Atualizado em</Typography>
          <DateField value={apartment?.updatedAt} />

          <Typography variant="h6">Criado por</Typography>
          <TextField value={apartment?.createdBy ?? "–"} />

          <Typography variant="h6">Atualizado por</Typography>
          <TextField value={apartment?.updatedBy ?? "–"} />
        </Stack>
      </Box>
    </Show>
  );
};
