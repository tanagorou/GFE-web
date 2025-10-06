import { useLocation, Location, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Study from "../components/Study";
import SetupStudyTime from "../components/SetupStudyTime";
import SetupRestTime from "../components/SetupReatTime";
import { useStudyTime } from "../context/StudyContext";
import { RecordConfirmModal } from "../components/RecordConfirmModal";

type BackgroundLocation = { background: Location | undefined };

export interface BackgroundState {
  background?: Location
}

export default function StudyPage() {
  const { studyTime, setStudyTime, restTime, setRestTime } = useStudyTime()
  // const [ studyTimeMs, setStudyTimeMs ] = useState(0)
  // const [ restTimeMs, setRestTimeMs ] = useState(0)


  const location = useLocation();
  const navigate = useNavigate();
  const background = (location.state as BackgroundLocation)?.background;

  console.log(location)

  const openStudyModal = () => {
    navigate('/study/modal_study', { state: {background: location}})
  }

  const openRestModal = () => {
    navigate('/study/modal_rest', { state: {background: location}})
  }

  const openRecordConfirmModal = () => {
    navigate('/study/modal_record_confirm', { state: {background: location}})
  }

  const closeModal = () => {
    const back = (location.state as BackgroundState)?.background
    navigate('/study', {replace: true})
  }

  return (
    <>
      <Routes location={background || location}>
        <Route index element={<Study studyTime={studyTime} restTime={restTime} onOpenStudy={openStudyModal} onOpenRest={openRestModal} onOpenRecordConfirmModal={openRecordConfirmModal}/>}/>
        <Route path="modal_study" element={<SetupStudyTime onChangeTime={setStudyTime} onNext={() => navigate('/study/modal_rest',{ state:{ background }})} onClose={closeModal}/>} />
      </Routes>
      {background && (
        <Routes>
          <Route path="modal_study" element={<SetupStudyTime onChangeTime={setStudyTime} onNext={() => navigate('/study/modal_rest',{ state:{ background }})} onClose={closeModal}/>}/>
          <Route path="modal_rest" element={<SetupRestTime onChangeTime={setRestTime} onBack={() => navigate('/study/modal_study',{ state:{ background }})} onClose={closeModal}/>}/>
          <Route path="modal_record_confirm" element={<RecordConfirmModal closeModal={closeModal}/>}/>
        </Routes>
      )}
    </>
  );
}
