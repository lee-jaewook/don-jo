import { toast } from "react-toastify";

const sendToastMessage = (text = "", type = "default") => {
  toast.dismiss();
  if (type === "error") {
    toast.error(text, {
      position: "top-right",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    return;
  }

  toast(text, {
    position: "top-right",
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export default sendToastMessage;
