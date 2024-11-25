import "./control-panel.scss";
import { Button } from "antd";
import React from "react";

const StarButton = ({ studentStar, setStudentStar, starValue }) => {
  return (
    <Button
      type={studentStar.has(starValue) ? "primary" : "default"}
      onClick={() => {
        let s = new Set(studentStar);
        if (studentStar.has(starValue)) {
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
  studentSquadType,
  setStudentSquadType,
  studentLng,
  setStudentLng,
  noStudent,
  noStudentShown,
  noStudentOwned,
  noStudentFav,
}) => {
  return (
    <div className={`control-panel ${isDesktop ? "desktop" : ""}`}>
      <span>
        Show {noStudentShown}/{noStudent}
      </span>
      {/* Sorted By */}
      <div>
        <span>Sorted By</span>
        <div>
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
      {/* Language */}
      <div>
        <span>Student's Name Language</span>
        <div>
          <Button
            type={studentLng === "en" ? "primary" : "default"}
            onClick={() => {
              setStudentLng("en");
              localStorage.setItem("lng", "en");
            }}
          >
            EN
          </Button>
          <Button
            type={studentLng === "th" ? "primary" : "default"}
            onClick={() => {
              setStudentLng("th");
              localStorage.setItem("lng", "th");
            }}
          >
            TH
          </Button>
        </div>
      </div>
    </div>
  );
};
