import React from "react";
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
export declare const MTCaptcha: React.FC<MTCaptchaProps>;
declare const _default: any;
export default _default;
//# sourceMappingURL=index.d.ts.map