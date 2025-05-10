import React from "react";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton
} from "@refinedev/mui";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


export const UserList: React.FC = () => {
  const { dataGridProps } = useDataGrid();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Nome", width: 250 },
    { field: "email", headerName: "E-mail", width: 250 },
    { field: "phone", headerName: "Telefone", width: 100 },
    {
      field: "createdAt",
      headerName: "Criado em",
      width: 180,
      valueFormatter: (value) => {
        return new Date(value).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      },
    },
    {
      field: "updatedAt",
      headerName: "Atualizado em",
      width: 180,
      valueFormatter: (value) => {
        return new Date(value).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      width: 150,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <EditButton hideText recordItemId={row.id} />
          <ShowButton hideText recordItemId={row.id} />
          <DeleteButton hideText recordItemId={row.id} />
        </Stack>
      ),
    }
  ];

  return (
    <List title="Usuários">
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
