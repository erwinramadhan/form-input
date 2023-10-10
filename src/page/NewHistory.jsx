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
import { EDUCATION_LIST_SELECT, Previews, ISSUES_LIST_SELECT } from './Form'
import Select from 'react-select'

import useDetailEditDeleteModal from './useDetailEditDeleteModal'


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
    columnHelper.accessor('name', {
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
    columnHelper.accessor('regency', {
        header: () => <span>Kabupaten</span>,
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('district', {
        header: 'Kecamatan',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('subdistrict', {
        header: 'Kelurahan',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('dusun', {
        header: 'Dusun',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('rt', {
        header: 'RT',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('rw', {
        header: 'RW',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('age', {
        header: 'Umur',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('description', {
        header: 'Keterangan',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('action', {
        header: 'Aksi',
        cell: info => info.getValue(),
    }),
]

const NewHistory = () => {
    const [data, setData] = useState(() => [...defaultData])

    const { 
        editDetailData,
        filesResponden,
        detailData,
        setEditDetailData,
        isOpenFailedDeleteDialog,
        setIsOpenDeleteDialog,
        deleteDetail,
        selectedDataAction,
        setIsOpenSuccessDeleteDialog,
        setFilesResponden,
        setIsOpenEditDialog,
        editDetail,
        setSelectedDataAction,
        setIsLoadingDetail,
        fetchDetail,
        setEditDetailSuccess,
        setIsOpenDetailDialog,
        setIsLoadingDeleteDetail,
        setIsOpenFailedDeleteDialog,
        isOpenDeleteDialog,
        isOpenSuccessDeleteDialog,
        isOpenDetailDialog,
        isOpenEditDialog,
        isLoadingDetail,
        isLoadingDeleteDetail,
        domicilyStateAndFunc
    } = useDetailEditDeleteModal()

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

    const changeKabupaten = (kab) => {
        setEditDetailData(prev => { return { ...prev, regency: kab } })
    }

    const changeKecamatan = (kec) => {
        setEditDetailData(prev => { return { ...prev, district: kec } })
    }

    const onChangeSelectEducation = (newValue) => {
        setEditDetailData((prev) => ({ ...prev ,education: newValue.value}))
    }

    const selectValueEducation = useMemo(() => {
        if (editDetailData?.education) {
            return { value: editDetailData?.education, label: editDetailData?.education }
        } else {
            return { value: detailData?.education, label: detailData?.education }
        }
    }, [detailData, editDetailData])

    const onChangeSelectIssue = (newValue) => {
        setEditDetailData((prev) => ({ ...prev, issues: newValue.value}))
    }

    const selectValueIssues = useMemo(() => {
        if (editDetailData?.education) {
            return { value: editDetailData?.issues, label: editDetailData?.issues }
        } else {
            return { value: detailData?.issues, label: detailData?.issues }
        }
    }, [detailData, editDetailData])

    useEffect(() => {
        fetchInit()
    }, [])

    const detailCustomSubTitle = useMemo(() => {
        return (
            <div className='flex flex-col mt-2 gap-3'>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Nama</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.name} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Jenis Kelamin</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.gender} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Pendidikan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.education} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Whatsapp</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.whatsapp} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kabupaten</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.regency} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kecamatan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.district} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kelurahan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.subdistrict} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Dusun</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.dusun} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">RT</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.rt} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">RW</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.rw} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Umur</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.age} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Isu</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.issues} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Keterangan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} disabled value={detailData?.description} />
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
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.name ?? detailData?.name} onChange={(e) => setEditDetailData(prev => { return { ...prev, name: e.target.value } })} />
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
                <p className="text-black text-sm font-medium">Pendidikan</p>
                <Select
                                isSearchable
                                name="isues"
                                options={EDUCATION_LIST_SELECT ?? []}
                                onChange={onChangeSelectEducation}
                                className="text-black"
                                value={selectValueEducation}
                            />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kabupaten</p>
                    <Select
                        isSearchable
                        name="regencies"
                        options={domicilyStateAndFunc.regencies ?? []}
                        onChange={(val) => domicilyStateAndFunc.onChangeSelectRegency(val, changeKabupaten, changeKecamatan)}
                        isLoading={domicilyStateAndFunc.isLoadingRegencies}
                        isDisabled={domicilyStateAndFunc.regencies.length === 0}
                        value={domicilyStateAndFunc.selectedRegency}
                        className="text-black"
                    />
                    {/* <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.regency ?? detailData?.regency} onChange={(e) => setEditDetailData(prev => { return { ...prev, regency: e.target.value } })} /> */}
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kecamatan</p>
                    <Select
                        isSearchable
                        name="districts"
                        options={domicilyStateAndFunc.districts ?? []}
                        onChange={(val) => domicilyStateAndFunc.onChangeSelectDistrict(val, changeKecamatan)}
                        isLoading={domicilyStateAndFunc.isLoadingDistricts}
                        // isDisabled={domicilyStateAndFunc.districts.length === 0}
                        value={domicilyStateAndFunc.selectedDistrict}
                        className="text-black"
                    />
                    {/* <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.district ?? detailData?.district} onChange={(e) => setEditDetailData(prev => { return { ...prev, district: e.target.value } })} /> */}
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Kelurahan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.subdistrict ?? detailData?.subdistrict} onChange={(e) => setEditDetailData(prev => { return { ...prev, subdistrict: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Dusun</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.dusun ?? detailData?.dusun} onChange={(e) => setEditDetailData(prev => { return { ...prev, dusun: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">RT</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.rt ?? detailData?.rt} onChange={(e) => setEditDetailData(prev => { return { ...prev, rt: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">RW</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.rw ?? detailData?.rw} onChange={(e) => setEditDetailData(prev => { return { ...prev, rw: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Umur</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.age ?? detailData?.age} onChange={(e) => setEditDetailData(prev => { return { ...prev, age: e.target.value } })} />
                </Stack>
                <Stack spacing={1}>
                            <p className="text-black text-sm font-medium">Isu</p>
                            <Select
                                isSearchable
                                name="isues"
                                options={ISSUES_LIST_SELECT ?? []}
                                onChange={onChangeSelectIssue}
                                className="text-black"
                                value={selectValueIssues}
                            />
                        </Stack>
                <Stack spacing={1}>
                    <p className="text-black text-sm font-medium">Keterangan</p>
                    <TextField id="outlined-basic" label="" variant="outlined" size="small" sx={{ backgroundColor: 'white' }} value={editDetailData?.description ?? detailData?.description} onChange={(e) => setEditDetailData(prev => { return { ...prev, description: e.target.value } })} />
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
                                                    {/* <EditIcon className='cursor-pointer' onClick={() => onClickEdit(row.original.id)} /> */}
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
                title={`Edit Detail Data ${editDetailData?.name}`}
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