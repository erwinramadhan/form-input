import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import MainLayout from '../layout/MainLayout'

import './index.css'
import historyService from '../service/historyService'
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EditIcon from '@mui/icons-material/Edit';
import MyModal from '../component/ModalTW'
import LoadingAbsolute from '../component/LoadingAbsolute'
import { MenuItem, Stack, TextField } from '@mui/material'
import { baseURLServer } from '../service/axiosInstance'
import { deleteFormService, editFormService, formDetailService } from '../service/formService'
import { Previews } from './Form'
import uploadService from '../service/uploadService'


const defaultData = []

const columnHelper = createColumnHelper()

const currencies = [
    {
        value: 'Laki-Laki',
        label: 'Laki-Laki',
    },
    {
        value: 'Perempuan',
        label: 'Perempuan',
    },
];

const columns = [
    columnHelper.accessor('no', {
        cell: info => info.getValue(),
        header: <span>No</span>,
    }),
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
    columnHelper.accessor('nik', {
        header: 'NIK',
        cell: info => info.getValue()
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
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false)
    const [isOpenSuccessDeleteDialog, setIsOpenSuccessDeleteDialog] = useState(false)
    const [isOpenFailedDeleteDialog, setIsOpenFailedDeleteDialog] = useState(false)
    const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false)
    const [isOpenEditDialog, setIsOpenEditDialog] = useState(false)
    const [selectedDataAction, setSelectedDataAction] = useState(null)
    const [detailData, setDetailData] = useState(null)
    const [isLoadingDetail, setIsLoadingDetail] = useState(false)
    const [isLoadingDeleteDetail, setIsLoadingDeleteDetail] = useState(false)

    const [editDetailData, setEditDetailData] = useState({})
    const [editDetailSuccess, setEditDetailSuccess] = useState(false)

    const [filesResponden, setFilesResponden] = useState([]);

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

            const dataTable = data.map((el, index) => {
                return {
                    ...el.attributes,
                    id: el.id,
                    no: data.length - index
                }
            })
            setData(dataTable.sort((a, b) => b.id - a.id))
        } catch (error) {
            console.log('error', error)
        }
    }

    const fetchDetail = async (id, completionSuccess, completionFailed) => {
        setIsLoadingDetail(true)
        try {
            const result = await formDetailService(id)

            const detailData = result.data.data
            const newDetailData = {
                ...detailData.attributes,
                id: detailData.id
            }
            setDetailData(newDetailData)
            completionSuccess()
            setIsLoadingDetail(false)
        } catch (error) {
            completionFailed(error)
            setIsLoadingDetail(false)
        }
    }

    const deleteDetail = async (id, completionSuccess, completionFailed) => {
        try {
            const result = await deleteFormService(id)

            completionSuccess()
        } catch (error) {
            completionFailed(error)
        }
    }

    const editDetail = async (id, completionSuccess, completionFailed) => {
        try {
            const data = {
                data: {
                    ...editDetailData
                }
            }

            if (filesResponden.length) {
                const resultImage = await uploadService(filesResponden)
                const newData = {
                    data: {
                        ...data.data,
                        photo: resultImage.data[0].id
                    }
                }

                const result = await editFormService(id, newData)
                completionSuccess()
                return
            }

            const result = await editFormService(id, data)
            completionSuccess()
        } catch (error) {
            completionFailed(error)
        }

    }

    const negativeActionDeleteDialog = () => {
        setIsOpenDeleteDialog(false)
    }

    const positiveActionDeleteDialog = () => {
        deleteDetail(selectedDataAction.id, completionSuccessDeleteDetail, completionFailedDeleteDetail)
    }

    const positiveActionDeleteSuccessDialog = () => {
        setIsOpenSuccessDeleteDialog(false)
    }

    const negativeActionEditDialog = () => {
        setFilesResponden([])
        setEditDetailData({})
        setIsOpenEditDialog(false)
    }

    const positiveActionEditDialog = () => {
        editDetail(selectedDataAction.id, completionSuccessEdit, completionFailedEdit)
    }

    const onClickDelete = (id) => {
        const selectedData = data.find(el => el.id === id)
        setSelectedDataAction(selectedData)
        setIsOpenDeleteDialog(true)
    }

    const onClickDetail = (id) => {
        setIsLoadingDetail(true)
        fetchDetail(id, completionSuccessFetchDetail, completionFailedFetchDetail)
    }

    const onClickEdit = (id) => {
        const selectedData = data.find(el => el.id === id)
        setSelectedDataAction(selectedData)
        setIsLoadingDetail(true)
        fetchDetail(id, completionSuccessFetchDetailEdit, completionFailedFetchDetailEdit)
    }

    const completionSuccessFetchDetailEdit = () => {
        setIsOpenEditDialog(true)
    }

    const completionFailedFetchDetailEdit = (error) => {
        console.log('error fetch detail', error)
    }

    const completionSuccessEdit = () => {
        setEditDetailSuccess(true)
        setIsOpenEditDialog(false)
        setFilesResponden([])
        setEditDetailData({})
        fetchInit()
    }

    const completionFailedEdit = (error) => {
        console.log('error', error)
        setIsOpenEditDialog(false)
        setFilesResponden([])
        setEditDetailData({})
        fetchInit()
    }

    const completionSuccessFetchDetail = () => {
        setIsOpenDetailDialog(true)
    }

    const completionFailedFetchDetail = (error) => {
        console.log('error fetch detail', error)
    }

    const completionSuccessDeleteDetail = () => {
        setIsOpenDeleteDialog(false)
        setIsLoadingDeleteDetail(false)
        setIsOpenSuccessDeleteDialog(true)
        fetchInit()
    }

    const completionFailedDeleteDetail = (error) => {
        setIsOpenDeleteDialog(false)
        setIsLoadingDeleteDetail(false)
        setIsOpenFailedDeleteDialog(true)
    }

    const detailCustomSubTitle = useMemo(() => {
        return (
            <div className='flex flex-col mt-2 gap-3'>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Nama</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.nama} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Jenis Kelamin</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.gender} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Whatsapp</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.whatsapp} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kabupaten</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.kabupaten} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kecamatan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.kecamatan} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kelurahan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.kelurahan} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Dusun</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.dusun} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">RT/RW</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.rt_rw} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Umur</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.usia} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">NIK</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.nik} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Keterangan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.keterangan} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Photo</p>
                    <img src={baseURLServer + detailData?.photo?.data?.attributes?.url} />
                </Stack>
            </div>
        )
    }, [detailData])

    const detailEditCustomSubTitle = useMemo(() => {
        return (
            <div className='flex flex-col mt-2 gap-3'>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Nama</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.nama ?? detailData?.nama} onChange={(e) => setEditDetailData(prev => { return { ...prev, nama: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Jenis Kelamin</p>
                    <TextField
                        id="gender"
                        select
                        size="small"
                        sx={{ backgroundColor: 'white' }}
                        onChange={(e) => setEditDetailData(prev => { return { ...prev, gender: e.target.value } })}
                        value={editDetailData?.gender ?? detailData?.gender}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Whatsapp</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.whatsapp ?? detailData?.whatsapp} onChange={(e) => setEditDetailData(prev => { return { ...prev, whatsapp: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kabupaten</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.kabupaten ?? detailData?.kabupaten} onChange={(e) => setEditDetailData(prev => { return { ...prev, kabupaten: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kecamatan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.kecamatan ?? detailData?.kecamatan} onChange={(e) => setEditDetailData(prev => { return { ...prev, kecamatan: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kelurahan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.kelurahan ?? detailData?.kelurahan} onChange={(e) => setEditDetailData(prev => { return { ...prev, kelurahan: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Dusun</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.dusun ?? detailData?.dusun} onChange={(e) => setEditDetailData(prev => { return { ...prev, dusun: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">RT/RW</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.rt_rw ?? detailData?.rt_rw} onChange={(e) => setEditDetailData(prev => { return { ...prev, rt_rw: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Umur</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.usia ?? detailData?.usia} onChange={(e) => setEditDetailData(prev => { return { ...prev, usia: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">NIK</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.nik ?? detailData?.nik} onChange={(e) => setEditDetailData(prev => { return { ...prev, nik: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Keterangan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.keterangan ?? detailData?.keterangan} onChange={(e) => setEditDetailData(prev => { return { ...prev, keterangan: e.target.value } })} />
                </Stack>
                {/* <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Photo</p>
                    <img src={baseURLServer + detailData?.photo?.data?.attributes?.url} />
                </Stack> */}
                <Stack spacing={1}>
                    <Stack direction="row">
                        <span className="text-black text-sm font-medium">Foto Responden</span>
                    </Stack>
                    <Previews name="Responden" files={filesResponden} setFiles={setFilesResponden} isEdit imgUrl={baseURLServer + detailData?.photo?.data?.attributes?.url} />
                </Stack>
            </div>
        )
    }, [detailData, editDetailData, filesResponden])

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
                                                    <ContentPasteSearchIcon className='cursor-pointer' onClick={() => onClickDetail(row.original.id)} />
                                                    <EditIcon className='cursor-pointer' onClick={() => onClickEdit(row.original.id)} />
                                                    <DeleteIcon className='cursor-pointer' onClick={() => onClickDelete(row.original.id)} />
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
            <MyModal
                isOpen={isOpenDeleteDialog}
                positiveAction={positiveActionDeleteDialog}
                negativeAction={negativeActionDeleteDialog}
                onClose={() => setIsOpenDeleteDialog(false)}
                title={["Hapus Data dengan Nama: ", <span className="text-blue-400 font-bold">{selectedDataAction?.nama ?? ""}</span>]}
                subTitle="Apakah Anda yakin ingin menghapus data tersebut? Data yang sudah terhapus tidak akan bisa kembali."
                positiveText="Hapus"
                negativeText="Batal"
            />
            <MyModal
                isOpen={isOpenSuccessDeleteDialog}
                onClose={() => setIsOpenSuccessDeleteDialog(false)}
                positiveAction={positiveActionDeleteSuccessDialog}
                title="Berhasil Menghapus Data"
                subTitle={["Data dengan Nama: ", <span className="text-blue-400 font-bold">{selectedDataAction?.nama ?? ""}</span>, " telah berhasil dihapus dari database."]}
                positiveText="Ok"
            />
            <MyModal
                isOpen={isOpenFailedDeleteDialog}
                onClose={() => setIsOpenFailedDeleteDialog(false)}
                positiveAction={() => setIsOpenFailedDeleteDialog(false)}
                title="Gagal Menghapus Data"
                subTitle={["Data dengan Nama: ", <span className="text-blue-400 font-bold">{selectedDataAction?.nama ?? ""}</span>, " gagal dihapus."]}
                positiveText="Ok"
            />
            <MyModal
                isOpen={isOpenDetailDialog}
                onClose={() => setIsOpenDetailDialog(false)}
                positiveAction={() => setIsOpenDetailDialog(false)}
                title="Detail Data"
                customSubtitle={detailCustomSubTitle}
                positiveText="Tutup"
                size='large'
            />
            <MyModal
                isOpen={isOpenEditDialog}
                onClose={negativeActionEditDialog}
                negativeAction={negativeActionEditDialog}
                positiveAction={positiveActionEditDialog}
                title={`Detail Data ${editDetailData?.nama}`}
                customSubtitle={detailEditCustomSubTitle}
                negativeText="Batal"
                positiveText="Edit"
                size='large'
            />
            <LoadingAbsolute loading={isLoadingDetail || isLoadingDeleteDetail} />
        </MainLayout>
    )
}

export default NewHistory