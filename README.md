# facecast_webView

iPhoneからVtube配信を行うことを目標としたアプリ、**facecast(仮)** をiOS配信アプリ, Webビューワーアプリの両方で一体開発しています。

## システム概要

iOSのARkit(FaceTracking)で、顔のblendshapesを取得

↓

AWS サーバーに送信(SocketIO)

↓

クライアントWebアプリでVRMキャラクターの表情を動かす

(threejs, VRMloader)



このレポジトリは、iOSアプリ(repo:facecast_ios)とセットで使います。

This web App works with iOS App(repo:facecast_ios).

## 実行方法
1. 任意のサーバ上にgit cloneする
2. `npm i`してpackage.jsonに記載されてる依存関係を一括インストール
3. `../src/` にVRMモデルをunzipして配置
3. `./app.js` をnode, nodemon, forever等で実行
4. http://[your server address]:3001 を開く
5. iOSアプリを起動して目を動かす
6. あなたの目の動きが、VRMキャラクターと同期されます！

## Future Works
- 目に加え他(口、あご、その他blendshapes)の動きに対応
- 

##  how to excecute
1. git clone this repository on your server.
2. execute `npm i`
3. execute `./app.js` by node, nodemon, forever...etc
4. open http://[your server address]:3001
5. open iOS App, then move your eyes
6. VRM character's eye movement will be syncronized with your's! 
