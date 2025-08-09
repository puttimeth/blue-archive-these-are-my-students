import "./control-panel.scss";
import { Button, Input } from "antd";
import {
  shopDataJp,
  ticketData,
  miscDataJp,
  StudentAttackType,
  StudentRole,
  StudentDefenseType,
  AttackDefenseTypeColor,
} from "data";
import React from "react";
import { ImSortNumbericDesc, ImSortNumericAsc } from "react-icons/im";
import { PiMinusSquare, PiPlusSquare } from "react-icons/pi";

const StarButton = ({ studentStar, setStudentStar, starValue }) => {
  return (
    <Button
      type={studentStar?.has?.(starValue) ? "primary" : "default"}
      onClick={() => {
        let s = new Set(studentStar);
        if (studentStar?.has?.(starValue)) {
          s.delete(starValue);
        } else {
          s.add(starValue);
        }
        setStudentStar(s);
      }}
    >
      {starValue}★
    </Button>
  );
};

const RoleButton = ({ studentRole, setStudentRole, roleValue }) => (
  <Button
    type={studentRole?.has?.(roleValue) ? "primary" : "default"}
    style={{ display: "flex", gap: "4px", padding: "4px 8px" }}
    onClick={() => {
      let s = new Set(studentRole);
      if (studentRole?.has?.(roleValue)) {
        s.delete(roleValue);
      } else {
        s.add(roleValue);
      }
      setStudentRole(s);
    }}
  >
    <img
      src={`/icon/Role_${roleValue}.png`}
      alt=""
      style={{
        height: "100%",
        width: "auto",
        ...(studentRole?.has?.(roleValue)
          ? {}
          : { filter: "brightness(0) saturate(100%)" }),
      }}
    />
    {StudentRole[roleValue]}
  </Button>
);

const AttackDefenseTypeButton = ({
  type,
  studentType,
  setStudentType,
  typeValue,
  typeValueIndex,
}) => (
  <Button
    type={studentType?.has?.(typeValue) ? "primary" : "default"}
    onClick={() => {
      let s = new Set(studentType);
      if (studentType?.has?.(typeValue)) {
        s.delete(typeValue);
      } else {
        s.add(typeValue);
      }
      setStudentType(s);
    }}
    style={{
      padding: "0 12px 0 0",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: "4px",
        boxSizing: "border-box",
        borderRadius: "6px 0 0 6px",
        backgroundColor: AttackDefenseTypeColor[typeValueIndex],
      }}
    >
      <img
        src={`/icon/Type_${type}.png`}
        alt=""
        style={{
          height: "16px",
          width: "auto",
        }}
      />
    </div>
    {type === "Attack"
      ? StudentAttackType[typeValue]
      : StudentDefenseType[typeValue]}
  </Button>
);

const AvailabilityButton = ({
  studentAvailability,
  setStudentAvailability,
  availabilityValue,
}) => {
  return (
    <Button
      type={studentAvailability.has(availabilityValue) ? "primary" : "default"}
      onClick={() => {
        let s = new Set(studentAvailability);
        if (studentAvailability.has(availabilityValue)) {
          s.delete(availabilityValue);
        } else {
          s.add(availabilityValue);
        }
        setStudentAvailability(s);
      }}
    >
      {availabilityValue}
    </Button>
  );
};

