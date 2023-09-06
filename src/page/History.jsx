import MainLayout from "../layout/MainLayout"
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
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
        accessorKey: 'gender',
        header: 'Jenis Kelamin',
      },
      {
        accessorKey: 'whatsapp',
        header: 'Whatsapp',
      },
      {
        accessorKey: 'kabupaten',
        header: 'Kabupaten',
      },
      {
        accessorKey: 'kecamatan',
        header: 'Kecamatan',
      },
      {
        accessorKey: 'kelurahan',
        header: 'Kelurahan',
      },
      {
        accessorKey: 'dusun',
        header: 'Dusun',
      },
      {
        accessorKey: 'rt_rw',
        header: 'RT/RW',
      },
      {
        accessorKey: 'usia',
        header: 'Umur',
      },
      {
        accessorKey: 'keterangan',
        header: 'Keterangan',
      },
      {
        accessorKey: 'photo',
        header: 'Foto'
      }
      
    ],
    [],
    //end
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    pageCount: 1,
    pageSize: 25,
    total: 0
  })

  const fetchInit = async () => {
    try {
      const result = await historyService()
      console.log('result', result.data)
      const pgMeta = result.data.meta.pagination
      setPagination(pgMeta)
      console.log('pagination', pagination)
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
    return <div>LOADING</div>
  } else {
    return (
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        enableColumnFilters={false}
        enableTopToolbar={false}
        initialState={{ pagination: { pageSize: 25, pageIndex: 1 } }}
        // rowNumberMode='static'
        muiTablePaginationProps={
          {
            rowsPerPageOptions: [25],
            // showFirstButton: true,
            // showLastButton: true,
            page: 1,
            onPageChange: (e) => {console.log('test', e)},
          }
        } 
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

