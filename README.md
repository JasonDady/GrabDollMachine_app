# Tools to install

npm install -g gulp
npm install -g bower
npm install -g browserify

# Known issues

1. The config-const.js file might be emptied [[https://github.com/mwaylabs/generator-m-ionic/issues/227
]]
2. For now, I just used the browserify buffer module to resue the command-helper related codes from proserver. Lately we might need to restructure the code to use javascript typed array. To minimize the code size. Note the size of buffer.js is 42kb.

# gettext usage

We added a gulp task in gulp/gettext.js.

1. gulp gettext:pot
2. translate your po files using Poedit
3. gulp gettext:compile

# How to compile

- Release:
gulp build --minify --force-build
ionic build ios
ionic emulate ios

# Cordova Plugins


cordova plugin add cordova-plugin-wechat --variable wechatappid=wx84a47da7962fda24
cordova plugin add cordova-plugin-x-toast
