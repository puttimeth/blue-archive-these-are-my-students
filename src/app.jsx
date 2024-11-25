import "./app.scss";
import { message, Modal } from "antd";
import { Footer, Header, HelpPanel } from "component";
import { ControlPanel } from "component/control-panel";
import {
  studentDefaultOrderSortData,
  studentData,
  studentEnSortData,
  studentThSortData,
} from "data";
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
  const [studentAvailability, setStudentAvailability] = useState(new Set()); // empty = don't use, item in array can be "Permanent", "Unique", "Event" or "Fest"
  const [studentSquadType, setStudentSquadType] = useState(""); // empty = don't use, "striker" = show only striker students, "special" = show only special students
  // sort config
  const [studentSortedBy, setStudentSortedBy] = useState("name"); // value can be either "name" or "release date"
  const [studentLng, setStudentLng] = useState(() => {
    return localStorage.getItem("lng") ?? "en";
  }); // support "en" and "th"
  // modal status
  const [configModalStatus, setConfigModalStatus] = useState(false);
  const [helpModalStatus, setHelpModalStatus] = useState(false);

  const initEmptyDeck = () => {
    let state = {};
    for (let id of Object.keys(studentData)) {
      state[id] = { owned: false, fav: false };
    }
    setDeckState(state);
  };

  useEffect(() => {
    // fetch state from params if possible, else init empty deck
    if (ds) {
      const newDeckState = base64ToDeckState(ds);
      if (typeof newDeckState === "string") {
        message.error(newDeckState);
        initEmptyDeck();
      } else {
        setDeckState(newDeckState);
      }
    } else {
      initEmptyDeck();
    }
  }, []);

  return (
    <>
      {/* Mobile Control Panel */}
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
          studentSortedBy={studentSortedBy}
          setStudentSortedBy={setStudentSortedBy}
          studentOwned={studentOwned}
          setStudentOwned={setStudentOwned}
          studentFav={studentFav}
          setStudentFav={setStudentFav}
          studentStar={studentStar}
          setStudentStar={setStudentStar}
          studentAvailability={studentAvailability}
          setStudentAvailability={setStudentAvailability}
          studentSquadType={studentSquadType}
          setStudentSquadType={setStudentSquadType}
          studentLng={studentLng}
          setStudentLng={setStudentLng}
        />
      </Modal>
      {/* Help Modal */}
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
        {/* Desktop Control Panel */}
        <ControlPanel
          studentSortedBy={studentSortedBy}
          setStudentSortedBy={setStudentSortedBy}
          studentOwned={studentOwned}
          setStudentOwned={setStudentOwned}
          studentFav={studentFav}
          setStudentFav={setStudentFav}
          studentStar={studentStar}
          setStudentStar={setStudentStar}
          studentAvailability={studentAvailability}
          setStudentAvailability={setStudentAvailability}
          studentSquadType={studentSquadType}
          setStudentSquadType={setStudentSquadType}
          studentLng={studentLng}
          setStudentLng={setStudentLng}
        />
        {/* Parent of student Card, called Deck. */}
        <div className="deck">
          {
            // choose SortData to be used
            (studentSortedBy === "name"
              ? studentLng === "en"
                ? studentEnSortData
                : studentThSortData
              : studentDefaultOrderSortData
            )
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
                // availability
                let availabilityFilter = true;
                if (studentAvailability.size > 0) {
                  if (
                    !studentAvailability.has(
                      studentData[studentId].availability,
                    )
                  )
                    starFilter = false;
                }
                // squad type
                let squadTypeFilter = true;
                if (studentSquadType !== "") {
                  if (studentSquadType !== studentData[studentId].squadType)
                    squadTypeFilter = false;
                }
                // summary
                return (
                  ownedFilter &&
                  favFilter &&
                  starFilter &&
                  availabilityFilter &&
                  squadTypeFilter
                );
              })
              .map((studentId) => (
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
                  <img src={`/students/${studentId}.webp`} alt="" />
                  <span>
                    {studentLng === "en"
                      ? studentData[studentId].nameEn
                      : studentData[studentId].nameTh}
                  </span>
                </div>
              ))
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
