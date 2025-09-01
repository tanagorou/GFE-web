import { useLocation, Location, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Study from "../components/Study";
import SetupStudyTime from "../components/SetupStudyTime";
import SetupRestTime from "../components/SetupReatTime";

type BackgroundLocation = { background: Location | undefined };

export interface BackgroundState {
  background?: Location
}

export default function StudyPage() {
  const [ studyTimeMs, setStudyTimeMs ] = useState(0)
  const [ restTimeMs, setRestTimeMs ] = useState(0)

  const location = useLocation();
  const navigate = useNavigate();
  const background = (location.state as BackgroundLocation)?.background;

  const openStudyModal = () => {
    navigate('/modal_study', { state: {background: location}})
  }

  const closeModal = () => {
    const back = (location.state as BackgroundState)?.background
    navigate(back?.pathname ?? '/study', {replace: true})
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path="/study" element={<Study studyTime={studyTimeMs} restTime={restTimeMs} onOpenStudy={openStudyModal}/>}/>
        <Route path="/modal_study" element={<SetupStudyTime onChangeTime={setStudyTimeMs} onNext={() => navigate('/modal_rest',{ state:{ background }})} onClose={closeModal}/>} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/modal_study" element={ <SetupStudyTime onChangeTime={setStudyTimeMs} onNext={() => navigate('/modal_rest',{ state:{ background }})} onClose={closeModal}/>}/>
          <Route path="/modal_rest" element={<SetupRestTime onChangeTime={setRestTimeMs} onClose={closeModal}/>}/>
        </Routes>
      )}
    </>
  );
}
