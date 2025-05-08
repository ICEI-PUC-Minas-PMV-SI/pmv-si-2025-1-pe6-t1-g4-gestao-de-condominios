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

export const NoticeManagementsList: React.FC = () => {
  const { dataGridProps } = useDataGrid();

  const columns: GridColDef[] = [
    { field: "title", headerName: "Título", width: 180 },
    { field: "description", headerName: "Descrição", width: 250 },

    {
      field: "createdAt",
      headerName: "Criado em",
      width: 180,
      valueFormatter: (value) => {
        return new Date(value).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
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
        });
      }
    },
    { field: "createdBy", headerName: "Criado por", width: 180 },
    
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
    <List title="Gestão de Avisos" canCreate>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
