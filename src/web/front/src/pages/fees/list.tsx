import React from "react";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton
} from "@refinedev/mui";
import { Stack } from "@mui/material";
import { useList } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const FeeList: React.FC = () => {
  
  const { dataGridProps } = useDataGrid();

  const { data: condominiumsData } = useList({
    resource: "condominiums",
    config: {
      pagination: { pageSize: 1000 }, // adjust as needed
    },
  });


  const condominiumMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    condominiumsData?.data.forEach((condo: any) => {
      map[condo.id] = condo.name || "";
    });
    return map;
  }, [condominiumsData]);

  const manipulatedRows = dataGridProps.rows?.map(row => {
    const formattedDate = new Date(row.due).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return {
      ...row,
      dueFormatted: `${formattedDate}`,
      displayName: condominiumMap[row.condominiumId] || "",
    };
  }) || [];

  const columns: GridColDef[] = [
    { field: "type", headerName: "Tipo", width: 100 },
    { field: "name", headerName: "Nome", width: 100 },
    { field: "dueFormatted", headerName: "Vencimento", width: 100 },
    { field: "isRecurrent", headerName: "Recorrente", width: 100 },
    { field: "isActive", headerName: "Registro Ativo", width: 100 },
    { field: "displayName", headerName: "Condomínio", width: 160 },
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
      <DataGrid {...dataGridProps} rows={manipulatedRows} columns={columns} autoHeight />
    </List>
  );
};
