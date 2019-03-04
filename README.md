# facecast_webView
iOSアプリ(repo:facecast_ios)とセットで使います。

This web App works with iOS App(repo:facecast_ios).

## 実行方法
1. 任意のサーバ上にgit cloneする
2. `npm i`してpackage.jsonに記載されてる依存関係を一括インストール
3. `../src/` にVRMモデルをunzipして配置
3. `./app.js` をnode, nodemon, forever等で実行
4. http://[your server address]:3001 を開く
5. iOSアプリを起動して目を動かす
6. あなたの目の動きが、VRMキャラクターと同期されます！

##  how to excecute
1. git clone this repository on your server.
2. execute `npm i`
3. execute `./app.js` by node, nodemon, forever...etc
4. open http://[your server address]:3001
5. open iOS App, then move your eyes
6. VRM character's eye movement will be syncronized with your's! 
