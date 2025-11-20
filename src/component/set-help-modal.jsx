import "./set-help-modal.scss";
import { Modal } from "antd";
import React from "react";
import { PiBracketsCurlyBold } from "react-icons/pi";

export const SetHelpModal = ({ modalStatus, setModalStatus, studentLng }) => (
  <Modal
    title={null}
    open={modalStatus}
    footer={null}
    onCancel={() => {
      setModalStatus(false);
    }}
  >
    <div className="set-help-panel">
      {studentLng === "en" && (
        <>
          <span>
            Filter menus with a <PiBracketsCurlyBold size={15} /> symbol at the
            end can be tapped again to turn red, which will exclude students in
            that category from the search.
          </span>
        </>
      )}
      {studentLng === "th" && (
        <>
          <span>
            เมนูกรองนักเรียนที่มีภาพ <PiBracketsCurlyBold size={15} />{" "}
            ต่อท้ายสามารถกดซ้ำให้เป็นสีแดงเพื่อนำนักเรียนในหมวดนั้นออกจากการค้นหาได้
          </span>
        </>
      )}
    </div>
  </Modal>
);
