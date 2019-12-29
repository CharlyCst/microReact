import { VNode, emptyVNode } from "./core";
import { isEventListener, propsAreEqual } from "./utils";

export function diff<P>(
  parentDom: HTMLElement,
  newNode: VNode<P>,
  oldNode: VNode<P>
): VNode<P> {
  if (
    newNode.class &&
    oldNode.class &&
    newNode.class == oldNode.class &&
    oldNode.component
  ) {
    console.log("Diffing component " + newNode.class.name);
    if (propsAreEqual(oldNode.props, newNode.props)) {
      return oldNode;
    } else {
      const oldChild = oldNode.children[0];
      const newChild = oldNode.component.render();

      newNode.component = oldNode.component;
      newNode.domElt = oldNode.domElt;
      newNode.children = [newChild];
      diff(parentDom, newChild, oldChild);
      return newNode;
    }
  } else if (
    newNode.type != "" &&
    newNode.type == oldNode.type &&
    oldNode.domElt
  ) {
    console.log("Diffing dom element " + newNode.type);
    updateDomProperties(oldNode.domElt, newNode, oldNode);
    newNode.domElt = oldNode.domElt;
    diffChildren(oldNode.domElt, newNode, oldNode);
    return newNode;
  } else {
    newNode.domElt = instanciate(newNode);
    if (oldNode.domElt) parentDom.replaceChild(newNode.domElt, oldNode.domElt);
    parentDom.appendChild(newNode.domElt);
    return newNode;
  }
}

function diffChildren<P>(
  parentDom: HTMLElement,
  newParentVNode: VNode<P>,
  oldParentVNode: VNode<P>
) {
  let oldChildren = oldParentVNode.children;
  let newChildren = newParentVNode.children;
  for (var i = 0; i < oldChildren.length; i++) {
    if (i >= newChildren.length) {
      break;
    }
    let oldChild = oldChildren[i];
    let newChild = newChildren[i];

    if (oldChild.domElt && oldChild != newChild) {
      diff(parentDom, newChild, oldChild);
    }
  }
  for (i; i < newChildren.length; i++) {
    parentDom.appendChild(instanciate(newChildren[i]));
  }
}

function updateDomProperties<P, Q>(
  dom: HTMLElement,
  newNode: VNode<P>,
  oldNode: VNode<Q>
) {
  const newProps = newNode.props as { [attr: string]: any };
  const oldProps = oldNode.props as { [attr: string]: any };

  for (const attr in oldProps) {
    if (!(attr in newProps) && isEventListener(attr)) {
      dom.removeEventListener(attr.substring(2), oldProps[attr]);
    }
  }
  for (const attr in newProps) {
    if (!(attr in oldProps) || newProps[attr] !== oldProps[attr]) {
      if (isEventListener(attr)) {
        dom.addEventListener(attr.substring(2), newProps[attr]);
      }
      if (attr == "textContent") dom.innerHTML = newProps[attr];
    }
  }

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
}

// Instanciate the virtual node and all its children
function instanciate<P>(vNode: VNode<P>): HTMLElement {
  if (vNode.class) {
    console.log("Instantiating " + vNode.class.name);
    const component = new vNode.class(vNode.props);
    const child = component.render();
    vNode.component = component;
    vNode.children = [child];
    component._vNode = vNode;
    return instanciate(child);
  } else {
    console.log("Instanciating " + vNode.type);
    const domElt = document.createElement(vNode.type);
    vNode.children.forEach(child => domElt.appendChild(instanciate(child)));
    updateDomProperties(domElt, vNode, emptyVNode);
    if (vNode.props.textContent) {
      domElt.textContent = vNode.props.textContent;
    }
    vNode.domElt = domElt;
    return domElt;
  }
}
