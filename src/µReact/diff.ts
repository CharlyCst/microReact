import { VNode } from "./core";
import { propsAreEqual } from "./utils";
import { updateDomProperties, instantiate, removeFromDOM } from "./dom";

export function diff(
  parentDom: HTMLElement,
  newNode: VNode,
  oldNode: VNode
): VNode {
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
      newNode.domElt = oldNode.domElt;
      newNode.component = oldNode.component;
      newNode.component.props = newNode.props;

      const oldChild = oldNode.props.children[0];
      const newChild = oldNode.component.render();

      if (typeof oldChild != "string") {
        newNode.props.children = [diff(parentDom, newChild, oldChild)];
      } else {
        newNode.props.children = [newChild];
      }
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
    newNode.domElt = instantiate(newNode);
    if (oldNode.domElt) parentDom.replaceChild(newNode.domElt, oldNode.domElt);
    parentDom.appendChild(newNode.domElt);
    if (newNode.component) newNode.component.componentDidMount();
    return newNode;
  }
}

function diffChildren(
  parentDom: HTMLElement,
  newParentVNode: VNode,
  oldParentVNode: VNode
) {
  let oldChildren = oldParentVNode.props.children;
  let newChildren = newParentVNode.props.children;
  var i = 0;
  if (typeof oldChildren != "string" && typeof newChildren != "string") {
    for (i; i < oldChildren.length; i++) {
      if (i >= newChildren.length) {
        for (let j = i; j < oldChildren.length; j++) {
          removeFromDOM(oldChildren[j]);
        }
        break;
      }
      let oldChild = oldChildren[i];
      let newChild = newChildren[i];
      if (oldChild != newChild) {
        newChildren[i] = diff(parentDom, newChild, oldChild);
      }
    }
  }
  if (typeof newChildren != "string") {
    for (i; i < newChildren.length; i++) {
      parentDom.appendChild(instantiate(newChildren[i]));
    }
  }
}
