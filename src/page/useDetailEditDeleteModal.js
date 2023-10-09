import { useState } from "react"

import useDomicilyForm from '../hooks/useDomicilyForm'
import uploadService from '../service/uploadService'
import { deleteFormService, editFormService, formDetailService } from '../service/formService'

function useDetailEditDeleteModal() {
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
    const domicilyStateAndFunc = useDomicilyForm()

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
            domicilyStateAndFunc.fetchedDetail({ value: detailData.attributes.regency, label: detailData.attributes.regency }, { value: detailData.attributes.district, label: detailData.attributes.district })
            completionSuccess()
            setIsLoadingDetail(false)
        } catch (error) {
            completionFailed(error)
            setIsLoadingDetail(false)
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

    const deleteDetail = async (id, completionSuccess, completionFailed) => {
        try {
            const result = await deleteFormService(id)

            completionSuccess()
        } catch (error) {
            completionFailed(error)
        }
    }

   return {
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
   }
}

export default useDetailEditDeleteModal