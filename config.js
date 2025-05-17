import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// ตรวจสอบว่าเราได้เชื่อมต่อกับ Firebase แล้วหรือยัง
if (!firebase.apps.length) {
  // Firebase จะอ่านค่า config จากไฟล์ google-services.json และ GoogleService-Info.plist โดยอัตโนมัติ
  firebase.initializeApp();
}

export { firebase, auth, firestore };