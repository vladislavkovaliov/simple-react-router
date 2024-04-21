import { useContext } from "react";
import { NavigatorContext } from "./providers";

function Home(_props: any) {
  const { goBack, reset } = useContext(NavigatorContext);
  console.log({
    props: _props,
  });
  return (
    <div>
      <button
        onClick={() => {
          goBack();
        }}
      >
        Back
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Home;
