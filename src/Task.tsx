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
    let color = "blue";
    if (this.state.completed) {
      color = "red";
    }

    return (
      <div style={{ backgroundColor: color, ...style }} onclick={this.onClick}>
        <p>{this.props.task}</p>
      </div>
    );
  }
}

const style = {
  fontWeight: "bold"
};
