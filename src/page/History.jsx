import MainLayout from "../layout/MainLayout"
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
// import { data as initialData } from './makeData';
import historyService from "../service/historyService";


const History = () => {
  return (
    <MainLayout withoutPadding>
      <Example />
    </MainLayout>
  )
}

export default History



export const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'nama',
        header: 'Nama',
      },
      {
        accessorKey: 'usia',
        header: 'Umur',
      },
      {
        accessorKey: 'gender',
        header: 'Jenis Kelamin',
      },
      {
        accessorKey: 'dusun',
        header: 'Dusun',
      },
      {
        accessorKey: 'kelurahan',
        header: 'Kelurahan',
      },
    ],
    [],
    //end
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchInit = async () => {
    try {
      const result = await historyService()
      console.log('result', result.data)
      const finalData = result.data.data.map(el => {
        return {
          nama: el.attributes.nama,
          usia: el.attributes.usia,
          gender: el.attributes.gender,
          dusun: el.attributes.dusun,
          kelurahan: el.attributes.kelurahan
        }
      })
      console.log('finalData', finalData)
      setData(finalData)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log('error')
    }


  }

  useEffect(() => {
    setLoading(true)
    fetchInit()
  }, [])

  if (loading) {
    return <div>LOADIN</div>
  } else {
    return (
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        enableColumnFilters={false}
        enableTopToolbar={false}
        initialState={{ pagination: { pageSize: 25, pageIndex: 1 } }}
        rowNumberMode='static'
      // renderRowActions={({ row, table }) => (
      //   <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
      //     <IconButton
      //       color="primary"
      //       onClick={() =>
      //         window.open(
      //           `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`,
      //         )
      //       }
      //     >
      //       <SearchIcon />
      //     </IconButton>
      //     <IconButton
      //       color="secondary"
      //       onClick={() => {
      //         table.setEditingRow(row);
      //       }}
      //     >
      //       <EditIcon />
      //     </IconButton>
      //     <IconButton
      //       color="error"
      //       onClick={() => {
      //         data.splice(row.index, 1); //assuming simple data table
      //         setData([...data]);
      //       }}
      //     >
      //       <DeleteIcon />
      //     </IconButton>
      //   </Box>
      // )}
      />
    );
  }


};

