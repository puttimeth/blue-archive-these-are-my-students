import "./control-panel.scss";
import { Button } from "antd";
import React from "react";

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
  studentSquadType,
  setStudentSquadType,
  studentLng,
  setStudentLng,
}) => {
  return (
    <div className={`control-panel ${isDesktop ? "desktop" : ""}`}>
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
        <span>Owned Status</span>
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
        <span>Favorite Status</span>
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
          <Button
            type={studentStar.has(1) ? "primary" : "default"}
            onClick={() => {
              let s = new Set(studentStar);
              if (studentStar.has(1)) {
                s.delete(1);
              } else {
                s.add(1);
              }
              setStudentStar(s);
            }}
          >
            1★
          </Button>
          <Button
            type={studentStar.has(2) ? "primary" : "default"}
            onClick={() => {
              let s = new Set(studentStar);
              if (studentStar.has(2)) {
                s.delete(2);
              } else {
                s.add(2);
              }
              setStudentStar(s);
            }}
          >
            2★
          </Button>
          <Button
            type={studentStar.has(3) ? "primary" : "default"}
            onClick={() => {
              let s = new Set(studentStar);
              if (studentStar.has(3)) {
                s.delete(3);
              } else {
                s.add(3);
              }
              setStudentStar(s);
            }}
          >
            3★
          </Button>
        </div>
      </div>
      {/* Squad Type */}
      <div>
        <span>Squad Type</span>
        <div>
          <Button
            type={studentSquadType === "striker" ? "primary" : "default"}
            onClick={() => {
              setStudentSquadType((prev) =>
                prev === "striker" ? "" : "striker",
              );
            }}
          >
            Striker
          </Button>
          <Button
            type={studentSquadType === "special" ? "primary" : "default"}
            onClick={() => {
              setStudentSquadType((prev) =>
                prev === "special" ? "" : "special",
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
