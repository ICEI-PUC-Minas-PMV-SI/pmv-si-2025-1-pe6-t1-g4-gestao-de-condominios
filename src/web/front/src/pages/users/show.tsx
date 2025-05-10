import React from "react";
import {
  Show,
  DateField,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { Box, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import DateUtil from "../../utilities/DateUtil";

const profileMap = {
  RESIDENT: 'Residente',
  ADMIN: 'Administrador',
  MANAGER: 'Síndico',
}

export const UserShow: React.FC = () => {
  const { query } = useShow();
  const user = query?.data?.data || {};

  return (
    <Show title="Detalhes do Usuário">
      <Box>
        <Stack spacing={2}>
          <Typography variant="h6">ID</Typography>
          <TextField value={user.id} />

          <Typography variant="h6">E-mail</Typography>
          <TextField value={user.email} />

          <Typography variant="h6">Perfil</Typography>
          <TextField value={profileMap[user.profile]} />

          <Typography variant="h6">Data de Nascimento</Typography>
          <TextField value={DateUtil.prettyTimeStamp(user.birthDate) || '-'} />

          <Typography variant="h6">Telefone</Typography>
          <TextField value={user.phone || '-'} />

          <Typography variant="h6">Ativo</Typography>
          <TextField value={user.isActive ? 'Sim' : 'Não'} />

          <Typography variant="h6">Criado em</Typography>
          <TextField value={DateUtil.prettyTimeStamp(user.createdAt) || '-'} />

          <Typography variant="h6">Atualizado em</Typography>
          <TextField value={DateUtil.prettyTimeStamp(user.updatedAt) || '-'} />
        </Stack>
      </Box>
    </Show>
  );
};
