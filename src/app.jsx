import "./app.scss";
import { message, Modal } from "antd";
import { Header, HelpPanel } from "component";
import { ControlPanel } from "component/control-panel";
import { studentData, studentEnSortData, studentThSortData } from "data";
import React, { useEffect, useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { useParams } from "react-router-dom";
import { base64ToDeckState } from "utils";

function App() {
  const { ds } = useParams();
  const [deckState, setDeckState] = useState();
  // filter config
  const [studentOwned, setStudentOwned] = useState(""); // empty = don't use, "owned" = show only owned students, "not owned" = show only not owned students
  const [studentFav, setStudentFav] = useState(""); // empty = don't use, "fav" = show only favorite students, "not fav" = show only not favorite students
  const [studentStar, setStudentStar] = useState(new Set()); // empty = don't use, item in array can be "1★", "2★" or "3★"
  const [studentSquadType, setStudentSquadType] = useState(""); // empty = don't use, "striker" = show only striker students, "special" = show only special students
  // sort config
  const [studentLng, setStudentLng] = useState(() => {
    return localStorage.getItem("lng") ?? "en";
  }); // support "en" and "th"
  // modal status
  const [configModalStatus, setConfigModalStatus] = useState(false);
  const [helpModalStatus, setHelpModalStatus] = useState(false);

  useEffect(() => {
    // fetch state from params if possible
    if (ds) {
      const newDeckState = base64ToDeckState(ds, Object.keys(studentData));
      if (typeof newDeckState === "string") {
        message.error(newDeckState);
      } else {
        setDeckState(newDeckState);
      }
    } else {
      // initialize deck state
      let state = {};
      for (let id of Object.keys(studentData)) {
        state[id] = { owned: false, fav: false };
      }
      setDeckState(state);
    }
  }, []);

  return (
    <>
      <Modal
        title={null}
        open={configModalStatus}
        footer={null}
        onCancel={() => {
          setConfigModalStatus(false);
        }}
        className="antd-modal-control-panel"
      >
        <ControlPanel
          isDesktop={false}
          studentOwned={studentOwned}
          setStudentOwned={setStudentOwned}
          studentFav={studentFav}
          setStudentFav={setStudentFav}
          studentStar={studentStar}
          setStudentStar={setStudentStar}
          studentSquadType={studentSquadType}
          setStudentSquadType={setStudentSquadType}
          studentLng={studentLng}
          setStudentLng={setStudentLng}
        />
      </Modal>
      <Modal
        title={null}
        open={helpModalStatus}
        footer={null}
        onCancel={() => {
          setHelpModalStatus(false);
        }}
      >
        <HelpPanel studentLng={studentLng} />
      </Modal>
      <div className="app">
        <div className="bg-image" />
        <Header
          deckState={deckState}
          setConfigModalStatus={setConfigModalStatus}
          setHelpModalStatus={setHelpModalStatus}
        />
        <ControlPanel
          studentOwned={studentOwned}
          setStudentOwned={setStudentOwned}
          studentFav={studentFav}
          setStudentFav={setStudentFav}
          studentStar={studentStar}
          setStudentStar={setStudentStar}
          studentSquadType={studentSquadType}
          setStudentSquadType={setStudentSquadType}
          studentLng={studentLng}
          setStudentLng={setStudentLng}
        />
        <div className="deck">
          {(studentLng === "en" ? studentEnSortData : studentThSortData)
            .filter((studentId) => {
              // filter student
              // owned
              let ownedFilter = true;
              if (studentOwned !== "") {
                if (studentOwned === "owned" && !deckState[studentId].owned)
                  ownedFilter = false;
                else if (
                  studentOwned === "not owned" &&
                  deckState[studentId].owned
                )
                  ownedFilter = false;
              }
              // favorite
              let favFilter = true;
              if (studentFav !== "") {
                if (studentFav === "fav" && !deckState[studentId].fav)
                  favFilter = false;
                else if (studentFav === "not fav" && deckState[studentId].fav)
                  favFilter = false;
              }
              // star
              let starFilter = true;
              if (studentStar.size > 0) {
                if (!studentStar.has(studentData[studentId].defaultStar))
                  starFilter = false;
              }
              // squad type
              let squadTypeFilter = true;
              if (studentSquadType !== "") {
                if (
                  studentSquadType === "striker" &&
                  studentData[studentId].squadType !== "Main"
                )
                  squadTypeFilter = false;
                else if (
                  studentSquadType === "special" &&
                  studentData[studentId].squadType !== "Support"
                )
                  squadTypeFilter = false;
              }
              // summary
              return ownedFilter && favFilter && starFilter && squadTypeFilter;
            })
            .map((studentId) => {
              const imgName = "images/students/" + studentId + ".webp";

              return (
                <div
                  key={studentId}
                  className={`card ${deckState?.[studentId]?.owned === true ? "owned" : ""}`}
                  onClick={() => {
                    if (studentId in deckState) {
                      setDeckState((prev) => ({
                        ...prev,
                        [studentId]: {
                          owned: !prev[studentId].owned,
                          fav: prev[studentId].fav,
                        },
                      }));
                    }
                  }}
                >
                  <button
                    className={`${deckState?.[studentId]?.fav === true ? "fav" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (studentId in deckState) {
                        setDeckState((prev) => ({
                          ...prev,
                          [studentId]: {
                            owned: prev[studentId].owned,
                            fav: !prev[studentId].fav,
                          },
                        }));
                      }
                    }}
                  >
                    {deckState?.[studentId]?.fav === true ? (
                      <MdOutlineStar />
                    ) : (
                      <MdOutlineStarBorder />
                    )}
                  </button>
                  <img src={new URL(imgName, import.meta.url)} alt="" />
                  <span>
                    {studentLng === "en"
                      ? studentData[studentId].nameEn
                      : studentData[studentId].nameTh}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
