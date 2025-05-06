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

export const PaymentList: React.FC = () => {
  
  const { dataGridProps } = useDataGrid();

  const { data: condominiumsData } = useList({
    resource: "condominiums",
    config: {
      pagination: { pageSize: 1000 },
    },
  });

  const condominiumMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    condominiumsData?.data.forEach((condo: any) => {
      map[condo.id] = condo.name || "";
    });
    return map;
  }, [condominiumsData]);

  const { data: apartmentsData } = useList({
    resource: "apartments",
    config: {
      pagination: { pageSize: 1000 },
    },
  });

  const apartmentsMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    apartmentsData?.data.forEach((apartment: any) => {
      map[apartment.id] = apartment.block+' - '+apartment.number || "";
    });
    return map;
  }, [apartmentsData]);


  const { data: usersData } = useList({
    resource: "users",
    config: {
      pagination: { pageSize: 1000 },
    },
  });

  const usersMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    usersData?.data.forEach((user: any) => {
      map[user.id] = user.name || "";
    });
    return map;
  }, [usersData]);

  const { data: feesData } = useList({
    resource: "fees",
    config: {
      pagination: { pageSize: 1000 },
    },
  });

  const feesMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    feesData?.data.forEach((fee: any) => {
      map[fee.id] = fee.name || "";
    });
    return map;
  }, [feesData]);

  const manipulatedRows = dataGridProps.rows?.map(row => {
    const formattedDate = new Date(row.paymentDate).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(row.amount);

    return {
      ...row,
      paymentFormatted: `${formattedDate}`,
      formattedAmount: formattedAmount,
      condominiumName: condominiumMap[row.condominiumId] || "",
      userName: usersMap[row.userId] || "",
      apartmentName: apartmentsMap[row.apartmentId] || "",
      feeName: feesMap[row.feeId] || "",
    };
  }) || [];

  const columns: GridColDef[] = [
    { field: "formattedAmount", headerName: "Valor", width: 100 },
    { field: "paymentFormatted", headerName: "Data de Pagamento", width: 100 },

    { field: "condominiumName", headerName: "Condomínio", width: 300 },
    { field: "apartmentName", headerName: "Apartamento", width: 160 },
    { field: "userName", headerName: "Condômino", width: 160 },
    { field: "feeName", headerName: "Taxa", width: 160 },
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
    <List title="Pagamentos">
      <DataGrid {...dataGridProps} rows={manipulatedRows} columns={columns} autoHeight />
    </List>
  );
};
