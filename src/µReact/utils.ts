// Return true if attribute can be interpreted as a dom attribute
export function isDomAttribute(attribute: string): boolean {
  if (attribute.length > 2 && attribute[0] === "o" && attribute[1] === "n") {
    return true;
  }
  return false;
}

// Compare two props, if each attributes are reference equal return true
export function propsAreEqual(props1: any, props2: any): boolean {
  for (const attr in props1) {
    if (attr in props2 && props1.attr != props2.attr) return false;
  }
  for (const attr in props2) {
    if (attr in props1 && props1.attr != props2.attr) return false;
  }
  return true;
}
