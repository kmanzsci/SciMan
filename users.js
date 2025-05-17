import { firebase, firestore } from './config';

// ดึงข้อมูลผู้ใช้จาก uid
export const getUserData = async (uid) => {
  try {
    const doc = await firestore().collection('users').doc(uid).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user data: ', error);
    throw error;
  }
};

// อัปเดตข้อมูลผู้ใช้
export const updateUserData = async (uid, data) => {
  try {
    await firestore().collection('users').doc(uid).update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user data: ', error);
    throw error;
  }
};

// ดึงรายชื่อนักเรียนทั้งหมด (สำหรับครู)
export const getAllStudents = async () => {
  try {
    const snapshot = await firestore()
      .collection('users')
      .where('userType', '==', 'student')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting all students: ', error);
    throw error;
  }
};

// ดึงข้อมูลความก้าวหน้าของนักเรียน
export const getStudentProgress = async (studentId) => {
  try {
    const snapshot = await firestore()
      .collection('progress')
      .where('userId', '==', studentId)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting student progress: ', error);
    throw error;
  }
};