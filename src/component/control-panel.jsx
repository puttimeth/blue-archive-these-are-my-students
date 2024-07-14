import "./control-panel.scss";
import { Button } from "antd";
import React from "react";

export const ControlPanel = ({ studentLng, setStudentLng }) => {
  return (
    <div className="control-panel">
      <div>
        <span>Status</span>
        <div>
          <Button>Owned</Button>
          <Button>Not Owned</Button>
        </div>
      </div>
      <div>
        <span>Star</span>
        <div>
          <Button>1★</Button>
          <Button>2★</Button>
          <Button>3★</Button>
        </div>
      </div>
      <div>
        <span>Squad Type</span>
        <div>
          <Button>Striker</Button>
          <Button>Special</Button>
        </div>
      </div>
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
  );
};
