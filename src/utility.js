function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("Mobile") !== -1 ||
    navigator.userAgent.indexOf("Android") !== -1 ||
    navigator.userAgent.indexOf("iOS") !== -1 ||
    navigator.userAgent.indexOf("Windows Phone") !== -1
  );
}

function resolveIconPath(path) {
  return `../dist/img/${path.match(/night\/.*$/)[0]}`;
}

export {
  isMobileDevice,
  resolveIconPath
}