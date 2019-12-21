import { createElement, render, Component } from "./µReact/index";

console.log("Hello, from µReact !");

class App extends Component {
  state = { clicks: 0 };

  constructor(props: {}) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    // console.log(`Hello! You clicked ${this.state.clicks} times`);
    this.setState({ clicks: this.state.clicks + 1 });
  }

  render() {
    return createElement(
      "div",
      {
        style: {
          backgroundColor: "lightgray",
          height: "100px",
          width: "500px",
          padding: "1px",
          textAlign: "center"
        }
        // onclick: this.click
      },
      [
        createElement(
          "p",
          { style: { fontWeight: "bold", margin: "1rem" } },
          `You clicked ${this.state.clicks} times`
        ),
        createElement(
          "button",
          {
            style: {
              backgroundColor: "lightblue"
            },
            onclick: this.click
          },
          "Click !"
        )
      ]
    );
  }
}

const app = createElement(App, {}, []);

render(app, document.getElementById("app"));
