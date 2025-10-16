import { deckStateToBase64 } from "./data-encrypt-decrypt.util";
import { message } from "antd";
import { studentData } from "data";
import ReactGA from "react-ga4";

export const copyShareLinkToClipboard = (deckState) => {
  ReactGA.event("share", { method: "link-clipboard" });
  const base64String = deckStateToBase64(deckState);
  navigator.clipboard.writeText(window.location.origin + "/" + base64String);
  message.info("Shareable link is copied to clipboard.");
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

const loadSvgAsImage = (svgString) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      URL.revokeObjectURL(url); // Clean up
      resolve(img);
    };
    img.onerror = (err) => reject(err);
    img.src = url;
  });
};

const OVERVIEW_PADDING = 50;
const IMAGES_PER_ROW = 8;
const IMAGE_SIZE = { width: 120, height: 135 };
const IMAGE_GAP = { x: 10, y: 10 };
const TEXT_HEIGHT = 40;
const IMAGE_PADDING = { x: 10, y: 10 };
const FAV_ICON_SIZE = 23;
const FAV_ICON_MARGIN = 4;
const FAV_ICON_PADDING = 4;

const getStudentCanvas = async ({ studentIds, deckState, language, title }) => {
  const canvas = document.createElement("canvas");
  const rowCount = Math.ceil(studentIds.length / IMAGES_PER_ROW);
  // set canvas size
  const canvasSize = {
    width:
      IMAGES_PER_ROW * IMAGE_SIZE.width +
      (IMAGES_PER_ROW - 1) * IMAGE_GAP.x +
      IMAGE_PADDING.x * 2,
    height:
      rowCount * (IMAGE_SIZE.height + TEXT_HEIGHT) +
      (rowCount - 1) * IMAGE_GAP.y +
      IMAGE_PADDING.y * 2 +
      OVERVIEW_PADDING,
  };
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
  // write canvas
  const ctx = canvas.getContext("2d");
  // fill background color
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
  // draw overview's title
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  if (title !== "") {
    ctx.font = "22px 'Nunito Sans', 'Noto Sans Thai', sans-serif";
    ctx.fillText(
      title,
      canvasSize.width / 2, // text align center will center text around the given point so the offset is required
      8,
    );
  }
  // draw overview's number of student summary
  let summary = `Created at ${new Date().toISOString()}, Show ${studentIds.length}/${Object.keys(deckState).length}, Own ${
    Object.values(deckState).filter(({ owned }) => owned === true).length
  }, Fav ${Object.values(deckState).filter(({ fav }) => fav === true).length}`;
  ctx.textAlign = "left";
  ctx.font = "14px 'Nunito Sans', 'Noto Sans Thai', sans-serif";
  ctx.fillText(summary, 8, title !== "" ? 40 : 32);
  // set global text style
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "16px 'Nunito Sans', 'Noto Sans Thai', sans-serif";
  // set fav star icon
  const favIconImg = await loadSvgAsImage(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="black">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
      </svg>`,
  );
  // draw image
  for (let [idx, studentId] of studentIds.entries()) {
    const img = await loadImage(`/students/${studentId}.webp`);
    const colIdx = idx % IMAGES_PER_ROW;
    const rowIdx = Math.floor(idx / IMAGES_PER_ROW);
    const imgPosition = {
      x: IMAGE_PADDING.x + colIdx * IMAGE_SIZE.width + colIdx * IMAGE_GAP.x,
      y:
        IMAGE_PADDING.y +
        rowIdx * (IMAGE_SIZE.height + TEXT_HEIGHT) +
        rowIdx * IMAGE_GAP.y +
        OVERVIEW_PADDING,
    };
    // draw student image
    ctx.drawImage(
      img,
      imgPosition.x,
      imgPosition.y,
      IMAGE_SIZE.width,
      IMAGE_SIZE.height,
    );
    // draw student's name bg
    if (deckState[studentId].owned === true) {
      ctx.fillStyle = "#00a854";
    } else ctx.fillStyle = "#262626";
    ctx.beginPath();
    ctx.roundRect(
      imgPosition.x,
      imgPosition.y + IMAGE_SIZE.height,
      IMAGE_SIZE.width,
      TEXT_HEIGHT,
      [0, 0, 8, 8],
    );
    ctx.fill();
    // draw student's name
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      language === "en"
        ? studentData[studentId].nameEn
        : studentData[studentId].nameTh,
      imgPosition.x + IMAGE_SIZE.width / 2, // text align center will center text around the given point so the offset is required
      imgPosition.y + IMAGE_SIZE.height + TEXT_HEIGHT / 2,
      IMAGE_SIZE.width - 16, // 16 is padding
    );
    if (deckState[studentId].fav === true) {
      // draw fav icon bg
      ctx.fillStyle = "#fdda0d";
      ctx.beginPath();
      ctx.roundRect(
        imgPosition.x + IMAGE_SIZE.width - FAV_ICON_SIZE - FAV_ICON_MARGIN,
        imgPosition.y + FAV_ICON_MARGIN,
        FAV_ICON_SIZE,
        FAV_ICON_SIZE,
        48,
      );
      ctx.fill();
      // draw fav icon
      ctx.drawImage(
        favIconImg,
        imgPosition.x +
          IMAGE_SIZE.width -
          FAV_ICON_SIZE -
          FAV_ICON_MARGIN +
          FAV_ICON_PADDING,
        imgPosition.y + FAV_ICON_MARGIN + FAV_ICON_PADDING,
        FAV_ICON_SIZE - FAV_ICON_PADDING * 2,
        FAV_ICON_SIZE - FAV_ICON_PADDING * 2,
      );
    }
  }
  return canvas;
};

export const copyStudentImageToClipboard = async (canvasData) => {
  ReactGA.event("share", { method: "image-clipboard" });
  if (canvasData.studentIds.length === 0) {
    message.warning("No student appear.");
    return;
  }
  const canvas = await getStudentCanvas(canvasData);
  canvas.toBlob(async (blob) => {
    if (!blob) {
      message.error("Cannot copy students image.");
      return;
    }
    const item = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([item]);
    message.info("Students image is copied to clipboard.");
  });
};

export const downloadStudentImage = async (canvasData) => {
  ReactGA.event("share", { method: "download-image" });
  if (canvasData.studentIds.length === 0) {
    message.warning("No student appear.");
    return;
  }
  const canvas = await getStudentCanvas(canvasData);
  // add canvas to <a>
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "students.png";
  // add to body, click to download and remove it from body
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
