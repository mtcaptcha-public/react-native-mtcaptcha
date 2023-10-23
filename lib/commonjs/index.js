"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MTCaptcha = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeWebview = require("react-native-webview");
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MTCaptcha = _ref => {
  let {
    siteKey,
    domainName,
    style,
    widgetSize,
    lang,
    theme,
    action,
    customLangText,
    customStyle,
    onCaptchaVerified,
    onCaptchaExpired,
    onError
  } = _ref;
  const webviewRef = (0, _react.useRef)(null);
  const customLang = JSON.stringify(customLangText);
  const customStyleProps = JSON.stringify(customStyle);

  // Handle messages from the WebView
  const onMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    if (onCaptchaVerified && data.event == "verified") {
      onCaptchaVerified(data.status);
    }
    if (onCaptchaExpired && data.event == "expired") {
      onCaptchaExpired(data.status);
    }
    if (onError && data.event == "error") {
      onError(data.status);
    }
  };
  const htmlContent = `<!DOCTYPE html>
          <html>
          <head>
          <meta charset="UTF-8">

          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1/>
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <style>
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: 'transparent';
          }

          a {
            pointer-events: none;
          }
          </style>

          <script type="text/javascript">
            function mt_verifiedcb(state)
            {
              window.ReactNativeWebView.postMessage(JSON.stringify({"event": "verified", status: state}));
            }  
            function mt_verifyexpiredcb(state)
            {
              window.ReactNativeWebView.postMessage(JSON.stringify({"event": "expired", status: state}));
            }    
            function mt_errorcb(state)
            {
              window.ReactNativeWebView.postMessage(JSON.stringify({"event": "error", status: state}));
            } 
            
            var mtcaptchaConfig = {
              "sitekey": "${siteKey}",
              "widgetSize": "${widgetSize}",
              "lang": "${lang}",
              "customLangText": ${customLang},
              "customStyle": ${customStyleProps},
              "theme": "${theme}",
              "action": "${action}",
              "verified-callback": "mt_verifiedcb",
              "verifyexpired-callback": "mt_verifyexpiredcb",
              "error-callback": "mt_errorcb",
              "lowFrictionInvisible": "force-visible"
            };

            !function() {
            var e = document.createElement("script");
            e.async = !0, e.src = "https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(e);
            var t = document.createElement("script");
            t.async = !0, t.src = "https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(t)
            }();
          </script>
          </head>
          <body>
              <div class="mtcaptcha" mtcapwid="mtcaptcha-1"/> 
          </body>
          </html>`;
  return /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    ref: webviewRef,
    style: [{
      backgroundColor: 'transparent',
      width: '100%'
    }, style],
    originWhitelist: ["*"],
    source: {
      html: htmlContent,
      baseUrl: domainName
    },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    javaScriptEnabled: true,
    automaticallyAdjustContentInsets: true,
    startInLoadingState: true,
    onMessage: onMessage // Handle messages from the WebView
    ,
    scrollEnabled: false // Disable scrolling
    ,
    setBuiltInZoomControls: false //Disable zoom
  });
};
exports.MTCaptcha = MTCaptcha;
var _default = exports.default = _reactNative.NativeModules.MtcaptchaModule;
//# sourceMappingURL=index.js.map