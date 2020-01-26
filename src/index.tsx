import µReact from "./µReact";
import { List } from "./List";

const style = {
  backgroundColor: "#f8f8f8",
  minHeight: "100vh",
  height: "100%",
  display: "flex"
};

const App = (
  <div style={style}>
    <List />
  </div>
);

µReact.render(App, document.getElementById("app"));
