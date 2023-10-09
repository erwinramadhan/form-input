import { useEffect, useState } from "react";
import { makeGetRegenciesRequest } from "../service/regenciesService";
import { makeGetDistrictsRequest } from "../service/districtsService";

function useDomicilyForm() {
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [isLoadingRegencies, setIsLoadingRegencies] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);

  const onChangeSelectRegency = (newValue, setKabupaten, setKecamatan) => {
    setSelectedDistrict(undefined);
    setKecamatan(null);
    setSelectedRegency(newValue);
    getDistricts(newValue.value);
    setKabupaten(newValue.label);
  };

  const fetchedDetail = (newValueRegency, newValueDistrict) => {
    setSelectedRegency(newValueRegency)
    setSelectedDistrict(newValueDistrict)
  }

  const onChangeSelectDistrict = (newValue, setKecamatan) => {
    setSelectedDistrict(newValue)
    setKecamatan(newValue.label)
}

  const toggleLoadingRegencies = () => setIsLoadingRegencies((prev) => !prev);
  const toggleLoadingDistricts = () => setIsLoadingDistricts((prev) => !prev);

  const getRegencies = async () => {
    try {
      toggleLoadingRegencies();
      const result = await makeGetRegenciesRequest();
      const tempRegencies = result.map((el) => ({
        label: el.name,
        value: el.id,
      }));
      setRegencies(tempRegencies);
      toggleLoadingRegencies();
    } catch (err) {
      toggleLoadingRegencies();
    }
  };

  const getDistricts = async (id) => {
    try {
      toggleLoadingDistricts();
      const result = await makeGetDistrictsRequest(id);
      const tempDistricts = result.map((el) => ({
        label: el.name,
        value: el.id,
      }));
      setDistricts(tempDistricts);
      toggleLoadingDistricts();
    } catch (err) {
      toggleLoadingDistricts();
    }
  };

  useEffect(() => {
    getRegencies()
}, [])

  return {
    regencies,
    districts,
    onChangeSelectRegency,
    onChangeSelectDistrict,
    isLoadingRegencies,
    isLoadingDistricts,
    selectedRegency,
    selectedDistrict,
    fetchedDetail
  };
}

export default useDomicilyForm;
