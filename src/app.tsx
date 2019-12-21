import * as µReact from "./µReact/index";

class App extends µReact.Component {
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
      <div
        style={{
          backgroundColor: "lightgray",
          height: "100px",
          width: "500px",
          padding: "1px",
          textAlign: "center"
        }}
      >
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
      </div>
    );
  }
}

µReact.render(<App />, document.getElementById("app"));
