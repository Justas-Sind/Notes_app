import logo from "../assets/pencilIcon.webp";
import ToggleDarkMode from "./ToggleDarkMode";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white px-10 py-2 shadow transition duration-300 dark:bg-slate-800">
      <div onClick={() => navigate("/")} className="cursor-pointer px-2">
        <img src={logo} alt="App logo" width={30} />
      </div>
      <div>
        <ToggleDarkMode />
      </div>
    </div>
  );
}

export default TopBar;
