#!/bin/sh

echo "COMMAND : cordova build android --release"
cordova build android --release

echo "COMMAND : cp -f platforms/android/build/outputs/apk/android-release-unsigned.apk ../keystore/"
cp -f platforms/android/build/outputs/apk/android-release-unsigned.apk ../keystore/

cd ../keystore/

echo "COMMAND : mv android-release-unsigned.apk sorukolik-unsigned.apk"
mv android-release-unsigned.apk sorukolik-unsigned.apk

echo "COMMAND : jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sorukolik.keystore sorukolik-unsigned.apk sorukolik"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sorukolik.keystore sorukolik-unsigned.apk sorukolik

cd ~/Android/Sdk/build-tools/23.0.2/

echo "COMMAND : run ./zipalign -v 4"
./zipalign -v 4 ../../../../workspace/projects/web-applications/phonegap/WordGame/keystore/sorukolik-unsigned.apk ../../../../workspace/projects/web-applications/phonegap/WordGame/keystore/Sorukolik.apk

cd /home/ahmetce/workspace/projects/web-applications/phonegap/WordGame/word_game