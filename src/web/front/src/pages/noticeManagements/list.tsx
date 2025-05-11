import React from "react";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/mui";
import { useList } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";

export const NoticeManagementsList: React.FC = () => {
  const { dataGridProps } = useDataGrid();
  const { rows: originalRows, ...restGridProps } = dataGridProps;

  const { data: condosData } = useList({
    resource: "condominiums",
    config: { pagination: { pageSize: 1000 } },
  });
  const condominiumMap = React.useMemo(() => {
    const m: Record<string, string> = {};
    condosData?.data.forEach((c: any) => (m[c.id] = c.name));
    return m;
  }, [condosData]);

  const { data: usersData } = useList({
    resource: "users",
    config: { pagination: { pageSize: 1000 } },
  });
  const userMap = React.useMemo(() => {
    const m: Record<string, string> = {};
    usersData?.data.forEach((u: any) => (m[u.id] = u.name));
    return m;
  }, [usersData]);

  // 1) Declaramos manipulatedRows antes de qualquer uso
  const manipulatedRows =
    originalRows?.map((r) => ({
      ...r,
      createdAt: (r as any).createdAt ?? (r as any).created_at,
      updatedAt: (r as any).updatedAt ?? (r as any).updated_at,
      condominiumName: condominiumMap[r.condominiumId] || "",
      createdByName: userMap[r.createdBy] || "",
    })) || [];

  // 2) Agora sim podemos logar sem erro de escopo
  console.log("List • originalRows[0]:", originalRows?.[0]);
  console.log("List • manipulatedRows[0]:", manipulatedRows[0]);

  // 3) Se você quiser comparar com o mesmo ID que está abrindo no Edit
  const currentId = window.location.pathname.split("/").pop();
  console.log(
    "List • linha editada:",
    manipulatedRows.find((r) => r.id === currentId)
  );

  const columns: GridColDef[] = [
    { field: "title", headerName: "Título", width: 180 },
    { field: "description", headerName: "Descrição", width: 250 },
    { field: "condominiumName", headerName: "Condomínio", width: 250 },
   {
      field: "updatedAt",
      headerName: "Data do Aviso ",
      width: 150,
      renderCell: ({ row }) =>
        row.updatedAt
          ? new Date(row.updatedAt as string).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "",
    },
    {
      field: "date",
      headerName: "Atualizado em",
      width: 150,
      renderCell: ({ row }) =>
        row.date
          ? new Date(row.date as string).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "",
    },
    
    { field: "createdByName", headerName: "Criado por", width: 180 },
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
    },
  ];

  return (
    <List title="Gestão de Avisos" canCreate>
      <DataGrid
        {...restGridProps}
        rows={manipulatedRows}
        columns={columns}
        autoHeight
      />
    </List>
  );
};
