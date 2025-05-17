import { firebase, auth, firestore } from './config';

// สมัครสมาชิกด้วยอีเมลและรหัสผ่าน
export const registerWithEmail = async (email, password, userData) => {
  try {
    // สร้างบัญชีใหม่ใน Firebase Authentication
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // สร้างเอกสารผู้ใช้ใน Firestore
    await firestore().collection('users').doc(user.uid).set({
      uid: user.uid,
      email: email,
      userType: userData.userType, // 'student' หรือ 'teacher'
      fullName: userData.fullName,
      studentId: userData.studentId || '',
      username: userData.username || '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return { user };
  } catch (error) {
    console.error('Error registering with email: ', error);
    throw error;
  }
};

// เข้าสู่ระบบด้วยอีเมลและรหัสผ่าน
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    
    // อัปเดตเวลาล็อกอินล่าสุด
    await firestore().collection('users').doc(userCredential.user.uid).update({
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // ดึงข้อมูลผู้ใช้จาก Firestore
    const userDoc = await firestore().collection('users').doc(userCredential.user.uid).get();
    
    if (userDoc.exists) {
      return {
        user: userCredential.user,
        userData: userDoc.data()
      };
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.error('Error logging in with email: ', error);
    throw error;
  }
};

// ล็อกเอาต์
export const logoutUser = async () => {
    try {
      await auth().signOut();
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

// ลืมรหัสผ่าน
export const resetPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    console.error('Error resetting password: ', error);
    throw error;
  }
};

// ตรวจสอบสถานะการเข้าสู่ระบบปัจจุบัน
export const getCurrentUser = () => {
  return auth().currentUser;
};

