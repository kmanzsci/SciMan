import { firebase, auth, firestore } from './config';

// ฟังก์ชันทดสอบการเชื่อมต่อ Firebase
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // ตรวจสอบการเชื่อมต่อกับ Firebase Authentication
    const authTest = auth().app;
    console.log('Auth connection:', authTest ? 'SUCCESS' : 'FAILED');
    
    // ตรวจสอบการเชื่อมต่อกับ Firestore
    const firestoreTest = firestore().app;
    console.log('Firestore connection:', firestoreTest ? 'SUCCESS' : 'FAILED');
    
    return {
      success: true,
      message: 'Firebase connection test successful'
    };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

// ฟังก์ชันทดสอบการลงทะเบียน
export const testRegistration = async () => {
  try {
    // สร้างอีเมลทดสอบแบบสุ่ม (เพื่อไม่ให้ซ้ำกัน)
    const randomEmail = `test_${Math.floor(Math.random() * 10000)}@example.com`;
    const testPassword = 'Test123456';
    
    console.log(`Testing registration with email: ${randomEmail}`);
    
    // ลงทะเบียนผู้ใช้ทดสอบ
    const userCredential = await auth().createUserWithEmailAndPassword(randomEmail, testPassword);
    
    // สร้างข้อมูลผู้ใช้ใน Firestore
    await firestore().collection('users').doc(userCredential.user.uid).set({
      uid: userCredential.user.uid,
      email: randomEmail,
      userType: 'student',
      fullName: 'Test User',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      isTestAccount: true // ใช้สำหรับระบุว่าเป็นบัญชีทดสอบ
    });
    
    console.log('Test registration successful!');
    console.log('User ID:', userCredential.user.uid);
    
    // ลบบัญชีทดสอบทันที
    await userCredential.user.delete();
    console.log('Test user account deleted');
    
    return {
      success: true,
      message: 'Registration test successful and test account deleted'
    };
  } catch (error) {
    console.error('Registration test failed:', error);
    return {
      success: false,
      message: error.message
    };
  }
};