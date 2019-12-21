import { VNode, createElement } from "./core";
import { diff } from "./diff";

// Render the virtual DOM starting at `vRoot` as a child of `root`
export function render(vRoot: VNode, root: HTMLElement | null) {
  if (!root) {
    return;
  }
  const emptyVNode = createElement("div", {}, []);
  diff(root, vRoot, emptyVNode);
}
