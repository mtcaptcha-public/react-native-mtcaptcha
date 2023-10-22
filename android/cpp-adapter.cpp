#include <jni.h>
#include "react-native-mtcaptcha.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_mtcaptcha_MtcaptchaModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return mtcaptcha::multiply(a, b);
}
