import { diff } from "./diff";

type children = VNode[] | string;

// The minimal properties of a virtual node
type baseProps = {
  children: children;
  style?: Partial<CSSStyleDeclaration>;
};

// Virtual nodes are the elements that compose µReact's virtual dom
export interface VNode<P = {}> {
  type: string;
  props: P & baseProps;
  domElt?: HTMLElement;
  class?: new (props: P) => Component<P>;
  component?: Component<P>;
}

export const emptyVNode = { type: "", props: { children: [] } };

export abstract class Component<P = {}, S = {}> {
  abstract state: S;
  props: P;
  _vNode: VNode<P>;

  constructor(props: P) {
    this.props = props;
    this._vNode = {
      type: "",
      props: { ...props, children: [emptyVNode] }
    };
  }

  abstract render(): VNode<any>;
  componentDidMount() {}

  setState(newState: Partial<S>) {
    this.state = { ...this.state, ...newState };

    const children = this._vNode.props.children;
    if (typeof children == "string") return;
    const child = children[0];

    if (child.domElt && child.domElt.parentElement) {
      children[0] = diff(child.domElt.parentElement, this.render(), child);
    }
  }
}

// Create a new virtual node
export function createElement<P = {}>(
  type: string | (new (props: P) => Component<P>),
  props: P,
  ...children: (VNode<any> | VNode<any>[])[] | (string | number)[]
): VNode<P> {
  const normalizedProps = {
    ...props,
    children: isVNodeArray(children) ? flatten(children) : `${children}`
  };

  if (typeof type == "string") {
    return { type: type, props: normalizedProps };
  } else {
    return {
      type: "",
      props: normalizedProps,
      class: type
    };
  }
}

// Type guard to decide if `array` is a (nested) array of VNode
function isVNodeArray(
  array: (VNode<any> | VNode<any>[])[] | (string | number)[]
): array is (VNode<any> | VNode<any>[])[] {
  return !(
    array.length > 0 &&
    (typeof array[0] == "string" || typeof array[0] == "number")
  );
}

// Needed to flatten JSX children array
function flatten<P>(arr: (P | P[])[]): P[] {
  return arr.reduce<P[]>((acc, val) => {
    if (Array.isArray(val)) {
      acc = acc.concat(val);
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}
