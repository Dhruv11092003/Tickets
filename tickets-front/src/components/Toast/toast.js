import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const makeToast = (type, message) => {
  const toastConfig = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (type === "error") {
    toast.error(message, {
      ...toastConfig,
      style: { backgroundColor: "red", color: "white" ,display:"flex", flexDirection:"column", justifyContent:"space-evenly",alignItems:"center" },
    });
  } else if (type === "success") {
    toast.success(message, {
      ...toastConfig,
      style: { backgroundColor: "green", color: "white" ,display:"flex", flexDirection:"column", justifyContent:"space-evenly",alignItems:"center"},
    });
  } else {
    toast.info(message, {
      ...toastConfig,
    });
  }
};

export default makeToast;
