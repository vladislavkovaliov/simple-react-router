import { useContext } from "react";
import { NavigatorContext } from "./providers";

function Main() {
  const { goNextTo } = useContext(NavigatorContext);

  return (
    <div>
      <div>Main</div>
      <button
        onClick={() => {
          goNextTo("home");
        }}
      >
        Redirect
      </button>
    </div>
  );
}

export default Main;
