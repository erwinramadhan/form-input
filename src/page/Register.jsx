import { Typography, Stack, TextField } from "@mui/material";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import BaseButton from "../component/BaseButton";
import { useEffect, useMemo, useState } from "react";
import CoreModal from "../component/Modal";
import Select from "react-select";
import getAllTeams from "../service/teamService";
import postRegister from "../service/registerService";
import { Previews } from "./Form";
import uploadService from "../service/uploadService";

const DEFAULT_ROLE_ID_SURVEYOR = 3;
const MODAL_ERROR_TYPE = {
  SECRET_CODE_DOESNT_MATCH: "SECRET_CODE_DOESNT_MATCH",
  FORM_NOT_COMPLETED_OR_SERVER_ERROR: "FORM_NOT_COMPLETED_OR_SERVER_ERROR",
};

const Register = () => {
  const navigation = useNavigate();
  const [modalErrorType, setModalErrorType] = useState(null);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [teamDatas, setTeamDatas] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({
    id: 0,
    label: "",
    secretCode: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    fullName: "",
    team: null,
    secretCode: "",
    role: DEFAULT_ROLE_ID_SURVEYOR,
  });

  const onChangeTextField = (e) => {
    setFormData((prev) => {
      if (e.target.name === "phoneNumber") {
        const username = e.target.value;
        return {
          ...prev,
          [e.target.name]: e.target.value,
          username,
        };
      }

      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onChangeTeamSelect = (selected) => {
    setSelectedTeam(selected);
    setFormData((prev) => ({
      ...prev,
      team: selected.value,
    }));
  };

  const onButtonRegister = () => {
    if (validationSecretCode()) {
      register();
    } else {
      appearingModalError(MODAL_ERROR_TYPE.SECRET_CODE_DOESNT_MATCH);
    }
  };

  const appearingModalError = (type) => {
    setModalErrorType(type);
    setIsOpenModalError(true);
  };

  const onCloseModalError = () => {
    setModalErrorType(null);
    setIsOpenModalError(false);
  };

  const validationSecretCode = () => {
    return formData.secretCode === selectedTeam.secretCode;
  };

  const getTeams = async () => {
    try {
      const { data } = await getAllTeams();
      const mappedData = data.map((el) => ({
        value: el.id,
        label: el.attributes.name,
        secretCode: el.attributes.secretCode,
      }));

      setTeamDatas(mappedData);
    } catch (err) {}
  };

  const register = async () => {
    try {
      let body = formData;
      let resultImage;
      // delete body.secretCode;

      if (photos.length) {
        resultImage = await uploadService(photos);
        body = {
          ...body,
          displayPicture: resultImage.data[0].id,
        };
      }

      const data = await postRegister(body);
      navigation("/");
    } catch (err) {
      appearingModalError(MODAL_ERROR_TYPE.FORM_NOT_COMPLETED_OR_SERVER_ERROR);
    }
  };

  const modalAttribute = useMemo(() => {
    let title = "";
    let message = "";

    switch (modalErrorType) {
      case MODAL_ERROR_TYPE.FORM_NOT_COMPLETED_OR_SERVER_ERROR:
        title =
          "Mohon periksa semua form kemungkinan ada kesalahan dalam pengimputan form atau server kami sedang bermasalah";
        message =
          "Pastikan form yang Anda isi benar apa bila masih bermasalah hubungi Admin Kami.";
        break;
      case MODAL_ERROR_TYPE.SECRET_CODE_DOESNT_MATCH:
        title =
          "Kode Rahasia Team yang anda masukkan tidak sesuai dengan Team yang Anda Pilih.";
        message = "Pastikan Kode Rahasia Anda Benar";
      default:
        title = "";
        message = "";
    }

    const data = {
      title,
      message,
    };
    return data;
  }, [modalErrorType]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!!jwt) {
      navigation("/input");
    } else {
      getTeams();
    }
  }, []);

  return (
    <>
      <MainLayout withoutNavBar>
        <Stack spacing={6} sx={{ color: "black", pt: 4 }}>
          <Stack spacing={2}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: "bold", color: "#575DFB" }}
            >
              Pendaftaran
            </Typography>
            <Typography sx={{ width: "90%" }}>
              Daftarlah sekarang dan persiapkan diri Anda untuk berkontribusi
              dalam penginputan data.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: "600" }}>No Handphone</Typography>
              <TextField
                name="phoneNumber"
                id="outlined-basic"
                label=""
                variant="outlined"
                type="text"
                size="small"
                onChange={onChangeTextField}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: "600" }}>Password</Typography>
              <TextField
                name="password"
                id="outlined-basic"
                label=""
                variant="outlined"
                type="password"
                size="small"
                onChange={onChangeTextField}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: "600" }}>Email</Typography>
              <TextField
                name="email"
                id="outlined-basic"
                label=""
                variant="outlined"
                type="email"
                size="small"
                onChange={onChangeTextField}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: "600" }}>Nama Lengkap</Typography>
              <TextField
                name="fullName"
                id="outlined-basic"
                label=""
                variant="outlined"
                type="text"
                size="small"
                onChange={onChangeTextField}
              />
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row">
                <span className="text-black text-sm font-medium">Foto</span>
              </Stack>
              <Previews name="" files={photos} setFiles={setPhotos} />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: "600" }}>Team</Typography>
              <Select
                isSearchable
                name="regencies"
                options={teamDatas ?? []}
                onChange={onChangeTeamSelect}
                value={selectedTeam}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: "600" }}>
                Kode Rahasia Team
              </Typography>
              <TextField
                name="secretCode"
                id="outlined-basic"
                label=""
                variant="outlined"
                type="password"
                size="small"
                onChange={onChangeTextField}
              />
            </Stack>
          </Stack>
          <BaseButton text="Daftar" onClick={onButtonRegister} />
          <div
            className={`rounded-xl bg-white cursor-pointer text-sm text-black font-bold py-4 px-4 text-center`}
            onClick={() => {
              navigation("/");
            }}
          >
            Kembali Ke Login
          </div>
        </Stack>
      </MainLayout>
      <CoreModal
        open={isOpenModalError}
        handleClose={onCloseModalError}
        title={modalAttribute.title}
        message={modalAttribute.message}
        cancelText="Daftar Ulang"
        usingAlert
      />
    </>
  );
};

export default Register;
