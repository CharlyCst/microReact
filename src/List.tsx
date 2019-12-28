import * as µReact from "./µReact/index";
import { Task } from "./Task";

export class List extends µReact.Component {
  state = { clicks: 0 };

  constructor(props: {}) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  render() {
    return (
      <div style={containerStyle}>
        <p
          style={{ fontWeight: "bold", margin: "1rem" }}
        >{`You clicked ${this.state.clicks} times`}</p>
        <button
          style={{
            backgroundColor: "lightblue"
          }}
          onclick={this.click}
        >
          Click !
        </button>
        <Task task="Test" />
        <Task task="Greet" />
      </div>
    );
  }
}

export const containerStyle = {
  backgroundColor: "white",
  height: "200px",
  width: "500px",
  textAlign: "center",
  margin: "auto",
  padding: "1rem",
  boxShadow: "1px 1px 17px 1px rgba(0,0,0,.16)",
  borderRadius: "0.7rem"
};