export const ControlPanel = ({
  isDesktop = true,
  studentSearch,
  setStudentSearch,
  studentServer,
  setStudentServer,
  studentSortedBy,
  setStudentSortedBy,
  studentOwned,
  setStudentOwned,
  studentFav,
  setStudentFav,
  studentStar,
  setStudentStar,
  studentAvailability,
  setStudentAvailability,
  studentTicket,
  setStudentTicket,
  studentShop,
  setStudentShop,
  studentMisc,
  setStudentMisc,
  studentSquadType,
  setStudentSquadType,
  studentRole,
  setStudentRole,
  studentAttackType,
  setStudentAttackType,
  studentDefenseType,
  setStudentDefenseType,
  studentLng,
  setStudentLng,
  noStudent,
  noStudentShown,
  noStudentOwned,
  noStudentFav,
  isSortedByAscending,
  setIsSortedByAscending,
}) => {
  return (
    <div className={`control-panel ${isDesktop ? "desktop" : ""}`}>
      <span>
        Show {noStudentShown}/{noStudent}
      </span>
      <Input
        placeholder="Search"
        allowClear={true}
        value={studentSearch}
        onChange={(e) => setStudentSearch(e.target.value)}
      />
      <div className="scrollable-part">
        {/* Server */}
        <div>
          <span>Server</span>
          <div>
            <Button
              type={studentServer === "jp" ? "primary" : "default"}
              onClick={() => {
                setStudentServer("jp");
              }}
            >
              JP
            </Button>
            <Button
              type={studentServer === "global" ? "primary" : "default"}
              onClick={() => {
                setStudentServer("global");
              }}
            >
              Global
            </Button>
          </div>
        </div>
        {/* Sorted By */}
        <div>
          <span>Sorted By</span>
          <div>
            <Button
              shape="circle"
              onClick={() => {
                setIsSortedByAscending((prev) => !prev);
              }}
            >
              {isSortedByAscending === true && <ImSortNumericAsc />}
              {isSortedByAscending === false && <ImSortNumbericDesc />}
            </Button>
            <Button
              type={studentSortedBy === "name" ? "primary" : "default"}
              onClick={() => {
                setStudentSortedBy("name");
              }}
            >
              Name
            </Button>
            <Button
              type={studentSortedBy === "release date" ? "primary" : "default"}
              onClick={() => {
                setStudentSortedBy("release date");
              }}
            >
              Release Date
            </Button>
          </div>
        </div>
        {/* Owned Status */}
        <div>
          <span>
            Owned ({noStudentOwned}/{noStudent})
          </span>
          <div>
            <Button
              type={studentOwned === "owned" ? "primary" : "default"}
              onClick={() => {
                setStudentOwned((prev) => (prev === "owned" ? "" : "owned"));
              }}
            >
              Owned
            </Button>
            <Button
              type={studentOwned === "not owned" ? "primary" : "default"}
              onClick={() => {
                setStudentOwned((prev) =>
                  prev === "not owned" ? "" : "not owned",
                );
              }}
            >
              Not Owned
            </Button>
          </div>
        </div>
        {/* Favorite Status */}
        <div>
          <span>
            Favorite ({noStudentFav}/{noStudent})
          </span>
          <div>
            <Button
              type={studentFav === "fav" ? "primary" : "default"}
              onClick={() => {
                setStudentFav((prev) => (prev === "fav" ? "" : "fav"));
              }}
            >
              Favorite
            </Button>
            <Button
              type={studentFav === "not fav" ? "primary" : "default"}
              onClick={() => {
                setStudentFav((prev) => (prev === "not fav" ? "" : "not fav"));
              }}
            >
              Not Favorite
            </Button>
          </div>
        </div>
        {/* Star */}
        <div>
          <span>Star</span>
          <div>
            <StarButton
              studentStar={studentStar}
              setStudentStar={setStudentStar}
              starValue={1}
            />
            <StarButton
              studentStar={studentStar}
              setStudentStar={setStudentStar}
              starValue={2}
            />
            <StarButton
              studentStar={studentStar}
              setStudentStar={setStudentStar}
              starValue={3}
            />
          </div>
        </div>
        {/* Availability */}
        <div>
          <span>Availability</span>
          <div>
            <AvailabilityButton
              studentAvailability={studentAvailability}
              setStudentAvailability={setStudentAvailability}
              availabilityValue="Permanent"
            />
            <AvailabilityButton
              studentAvailability={studentAvailability}
              setStudentAvailability={setStudentAvailability}
              availabilityValue="Unique"
            />
          </div>
          <div>
            <AvailabilityButton
              studentAvailability={studentAvailability}
              setStudentAvailability={setStudentAvailability}
              availabilityValue="Event"
            />
            <AvailabilityButton
              studentAvailability={studentAvailability}
              setStudentAvailability={setStudentAvailability}
              availabilityValue="Fest"
            />
          </div>
        </div>
        {/* Ticket */}
        <div>
          <span>Ticket</span>
          {Object.keys(ticketData).map((ticket) => (
            <div key={ticket}>
              <Button
                className={
                  studentTicket?.[ticket] === 1
                    ? "green"
                    : studentTicket?.[ticket] === 2
                      ? "red"
                      : "default"
                }
                onClick={() => {
                  let newValue = studentTicket?.[ticket] ?? 0;
                  newValue += 1;
                  if (newValue > 2) newValue = 0;
                  setStudentTicket((prev) => ({ ...prev, [ticket]: newValue }));
                }}
              >
                {ticket}
              </Button>
              {studentTicket?.[ticket] === 0 && (
                <div style={{ width: "20px" }} />
              )}
              {studentTicket?.[ticket] === 1 && (
                <PiPlusSquare size={20} color="#198754" />
              )}
              {studentTicket?.[ticket] === 2 && (
                <PiMinusSquare size={20} color="#ff4d4f" />
              )}
            </div>
          ))}
        </div>
        {/* Shop */}
        <div>
          <span>Shop</span>
          {Object.keys(shopDataJp).map((shop) => (
            <div key={shop}>
              <Button
                className={
                  studentShop?.[shop] === 1
                    ? "green"
                    : studentShop?.[shop] === 2
                      ? "red"
                      : "default"
                }
                onClick={() => {
                  let newValue = studentShop?.[shop] ?? 0;
                  newValue += 1;
                  if (newValue > 2) newValue = 0;
                  setStudentShop((prev) => ({ ...prev, [shop]: newValue }));
                }}
              >
                {shop}
              </Button>
              {studentShop?.[shop] === 0 && <div style={{ width: "20px" }} />}
              {studentShop?.[shop] === 1 && (
                <PiPlusSquare size={20} color="#198754" />
              )}
              {studentShop?.[shop] === 2 && (
                <PiMinusSquare size={20} color="#ff4d4f" />
              )}
            </div>
          ))}
        </div>
        {/* Misc */}
        <div>
          <span>Misc.</span>
          {Object.keys(miscDataJp).map((misc) => (
            <div key={misc}>
              <Button
                className={
                  studentMisc?.[misc] === 1
                    ? "green"
                    : studentMisc?.[misc] === 2
                      ? "red"
                      : "default"
                }
                onClick={() => {
                  let newValue = studentMisc?.[misc] ?? 0;
                  newValue += 1;
                  if (newValue > 2) newValue = 0;
                  setStudentMisc((prev) => ({ ...prev, [misc]: newValue }));
                }}
              >
                {misc}
              </Button>
              {studentMisc?.[misc] === 0 && <div style={{ width: "20px" }} />}
              {studentMisc?.[misc] === 1 && (
                <PiPlusSquare size={20} color="#198754" />
              )}
              {studentMisc?.[misc] === 2 && (
                <PiMinusSquare size={20} color="#ff4d4f" />
              )}
            </div>
          ))}
        </div>
        {/* Squad Type */}
        <div>
          <span>Squad Type</span>
          <div>
            <Button
              type={studentSquadType === "Main" ? "primary" : "default"}
              onClick={() => {
                setStudentSquadType((prev) => (prev === "Main" ? "" : "Main"));
              }}
            >
              Striker
            </Button>
            <Button
              type={studentSquadType === "Support" ? "primary" : "default"}
              onClick={() => {
                setStudentSquadType((prev) =>
                  prev === "Support" ? "" : "Support",
                );
              }}
            >
              Special
            </Button>
          </div>
        </div>
        {/* Role */}
        <div>
          <span>Role</span>
          <div>
            {Object.keys(StudentRole)
              .slice(0, 3)
              .map((role) => (
                <RoleButton
                  key={role}
                  studentRole={studentRole}
                  setStudentRole={setStudentRole}
                  roleValue={role}
                />
              ))}
          </div>
          <div>
            {Object.keys(StudentRole)
              .slice(3)
              .map((role) => (
                <RoleButton
                  key={role}
                  studentRole={studentRole}
                  setStudentRole={setStudentRole}
                  roleValue={role}
                />
              ))}
          </div>
        </div>
        {/* Attack Type */}
        <div>
          <span>Attack Type</span>
          <div>
            {Object.keys(StudentAttackType)
              .slice(0, 2)
              .map((t, idx) => (
                <AttackDefenseTypeButton
                  key={t}
                  type="Attack"
                  studentType={studentAttackType}
                  setStudentType={setStudentAttackType}
                  typeValue={t}
                  typeValueIndex={idx}
                />
              ))}
          </div>
          <div>
            {Object.keys(StudentAttackType)
              .slice(2)
              .map((t, idx) => (
                <AttackDefenseTypeButton
                  key={t}
                  type="Attack"
                  studentType={studentAttackType}
                  setStudentType={setStudentAttackType}
                  typeValue={t}
                  typeValueIndex={idx + 2}
                />
              ))}
          </div>
        </div>
        {/* Defense Type */}
        <div>
          <span>Defense Type</span>
          <div>
            {Object.keys(StudentDefenseType)
              .slice(0, 2)
              .map((t, idx) => (
                <AttackDefenseTypeButton
                  key={t}
                  type="Defense"
                  studentType={studentDefenseType}
                  setStudentType={setStudentDefenseType}
                  typeValue={t}
                  typeValueIndex={idx}
                />
              ))}
          </div>
          <div>
            {Object.keys(StudentDefenseType)
              .slice(2)
              .map((t, idx) => (
                <AttackDefenseTypeButton
                  key={t}
                  type="Defense"
                  studentType={studentDefenseType}
                  setStudentType={setStudentDefenseType}
                  typeValue={t}
                  typeValueIndex={idx + 2}
                />
              ))}
          </div>
        </div>
        {/* Language */}
        <div>
          <span>Student's Name Language</span>
          <div>
            <Button
              type={studentLng === "en" ? "primary" : "default"}
              onClick={() => {
                setStudentLng("en");
              }}
            >
              EN
            </Button>
            <Button
              type={studentLng === "th" ? "primary" : "default"}
              onClick={() => {
                setStudentLng("th");
              }}
            >
              TH
            </Button>
          </div>
        </div>
      </div>
      <Button
        type="default"
        variant="outlined"
        onClick={() => {
          setStudentSearch("");
          setStudentOwned("");
          setStudentFav("");
          setStudentStar(new Set());
          setStudentAvailability(new Set());
          setStudentTicket({});
          setStudentShop({});
          setStudentMisc({});
          setStudentSquadType("");
          setStudentRole(new Set());
          setStudentAttackType(new Set());
          setStudentDefenseType(new Set());
        }}
      >
        Clear filter
      </Button>
    </div>
  );
};
