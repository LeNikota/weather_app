export default function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("Mobile") !== -1 ||
    navigator.userAgent.indexOf("Android") !== -1 ||
    navigator.userAgent.indexOf("iOS") !== -1 ||
    navigator.userAgent.indexOf("Windows Phone") !== -1
  );
}
