import * as µReact from "./µReact/index";

interface ITaskState {
  completed: boolean;
}

interface ITaskProps {
  task: string;
}

export class Task extends µReact.Component<ITaskProps, ITaskState> {
  state = { completed: false };

  onClick = () => {
    this.setState({ completed: !this.state.completed });
    console.log(this);
  };

  render() {
    let backgroundStyle = todoStyle;
    if (this.state.completed) {
      backgroundStyle = doneStyle;
    }

    return (
      <div
        style={{ ...backgroundStyle, ...containerStyle }}
        onclick={this.onClick}
      >
        <p style={textStyle}>{this.props.task}</p>
      </div>
    );
  }
}

const containerStyle = {
  fontWeight: "bold",
  borderRadius: "0.7rem",
  minHeight: "2rem",
  display: "flex",
  margin: "0.7rem",
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  cursor: "pointer"
};

const todoStyle = {
  backgroundColor: "#00b712",
  backgroundImage: "linear-gradient(315deg, #00b712 0%, #5aff15 74%)"
};

const doneStyle = {
  backgroundColor: "#2a2a72",
  backgroundImage: "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)"
};

const textStyle = {
  fontWeight: "bold",
  margin: "auto"
};
