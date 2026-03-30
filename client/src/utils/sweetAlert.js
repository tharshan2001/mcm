import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const sweetAlert = {
  toast: (message, icon = "success") => {
    Toast.fire({ icon, title: message });
  },

  success: (message) => {
    return Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      confirmButtonColor: "#5C4033",
    });
  },

  error: (message) => {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonColor: "#5C4033",
    });
  },

  confirm: (title, text, confirmText = "Delete", icon = "warning") => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#5C4033",
      cancelButtonColor: "#6B7280",
      confirmButtonText: confirmText,
      cancelButtonText: "Cancel",
    });
  },

  deleteConfirm: (itemName) => {
    return Swal.fire({
      title: "Delete Item",
      text: `Are you sure you want to delete "${itemName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
  },
};

export default sweetAlert;
