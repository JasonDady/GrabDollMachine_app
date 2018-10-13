#!/bin/sh

# 当前项目目录
Cur_Dir=$(pwd)



# 编译类型
gulpBuildType=$1; #gulpBuildType 的接收值为 「db」- debug build、「rb」- release build、「run」- 直接在设备上run
platform=$2; #platform 的接收值为 「android」 或者 「ios」

# gulp build 方法，根据输入的参数选择执行的分支
gulpBuild(){
  if [ "$gulpBuildType" = "db" -o "$gulpBuildType" = "run" ];then
    echo -e '\n#######################      gulp build --force-build         #######################\n'
    gulp build --force-build
  elif [ "$gulpBuildType" = "rb" ];then
    echo -e '\n#######################      gulp build --force-build --minify         #######################\n'
    gulp build --force-build --minify
  else
    echo -e '\n#######################      不支持的指令         #######################\n'
  fi
}

# cordova build 方法，根据输入的参数选择执行的分支
cordovaBuild(){
  if [ "$platform" = "android" ];then
    cordovaBuildAndroid
  elif [ "$platform" = "ios" ];then
    cordovaBuildIOS
  elif [ "$platform" = "all" ];then
    cordovaBuildAndroid
    cordovaBuildIOS
  else
    echo -e '\n#######################      不支持的指令         #######################\n'
  fi
}

# 编译android
cordovaBuildAndroid(){
  if [ "$gulpBuildType" = "db" ];then
    echo -e '\n#######################      cordova build android         #######################\n'
    cordova build android
  elif [ "$gulpBuildType" = "run" ];then
    echo -e '\n#######################      cordova run android         #######################\n'
    cordova run android
  elif [ "$gulpBuildType" = "rb" ];then
    echo -e '\n#######################      cordova build android release        #######################\n'
    cordova build android --release
    # jarsigner -verbose -keystore $Cur_Dir/buildTools/djj.jks -signedjar $Cur_Dir/buildTools/output/ddj-signed.apk $Cur_Dir/platforms/android/build/outputs/apk/android-release-unsigned.apk djj_alias -digestalg SHA1 -sigalg MD5withRSA -storepass djj2017
    jarsigner -verbose -keystore $Cur_Dir/buildTools/btc.jks -signedjar $Cur_Dir/buildTools/output/ddj-signed.apk $Cur_Dir/platforms/android/build/outputs/apk/android-release-unsigned.apk btc -digestalg SHA1 -sigalg MD5withRSA -storepass btc123
  else
    echo -e '\n#######################      不支持的指令         #######################\n'
  fi
}

# 编译IOS
cordovaBuildIOS(){
  if [ "$gulpBuildType" = "db" -o "$gulpBuildType" = "rb" ];then
    echo -e '\n#######################      cordova build ios         #######################\n'
    cordova build ios
  elif [ "$gulpBuildType" = "run" ];then
    echo -e '\n#######################      cordova run ios         #######################\n'
    cordova run ios
  else
    echo -e '\n#######################      不支持的指令         #######################\n'
  fi
}


build(){
  gulpBuild
  cordovaBuild
}

build
