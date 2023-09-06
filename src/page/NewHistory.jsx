import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'

import './index.css'
import historyService from '../service/historyService'
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EditIcon from '@mui/icons-material/Edit';


const defaultData = []

const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
        header: <span>ID</span>,
    }),
    columnHelper.accessor('nama', {
        cell: info => info.getValue(),
        header: <span>Nama</span>,
    }),
    columnHelper.accessor('gender', {
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Jenis Kelamin</span>,
    }),
    columnHelper.accessor('whatsapp', {
        header: () => 'Whatsapp',
        cell: info => info.renderValue(),
    }),
    columnHelper.accessor('kabupaten', {
        header: () => <span>Kabupaten</span>,
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('kecamatan', {
        header: 'Kecamatan',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('kelurahan', {
        header: 'Kelurahan',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('dusun', {
        header: 'Dusun',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('rt_rw', {
        header: 'RT/RW',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('usia', {
        header: 'Umur',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('keterangan', {
        header: 'Keterangan',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('action', {
        header: 'Aksi',
        cell: info => info.getValue(),
    }),
    // columnHelper.accessor('photo', {
    //     header: 'Foto',
    //     cell: info => info.getValue(),
    // }),
]

const NewHistory = () => {
    const [data, setData] = useState(() => [...defaultData])
    // const [pagination, setPagination] = useState({
    //     pageIndex: 0,
    //     pageSize: 25,
    // })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const fetchInit = async () => {
        try {
            const result = await historyService()
            const data = result.data.data

            const dataTable = data.map(el => {
                return {
                    ...el.attributes,
                    id: el.id
                }
            })
            setData(dataTable)
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchInit()
    }, [])

    return (
        <MainLayout>
            <div className='text-black text-center mb-3'>
                <span className='font-bold text-lg'>Data Riwayat Penginputan Data</span>
            </div>
            <div className="p-2 text-black bg-white overflow-x-scroll">
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    if (cell.id.includes('action')) {
                                        return (
                                            <td key={cell.id} className='border p-1'>
                                                <div className='flex gap-4 h-full'>
                                                    <ContentPasteSearchIcon className='cursor-pointer' />
                                                    <EditIcon className='cursor-pointer' />
                                                    <DeleteIcon className='cursor-pointer' />
                                                </div>
                                            </td>
                                        )
                                    }
                                    return (
                                        <td key={cell.id} className='border p-1'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="h-4" />
            </div>
            <div className="flex items-center gap-2 text-black bg-white">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
            </div>
        </MainLayout>
    )
}

export default NewHistory