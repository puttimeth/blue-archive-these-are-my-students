import "./app.scss";
import { message, Modal } from "antd";
import { DownloadModal, Footer, Header, HelpModal } from "component";
import { ControlPanel } from "component/control-panel";
import {
  studentDefaultOrderSortData,
  studentData,
  studentEnSortData,
  studentThSortData,
  ticketData,
  shopDataJp,
  miscDataJp,
  shopDataGlobal,
  miscDataGlobal,
} from "data";
import React, { useEffect, useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { useParams } from "react-router-dom";
import { base64ToDeckState } from "utils";

function App() {
  const { ds } = useParams();
  const [deckState, setDeckState] = useState();
  const [filteredStudents, setFilteredStudents] = useState([]);
  // number of students
  const [noStudentShown, setNoStudentShown] = useState(0);
  const [noStudentOwned, setNoStudentOwned] = useState(0);
  const [noStudentFav, setNoStudentFav] = useState(0);
  const [noStudent, setNoStudent] = useState(0);
  // filter config
  const [studentServer, setStudentServer] = useState("jp"); // value can be either "jp" or "global"
  const [studentOwned, setStudentOwned] = useState(""); // empty = don't use, "owned" = show only owned students, "not owned" = show only not owned students
  const [studentFav, setStudentFav] = useState(""); // empty = don't use, "fav" = show only favorite students, "not fav" = show only not favorite students
  const [studentStar, setStudentStar] = useState(new Set()); // empty = don't use, item in array can be "1★", "2★" or "3★"
  const [studentAvailability, setStudentAvailability] = useState(new Set()); // empty = don't use, item in array can be "Permanent", "Unique", "Event" or "Fest"
  const [studentTicket, setStudentTicket] = useState({}); // 0 = don't use, 1 = include, 2 = exclude
  const [studentShop, setStudentShop] = useState({}); // 0 = don't use, 1 = include, 2 = exclude
  const [studentMisc, setStudentMisc] = useState({}); // 0 = don't use, 1 = include, 2 = exclude
  const [studentSquadType, setStudentSquadType] = useState(""); // empty = don't use, "striker" = show only striker students, "special" = show only special students
  const [studentRole, setStudentRole] = useState(new Set()); // empty = don't use, item in array can be "Tanker", "DamageDealer", "Healer", "Supporter" or "Vehicle"
  const [studentAttackType, setStudentAttackType] = useState(new Set()); // empty = don't use, item in array can be "Explosion", "Pierce", "Mystic" or "Sonic"
  const [studentDefenseType, setStudentDefenseType] = useState(new Set()); // empty = don't use, item in array can be "LightArmor", "HeavyArmor", "Unarmed" or "ElasticArmor"
  // sort config
  const [studentSortedBy, setStudentSortedBy] = useState("name"); // value can be either "name" or "release date"
  const [studentLng, setStudentLng] = useState("en"); // support "en" and "th"
  const [isSortedByAscending, setIsSortedByAscending] = useState(true); // true = ascending, false = descending
  // modal status
  const [configModalStatus, setConfigModalStatus] = useState(false);
  const [helpModalStatus, setHelpModalStatus] = useState(false);
  const [downloadModalStatus, setDownloadModalStatus] = useState(false);

  const initEmptyDeck = () => {
    let state = {};
    for (let id of Object.keys(studentData)) {
      state[id] = { owned: false, fav: false };
    }
    setDeckState(state);
    setNoStudentOwned(0);
    setNoStudentFav(0);
  };

  const initConfig = () => {
    let currentConfig = localStorage.getItem("config");
    if (!currentConfig) return;
    currentConfig = JSON.parse(currentConfig);
    if (currentConfig.studentServer) {
      setStudentServer(currentConfig.studentServer);
    }
    if (currentConfig.studentOwned) {
      setStudentOwned(currentConfig.studentOwned);
    }
    if (currentConfig.studentFav) {
      setStudentFav(currentConfig.studentFav);
    }
    if (currentConfig.studentStar) {
      setStudentStar(new Set(currentConfig.studentStar));
    }
    if (currentConfig.studentAvailability) {
      setStudentAvailability(new Set(currentConfig.studentAvailability));
    }
    if (currentConfig.studentTicket) {
      // remove key that didn't appear in data
      let currentStudentTicket = {};
      for (let key of Object.keys(currentConfig.studentTicket)) {
        if (Object.keys(ticketData).includes(key)) {
          currentStudentTicket = {
            ...currentStudentTicket,
            [key]: currentConfig.studentTicket[key],
          };
        }
      }
      setStudentTicket(currentStudentTicket);
    }
    if (currentConfig.studentShop) {
      // remove key that didn't appear in data
      let currentStudentShop = {};
      for (let key of Object.keys(currentConfig.studentShop)) {
        if (Object.keys(shopDataJp).includes(key)) {
          currentStudentShop = {
            ...currentStudentShop,
            [key]: currentConfig.studentShop[key],
          };
        }
      }
      setStudentShop(currentStudentShop);
    }
    if (currentConfig.studentMisc) {
      // remove key that didn't appear in data
      let currentStudentMisc = {};
      for (let key of Object.keys(currentConfig.studentMisc)) {
        if (Object.keys(miscDataJp).includes(key)) {
          currentStudentMisc = {
            ...currentStudentMisc,
            [key]: currentConfig.studentMisc[key],
          };
        }
      }
      setStudentMisc(currentStudentMisc);
    }
    if (currentConfig.studentSquadType) {
      setStudentSquadType(currentConfig.studentSquadType);
    }
    if (currentConfig.studentAttackType) {
      setStudentAttackType(new Set(currentConfig.studentAttackType));
    }
    if (currentConfig.studentDefenseType) {
      setStudentDefenseType(new Set(currentConfig.studentDefenseType));
    }
    if (currentConfig.studentRole) {
      setStudentRole(new Set(currentConfig.studentRole));
    }
    if (currentConfig.studentSortedBy) {
      setStudentSortedBy(currentConfig.studentSortedBy);
    }
    if (currentConfig.studentLng) {
      setStudentLng(currentConfig.studentLng);
    }
    if (currentConfig.isSortedByAscending !== undefined) {
      setIsSortedByAscending(currentConfig.isSortedByAscending);
    }
  };

  const saveConfig = () => {
    const currentConfig = {
      studentServer: studentServer,
      studentOwned: studentOwned,
      studentFav: studentFav,
      studentStar: studentStar,
      studentAvailability: studentAvailability,
      studentTicket: studentTicket,
      studentShop: studentShop,
      studentMisc: studentMisc,
      studentSquadType: studentSquadType,
      studentAttackType: studentAttackType,
      studentDefenseType: studentDefenseType,
      studentRole: studentRole,
      studentSortedBy: studentSortedBy,
      studentLng: studentLng,
      isSortedByAscending: isSortedByAscending,
    };
    localStorage.setItem(
      "config",
      JSON.stringify(currentConfig, (_, value) =>
        value instanceof Set ? [...value] : value,
      ),
    );
  };

  useEffect(() => {
    setNoStudent(studentDefaultOrderSortData.length);
    // initialize ticket
    let newStudentTicket = {};
    for (let ticket of Object.keys(ticketData)) {
      newStudentTicket[ticket] = 0;
    }
    setStudentTicket(newStudentTicket);
    // initialize shop
    let newStudentShop = {};
    for (let shop of Object.keys(shopDataJp)) {
      newStudentShop[shop] = 0;
    }
    setStudentShop(newStudentShop);
    // initialize misc
    let newStudentMisc = {};
    for (let misc of Object.keys(miscDataJp)) {
      newStudentMisc[misc] = 0;
    }
    setStudentMisc(newStudentMisc);
    // fetch state from params if possible, else init empty deck
    if (ds) {
      const newDeckState = base64ToDeckState(ds);
      if (typeof newDeckState === "string") {
        message.error(newDeckState);
        initEmptyDeck();
      } else {
        setDeckState(newDeckState);
        setNoStudentOwned(
          Object.values(newDeckState).filter(({ owned }) => owned === true)
            .length,
        );
        setNoStudentFav(
          Object.values(newDeckState).filter(({ fav }) => fav === true).length,
        );
      }
    } else {
      initEmptyDeck();
    }
    // initialize config from local storage
    initConfig();
  }, []);

  // useEffect for save config
  useEffect(() => {
    saveConfig();
  }, [
    studentServer,
    studentOwned,
    studentFav,
    studentStar,
    studentAvailability,
    studentTicket,
    studentShop,
    studentMisc,
    studentSquadType,
    studentAttackType,
    studentDefenseType,
    studentRole,
    studentSortedBy,
    studentLng,
    isSortedByAscending,
  ]);

  // useEffect for updating student shown
  useEffect(() => {
    // choose SortData to be used
    let targetStudents =
      studentSortedBy === "name"
        ? studentLng === "en"
          ? studentEnSortData
          : studentThSortData
        : studentDefaultOrderSortData;
    if (isSortedByAscending === false) {
      targetStudents = targetStudents.toReversed();
    }
    // generate ticket student pool
    let ticketIdPool = undefined;
    if (Object.values(studentTicket).some((e) => e !== 0)) {
      let unionPool = new Set();
      let differencePool = new Set();
      for (let [ticket, value] of Object.entries(studentTicket)) {
        if (value === 1) {
          unionPool = unionPool.union(ticketData[ticket]);
        } else if (value === 2) {
          differencePool = differencePool.union(ticketData[ticket]);
        }
      }
      if (unionPool.size === 0)
        unionPool = new Set(studentDefaultOrderSortData);
      ticketIdPool = unionPool.difference(differencePool);
    }
    // generate shop student pool
    let shopIdPool = undefined;
    let shopData = studentServer === "jp" ? shopDataJp : shopDataGlobal;
    if (Object.values(studentShop).some((e) => e !== 0)) {
      let unionPool = new Set();
      let differencePool = new Set();
      for (let [shop, value] of Object.entries(studentShop)) {
        if (value === 1) {
          unionPool = unionPool.union(shopData[shop]);
        } else if (value === 2) {
          differencePool = differencePool.union(shopData[shop]);
        }
      }
      if (unionPool.size === 0)
        unionPool = new Set(studentDefaultOrderSortData);
      shopIdPool = unionPool.difference(differencePool);
    }
    // generate misc student pool
    let miscIdPool = undefined;
    let miscData = studentServer === "jp" ? miscDataJp : miscDataGlobal;
    if (Object.values(studentMisc).some((e) => e !== 0)) {
      let unionPool = new Set();
      let differencePool = new Set();
      for (let [misc, value] of Object.entries(studentMisc)) {
        if (value === 1) {
          unionPool = unionPool.union(miscData[misc]);
        } else if (value === 2) {
          differencePool = differencePool.union(miscData[misc]);
        }
      }
      if (unionPool.size === 0)
        unionPool = new Set(studentDefaultOrderSortData);
      miscIdPool = unionPool.difference(differencePool);
    }
    // apply filter
    targetStudents = targetStudents.filter((studentId) => {
      // filter student
      // server
      if (
        studentServer === "global" &&
        studentData[studentId].isJpOnly === true
      )
        return false;
      // owned
      if (
        (studentOwned === "owned" && !deckState[studentId].owned) ||
        (studentOwned === "not owned" && deckState[studentId].owned)
      )
        return false;
      // favorite
      if (
        (studentFav === "fav" && !deckState[studentId].fav) ||
        (studentFav === "not fav" && deckState[studentId].fav)
      )
        return false;
      // star
      if (
        studentStar.size > 0 &&
        !studentStar.has(studentData[studentId].defaultStar)
      )
        return false;
      // availability
      if (
        studentAvailability.size > 0 &&
        !studentAvailability.has(studentData[studentId].availability)
      )
        return false;
      // ticket
      if (ticketIdPool !== undefined && !ticketIdPool.has(studentId))
        return false;
      // shop
      if (shopIdPool !== undefined && !shopIdPool.has(studentId)) return false;
      // misc
      if (miscIdPool !== undefined && !miscIdPool.has(studentId)) return false;
      // squad type
      if (
        studentSquadType !== "" &&
        studentSquadType !== studentData[studentId].squadType
      )
        return false;
      // role
      if (
        studentRole.size > 0 &&
        !studentRole.has(studentData[studentId].tacticRole)
      )
        return false;
      // attack type
      if (
        studentAttackType.size > 0 &&
        !studentAttackType.has(studentData[studentId].bulletType)
      )
        return false;
      // defense type
      if (
        studentDefenseType.size > 0 &&
        !studentDefenseType.has(studentData[studentId].armorType)
      )
        return false;
      // pass all filter, return true
      return true;
    });
    setFilteredStudents(targetStudents);
    setNoStudentShown(targetStudents.length);
  }, [
    studentSortedBy,
    studentLng,
    studentServer,
    studentOwned,
    studentFav,
    studentStar,
    studentAvailability,
    studentTicket,
    studentShop,
    studentMisc,
    studentSquadType,
    studentRole,
    studentAttackType,
    studentDefenseType,
    isSortedByAscending,
  ]);

  // DEBUG; print id of students which are marked as owned
  // useEffect(() => {
  //   console.log(
  //     deckState &&
  //       Object.entries(deckState)
  //         ?.filter?.(([_, data]) => data.owned === true)
  //         ?.map?.(([idx, _]) => idx),
  //   );
  // }, [deckState]);

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
          studentServer={studentServer}
          setStudentServer={setStudentServer}
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
          studentTicket={studentTicket}
          setStudentTicket={setStudentTicket}
          studentShop={studentShop}
          setStudentShop={setStudentShop}
          studentMisc={studentMisc}
          setStudentMisc={setStudentMisc}
          studentSquadType={studentSquadType}
          setStudentSquadType={setStudentSquadType}
          studentRole={studentRole}
          setStudentRole={setStudentRole}
          studentAttackType={studentAttackType}
          setStudentAttackType={setStudentAttackType}
          studentDefenseType={studentDefenseType}
          setStudentDefenseType={setStudentDefenseType}
          studentLng={studentLng}
          setStudentLng={setStudentLng}
          noStudent={noStudent}
          noStudentShown={noStudentShown}
          noStudentOwned={noStudentOwned}
          noStudentFav={noStudentFav}
          isSortedByAscending={isSortedByAscending}
          setIsSortedByAscending={setIsSortedByAscending}
        />
      </Modal>
      {/* Help Modal */}
      <HelpModal
        modalStatus={helpModalStatus}
        setModalStatus={setHelpModalStatus}
        studentLng={studentLng}
      />
      {/* Download Modal */}
      <DownloadModal
        modalStatus={downloadModalStatus}
        setModalStatus={setDownloadModalStatus}
        deckState={deckState}
        filteredStudents={filteredStudents}
        studentLng={studentLng}
      />
      <div className="app">
        <div className="bg-image" />
        <Header
          setConfigModalStatus={setConfigModalStatus}
          setHelpModalStatus={setHelpModalStatus}
          setDownloadModalStatus={setDownloadModalStatus}
        />
        {/* Desktop Control Panel */}
        <ControlPanel
          studentServer={studentServer}
          setStudentServer={setStudentServer}
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
          studentTicket={studentTicket}
          setStudentTicket={setStudentTicket}
          studentShop={studentShop}
          setStudentShop={setStudentShop}
          studentMisc={studentMisc}
          setStudentMisc={setStudentMisc}
          studentSquadType={studentSquadType}
          setStudentSquadType={setStudentSquadType}
          studentRole={studentRole}
          setStudentRole={setStudentRole}
          studentAttackType={studentAttackType}
          setStudentAttackType={setStudentAttackType}
          studentDefenseType={studentDefenseType}
          setStudentDefenseType={setStudentDefenseType}
          studentLng={studentLng}
          setStudentLng={setStudentLng}
          noStudent={noStudent}
          noStudentShown={noStudentShown}
          noStudentOwned={noStudentOwned}
          noStudentFav={noStudentFav}
          isSortedByAscending={isSortedByAscending}
          setIsSortedByAscending={setIsSortedByAscending}
        />
        {/* Parent of student Card, called Deck. */}
        <div className="deck">
          {
            // generate student card
            filteredStudents.map((studentId) => (
              <div
                key={studentId}
                className={`card ${deckState?.[studentId]?.owned === true ? "owned" : ""}`}
                onClick={() => {
                  if (studentId in deckState) {
                    // update no student owned
                    if (deckState?.[studentId]?.owned === true)
                      setNoStudentOwned((prev) => prev - 1);
                    else setNoStudentOwned((prev) => prev + 1);
                    // update deck state
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
                      // update no student fav
                      if (deckState?.[studentId]?.fav === true)
                        setNoStudentFav((prev) => prev - 1);
                      else setNoStudentFav((prev) => prev + 1);
                      // update deck state
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
