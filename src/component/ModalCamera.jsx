import { Dialog, Transition } from "@headlessui/react";
import { ChangeCircleTwoTone } from "@mui/icons-material";
import { Fragment, useState } from "react";
import Camera, {FACING_MODES} from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import BaseButton from "./BaseButton";

const ModalCamera = ({ onClose, isOpen, photo, setPhoto }) => {
//   const [facingMode, setFacingMode] = useState(FACING_MODES.USER);
  const [error, setError] = useState('');

  const handleTakePhoto = (dataUri) => {
    // dataUri adalah hasil gambar yang diambil dari kamera
    // this.setState({ photo: dataUri });
    console.log('dataUri', dataUri)
    setPhoto(dataUri);
  };

//   const handleChangeFacingMode = () => {
//     if (facingMode === FACING_MODES.USER) {
//         setFacingMode(FACING_MODES.ENVIRONMENT)
//     } else {
//         setFacingMode(FACING_MODES.USER)
//     }
//   }
  const handleCameraError = (error) => {
    setError('Terjadi Kesalahan saat mengakses kamera')
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative"
        onClose={onClose}
        style={{ zIndex: 999 }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                {/* <ChangeCircleTwoTone onClick={handleChangeFacingMode} /> */}
                {error && <div className="text-red-600">{error}</div>}
                {photo ? <>
                    <BaseButton text={"AMBIL ULANG"} onClick={() => setPhoto(false)} />
                    <img src={photo} alt="Gambar yang diambil" />
                </> : <Camera
                // isFullscreen={false}
                // idealFacingMode={facingMode}
                onTakePhoto={(dataUri) => {handleTakePhoto(dataUri)}}
                onCameraError={handleCameraError}
            />}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  TITLE
                </Dialog.Title>
                

                {/* <div className="mt-2">
                                        {
                                            !!customSubtitle
                                                ? customSubtitle
                                                : <p className="text-sm text-gray-500">{subTitle}</p>
                                        }
                                    </div>

                                    <div className='flex flex-row gap-3'>
                                        {!!negativeAction && !!negativeText ?
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={negativeAction}
                                                >
                                                    {negativeText}
                                                </button>
                                            </div>
                                            : null
                                        }

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={positiveAction}
                                            >
                                                {positiveText}
                                            </button>
                                        </div>
                                    </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCamera;
