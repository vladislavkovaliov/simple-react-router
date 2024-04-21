import Home from "./Home";
import Main from "./Main";
import { NavigatorProvider, NavigatorScreen } from "./providers";

function App() {
  return (
    <NavigatorProvider
      onScreenChange={(...args) => {
        console.log(args);
      }}
      fallbackRouteName="main"
    >
      <NavigatorScreen
        name="home"
        component={Home}
        props={{
          internalName: "HomeScreen",
        }}
      />
      <NavigatorScreen name="main" component={Main} />
    </NavigatorProvider>
  );
}

export default App;
