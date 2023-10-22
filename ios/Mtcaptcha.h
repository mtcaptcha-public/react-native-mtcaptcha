#ifdef __cplusplus
#import "react-native-mtcaptcha.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNMtcaptchaSpec.h"

@interface Mtcaptcha : NSObject <NativeMtcaptchaSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Mtcaptcha : NSObject <RCTBridgeModule>
#endif

@end
