import axios from "axios";
import { BoardCreateRequestType } from "../../../../types/board/create/request";
import { base64ToBlob } from "../../../constants/base64ToBlob";
import { getBase64Type } from "../../../constants/getBase64Type";
import { getCookie } from "../../../constants/cookie";

export const boardCreate = async ({
  images,
  title,
  content,
  category,
}: BoardCreateRequestType) => {
  const formData = new FormData();
  if (images)
    images.forEach((image) =>
      formData.append(
        "file",
        new File([base64ToBlob(image)], `image.${getBase64Type(image)}`)
      )
    );
  const request = {
    title: title,
    content: content,
    category:
      category === "안전팁"
        ? "Tips"
        : category === "안전툴"
        ? "Products"
        : category === "잡담" && "Information",
  };
  formData.append(
    "request",
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    })
  );
  return await axios.post(`${getCookie("accToken")}/board/create`, formData, {
    headers: {
      Authorization: `Bearer ${getCookie("accToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
