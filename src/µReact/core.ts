import { diff } from "./diff";

type baseProps = { style?: Partial<CSSStyleDeclaration> } & Partial<
  GlobalEventHandlers
> & { textContent?: string };

// Virtual nodes are the elements that compose µReact's virtual dom
export interface VNode<P = {}> {
  type: string;
  props: P & baseProps;
  children: VNode[];
  domElt?: HTMLElement;
  class?: new (props: P) => Component<P>;
  component?: Component<P>;
}

export const emptyVNode = { type: "", props: {}, children: [] };

export abstract class Component<P = {}, S = {}> {
  props: P;
  abstract state: S;
  _vNode: VNode<P>;

  constructor(props: P) {
    this.props = props;
    this._vNode = {
      type: "",
      props: props,
      children: [emptyVNode]
    };
  }

  setState(newState: S) {
    this.state = newState;
    const child = this._vNode.children[0];
    if (child.domElt && child.domElt.parentElement) {
      this._vNode.children[0] = diff(
        child.domElt.parentElement,
        this.render(),
        child
      );
    }
  }

  abstract render(): VNode<any>;
}

// Render the virtual DOM starting at `vRoot` as a child of `root`
export function render(vRoot: VNode, root: HTMLElement | null) {
  if (!root) {
    return;
  }
  const emptyVNode = createElement("div", {});
  diff(root, vRoot, emptyVNode);
}

// Create a new virtual node
export function createElement<P = {}>(
  type: string | (new (props: P) => Component<P>),
  props: P & baseProps,
  ...children: VNode<any>[] | string[] | number[]
): VNode<P> {
  if (props == null) props = { ...props }; // TODO typecheck ^^'
  console.log(children);

  children;
  if (typeof type == "string") {
    if (!isVNodeArray(children)) {
      props.textContent = `${children}`;
      return {
        type: type,
        props: props,
        children: []
      };
    }

    return { type: type, props: props, children: children };
  } else {
    return {
      type: "",
      props: props,
      children: [],
      class: type
    };
  }
}

function isVNodeArray(
  array: VNode<any>[] | string[] | number[]
): array is VNode<any>[] {
  return !(
    array.length > 0 &&
    (typeof array[0] == "string" || typeof array[0] == "number")
  );
}
