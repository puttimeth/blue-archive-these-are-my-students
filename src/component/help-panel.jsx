import "./help-panel.scss";
import React from "react";

export const HelpPanel = ({ studentLng }) => (
  <div className="help-panel">
    {studentLng === "en" && (
      <>
        <span>
          This website is designed to share Blue Archive students with other
          easily. Instead of screenshotting each student, you can share them all
          with just one link.
        </span>
        <span>
          Click on a student card to mark that student as owned. This will
          display a{" "}
          <span style={{ color: "#ffffff", backgroundColor: "#00a854" }}>
            green
          </span>{" "}
          background behind the student's name.
        </span>
        <span>
          The control panel is located on the left side. If you're on mobile,
          tap the config button at top-left to open it.
        </span>
        <span>
          Student cards are sorted alphabetically by name. You can select your
          preferred language in the control panel. Currently, English and Thai
          are supported.
        </span>
        <span>
          You can filter student cards using the control panel. There are 3
          options available.
        </span>
        <span>
          After marking owned students,{" "}
          <span style={{ fontWeight: "bold" }}>use share button</span> in the
          top right to obtain sharable link for others.
        </span>
      </>
    )}
    {studentLng === "th" && (
      <>
        <span>
          เว็บไซต์นี้ถูกสร้างขึ้นเพื่อแชร์นักเรียนที่คุณมีใน Blue Archive
          โดยใช้การส่งลิงต์แทนการแคปจอ
        </span>
        <span>
          กดที่รูปนักเรียนเพื่อติ๊กว่ามีนักเรียนคนนั้นแล้ว
          นักเรียนที่ขึ้นว่ามีจะมีพื้นหลัง
          <span style={{ color: "#ffffff", backgroundColor: "#00a854" }}>
            สีเขียว
          </span>{" "}
          หลังชื่อ
        </span>
        <span>
          แผงควบคุมอยู่ฝั่งซ้ายของจอ หรือถ้าคุณใช้มือถือ
          แตะที่ปุ่มฟันเฟืองมุมซ้ายบนเพื่อเปิดแผงควบคุม
        </span>
        <span>
          นักเรียนที่แสดงออกมาถูกเรียงตามชื่อโดยอัตโนมัติ
          สามารถแตะเพื่อเลือกภาษาที่จะใช้แสดงชื่อนักเรียนได้ที่แผงควบคุม
        </span>
        <span>ใช้ปุ่มในแผงควบคุมเพื่อเลือกแสดงนักเรียนเฉพาะบางคน</span>
        <span>
          หากต้องการแชร์ให้คนอื่น โปรด{" "}
          <span style={{ fontWeight: "bold" }}>แตะปุ่มแชร์</span> ที่มุมขวาบน
        </span>
      </>
    )}
  </div>
);
