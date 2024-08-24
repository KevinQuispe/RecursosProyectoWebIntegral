import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Alert = ({ title, text, icon, timer = 3000}) => {
  MySwal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    showConfirmButton: false,
    timerProgressBar: true,
  });
};

export default Alert;
