import "./download-modal.scss";
import { Button, Divider, Input, Modal } from "antd";
import React, { useState } from "react";
import {
  copyShareLinkToClipboard,
  copyStudentImageToClipboard,
  downloadStudentImage,
} from "utils";

export const DownloadModal = ({
  modalStatus,
  setModalStatus,
  deckState,
  filteredStudents,
  studentLng,
}) => {
  const [title, setTitle] = useState("");

  return (
    <Modal
      title={null}
      open={modalStatus}
      footer={null}
      closable={false}
      onCancel={() => {
        setModalStatus(false);
      }}
    >
      <div className="download-panel">
        <span>
          The screenshot will only display the students you have filtered, and
          they will be sorted as shown.
        </span>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Screenshot title (optional)"
          maxLength={75}
        />
        <Button
          onClick={() => {
            copyStudentImageToClipboard({
              studentIds: filteredStudents,
              deckState: deckState,
              language: studentLng,
              title: title,
            });
          }}
        >
          Copy screenshot to clipboard
        </Button>
        <Button
          onClick={() => {
            downloadStudentImage({
              studentIds: filteredStudents,
              deckState: deckState,
              language: studentLng,
              title: title,
            });
          }}
        >
          Download screenshot
        </Button>
        <Divider style={{ margin: "0" }} />
        <Button
          onClick={() => {
            copyShareLinkToClipboard(deckState);
          }}
        >
          Copy shareable link
        </Button>
      </div>
    </Modal>
  );
};
