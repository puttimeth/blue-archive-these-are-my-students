import "./app.scss";
import { Header } from "component";
import { ControlPanel } from "component/control-panel";
import { studentData, studentEnSortData, studentThSortData } from "data";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base64ToDeckState } from "utils";

function App() {
  const { ds } = useParams();
  const [deckState, setDeckState] = useState();
  // filter config
  const [studentOwned, setStudentOwned] = useState(""); // empty = don't use, "owned" = show only owned students, "not owned" = show only not owned students
  const [studentStar, setStudentStar] = useState([]); // empty = don't use, item in array can be "1★", "2★" or "3★"
  const [studentSquadType, setStudentSquadType] = useState(""); // empty = don't use, "striker" = show only striker students, "special" = show only special students
  const [studentLng, setStudentLng] = useState("en"); // support "en" and "th"

  useEffect(() => {
    // fetch state from params if possible
    if (ds) {
      const newDeckState = base64ToDeckState(ds, Object.keys(studentData));
      console.log(ds, newDeckState);
      setDeckState(newDeckState);
    } else {
      // initialize deck state
      let state = {};
      for (let id of Object.keys(studentData)) {
        state[id] = { owned: false };
      }
      setDeckState(state);
    }
  }, []);

  return (
    <div className="app">
      <div className="bg-image" />
      <Header deckState={deckState} />
      <ControlPanel studentLng={studentLng} setStudentLng={setStudentLng} />
      <div className="deck">
        {(studentLng === "en" ? studentEnSortData : studentThSortData).map(
          (studentId) => {
            const imgName = "images/students/" + studentId + ".webp";

            return (
              <button
                key={studentId}
                className={`card ${deckState?.[studentId]?.owned === true ? "owned" : ""}`}
                onClick={() => {
                  if (studentId in deckState) {
                    setDeckState((prev) => ({
                      ...prev,
                      [studentId]: { owned: !prev[studentId].owned },
                    }));
                  }
                }}
              >
                <img src={new URL(imgName, import.meta.url)} alt="" />
                <span>
                  {studentLng === "en"
                    ? studentData[studentId].nameEn
                    : studentData[studentId].nameTh}
                </span>
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}

export default App;
