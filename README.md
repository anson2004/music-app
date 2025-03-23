
## How to run dev mode locally

```
npx expo start
```

## How to build APK using EAS

```
npm install -g eas-cli
npx eas login
npx eas build -p android --profile preview
```

## How to debug with andriod device

```
# debug with android phone
npx expo run:android
# debug with ios phone
npx expo run:ios 
```