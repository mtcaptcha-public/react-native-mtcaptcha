import React, { useRef } from "react";
import { WebView } from 'react-native-webview';
import type { WebViewMessageEvent } from 'react-native-webview';
import { NativeModules, Linking, Platform } from "react-native";
import type { ViewStyle } from 'react-native';

interface MTCaptchaProps {
  siteKey: string;
  domainName: string;
  style?: ViewStyle;
  widgetSize?: string; 
  lang?: string;
  theme?: string;
  action?: string;
  customLangText?: JSON;
  customStyle?: JSON;
  onCaptchaVerified?: (msg: JSON) => void;
  onCaptchaExpired?: (msg: JSON) => void;
  onError?: (msg: JSON) => void;
}
export const MTCaptcha: React.FC<MTCaptchaProps> = ({
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
  onError,
}) => {
  const webviewRef = useRef<WebView | null>(null);
  const customLang = JSON.stringify(customLangText);
  const customStyleProps = JSON.stringify(customStyle);

  // Handle messages from the WebView
  const onMessage = (event: WebViewMessageEvent) => {
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

  return (
    <WebView
      ref={webviewRef}
      style={[{ backgroundColor: 'transparent', width: '100%' }, style]}
      originWhitelist={["*"]}
      source={{
        html: htmlContent,
        baseUrl: domainName,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      javaScriptEnabled
      automaticallyAdjustContentInsets
      startInLoadingState={true}
      onMessage={onMessage} // Handle messages from the WebView
      scrollEnabled={false} // Disable scrolling
      setBuiltInZoomControls={false} //Disable zoom
      onShouldStartLoadWithRequest={event => {
        const isExternalLink = Platform.OS === 'ios' ? event.navigationType === 'click' : true;
        if (event.url.slice(0, 4) === 'http' && isExternalLink) {
          Linking.canOpenURL(event.url).then(supported => {
            if (supported) {
              Linking.openURL(event.url);
            }
          });
          return false;
        }
        return true;
      }}
    />
  );
};

export default NativeModules.MtcaptchaModule;
