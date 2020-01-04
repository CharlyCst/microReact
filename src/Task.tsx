import µReact from "./µReact";

interface ITaskState {
  completed: boolean;
}

interface ITaskProps {
  task: string;
  delete: () => void;
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
      <div style={containerStyle}>
        <div style={removeStyle} onclick={this.props.delete} />
        <div
          style={{ ...backgroundStyle, ...taskStyle }}
          onclick={this.onClick}
        >
          <p style={textStyle}>{this.props.task}</p>
        </div>
      </div>
    );
  }
}

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

const taskStyle = {
  fontWeight: "bold",
  borderRadius: "0.7rem",
  minHeight: "2rem",
  flex: "1",
  display: "flex",
  margin: "0.7rem",
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  cursor: "pointer"
};

const removeStyle = {
  width: "1.2rem",
  height: "1.2rem",
  borderRadius: "1rem",
  backgroundColor: "#ff4601",
  backgroundImage: "linear-gradient(315deg, #FF1A1A 0%, #ff4601 74%)",
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  cursor: "pointer"
};

const todoStyle = {
  backgroundColor: "#00b712",
  backgroundImage: "linear-gradient(315deg, #00b712 0%, #5aff15 74%)"
};

const doneStyle = {
  backgroundColor: "#fa9c05",
  backgroundImage: "linear-gradient(315deg, #fa9c05 0%, #ffdd00 74%)"
};

const textStyle = {
  fontWeight: "bold",
  margin: "auto"
};
