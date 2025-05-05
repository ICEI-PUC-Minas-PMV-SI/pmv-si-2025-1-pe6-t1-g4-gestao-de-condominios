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


export const FeeList: React.FC = () => {
  const { dataGridProps } = useDataGrid();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "type", headerName: "Tipo", width: 100 },
    { field: "name", headerName: "Nome", width: 100 },
    { field: "due", headerName: "Vencimento", width: 100 },
    { field: "isRecurrent", headerName: "Recorrente", width: 100 },
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
    { field: "createdBy", headerName: "Criado por", width: 150 },
    { field: "updatedBy", headerName: "Atualizado por", width: 150 },
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
    <List title="Taxas">
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
