# react-native-mtcaptcha

MTCaptcha library for React Native library

## Installation

```sh
npm install react-native-mtcaptcha
```

## Usage

```js
import { MTCaptcha } from 'react-native-mtcaptcha';


```

# Dependencies 
react-native-webview (https://github.com/react-native-community/react-native-webview)

# Properties

Name | Type | Description
--- | --- | ---
siteKey (required) | string | Site key associated with the site.  It can be fetched from admin portal.  For more info please visit https://www.mtcaptcha.com/dev-guide
domainName (required) | string | Fully qualified doamin name configured in MTCaptcha admin portal e.g https://www.mtcaptcha.com
lang| string | MTCaptcha supports more than 100 languages.  Please refer https://www.mtcaptcha.com/faq-custom-text-language
style| ViewStyle (refer [here](https://reactnative.dev/docs/view-style-props)) | Style for the webview
widgetSize | string | Supported values are `mini` and `standard`. Default is `standard`
theme | string | Find the different thme which can be set for captcha [here](https://service.mtcaptcha.com/mtcv1/demo/index.html?tab=2)
action | string | Tag for captcha alatytics.  e.g mobile Read more https://www.mtcaptcha.com/dev-guide-captcha-action
customLangText | JSON | All text and language can be customed.  Please read more https://www.mtcaptcha.com/dev-guide-custom-messages.  
customStyle | JSON | To set custom style for the cpatcha widget.  Please refer https://www.mtcaptcha.com/faq-custom-style
enableTestMode | string | This optimises captcha widget for automated testing please refer https://www.mtcaptcha.com/dev-guide-automated-testing 
onCaptchaVerified | function | This is a callback function when the captcha is verified
onCaptchaExpired | function | This is a callback function when the captcha is expired
onError | function | This is a callback function when the captcha results in error such as invalid site key, un recognized doamin

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
