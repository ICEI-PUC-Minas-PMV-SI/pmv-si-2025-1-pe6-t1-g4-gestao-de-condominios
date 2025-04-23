import React from "react";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton
} from "@refinedev/mui";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


export const ApartmentList: React.FC = () => {
  const { dataGridProps } = useDataGrid();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "block", headerName: "Bloco", width: 100 },
    { field: "number", headerName: "Número", width: 100 },
    { field: "floor", headerName: "Andar", width: 100 },
    { field: "condominiumId", headerName: "ID do Condomínio", width: 160 },
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
    { field: "crea", headerName: "Criado por", width: 150 },
    { field: "updatedBy", headerName: "Atualizado por", width: 150 },
    { field: "userId", headerName: "ID do Usuário", width: 150 },
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      width: 150,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <EditButton hideText recordItemId={row.id} />
          <ShowButton hideText recordItemId={row.id} />
        </Stack>
      ),
    }
  ];

  return (
    <List title="Apartamentos">
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
