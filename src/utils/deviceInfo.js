const combinedInfo = [
    window.navigator.userAgent,
    window.navigator.platform,
    window.screen.width,
    window.screen.height,
    window.screen.colorDepth || window.screen.pixelDepth,
    window.navigator.language || window.navigator.userLanguage,
    window.navigator.plugins.length,
  ].join('|');
  const deviceInfo = btoa(combinedInfo);

  export default deviceInfo;