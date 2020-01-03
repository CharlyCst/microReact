import { VNode, emptyVNode } from "./core";
import { isEventListener } from "./utils";

export function removeFromDOM<P>(node: VNode<P>) {
  if (node.domElt) {
    node.domElt.remove();
  } else if (typeof node.props.children != "string") {
    node.props.children.forEach(child => removeFromDOM(child));
  }
}

// Remove properties from oldNode that are not present in newNode, add new properties and update modified ones.
export function updateDomProperties<P, Q>(
  dom: HTMLElement,
  newNode: VNode<P>,
  oldNode: VNode<Q>
) {
  // Update attributes and event listeners
  const newProps = newNode.props as { [attr: string]: any };
  const oldProps = oldNode.props as { [attr: string]: any };

  for (const attr in oldProps) {
    if (!(attr in newProps) || newProps[attr] !== oldProps[attr]) {
      if (isEventListener(attr)) {
        dom.removeEventListener(attr.substring(2), oldProps[attr]);
      } else {
        dom.removeAttribute(attr);
      }
    }
  }
  for (const attr in newProps) {
    if (!(attr in oldProps) || newProps[attr] !== oldProps[attr]) {
      if (isEventListener(attr)) {
        dom.addEventListener(attr.substring(2), newProps[attr]);
      } else if (typeof newProps[attr] == "string") {
        dom.setAttribute(attr, newProps[attr]);
        // Value of InputElement is not update if set with setAttribute
        if (attr == "value" && "value" in (dom as HTMLInputElement)) {
          (dom as HTMLInputElement).value = newProps[attr];
        }
      }
    }
  }

  // Update style
  const newStyle = newNode.props.style || {};
  const oldStyle = oldNode.props.style || {};

  for (const style in oldStyle) {
    if (!(style in newStyle)) {
      dom.style[style] = "";
    }
  }
  for (const style in newStyle) {
    if (dom.style[style] !== newStyle[style]) {
      dom.style[style] = newStyle[style] || "";
    }
  }

  // Update text content
  if (typeof newNode.props.children == "string") {
    dom.innerHTML = newNode.props.children;
  } else if (typeof oldNode.props.children == "string") {
    dom.innerHTML = "";
  }
}

// Instanciate the virtual node and all its children
export function instanciate<P>(vNode: VNode<P>): HTMLElement {
  if (vNode.class) {
    console.log("Instantiating " + vNode.class.name);
    const component = new vNode.class(vNode.props);
    const child = component.render();
    vNode.component = component;
    vNode.props.children = [child];
    component._vNode = vNode;
    return instanciate(child);
  } else {
    console.log("Instanciating " + vNode.type);
    const domElt = document.createElement(vNode.type);
    if (typeof vNode.props.children != "string") {
      vNode.props.children.forEach(child =>
        domElt.appendChild(instanciate(child))
      );
    }
    updateDomProperties(domElt, vNode, emptyVNode);
    vNode.domElt = domElt;
    return domElt;
  }
}
