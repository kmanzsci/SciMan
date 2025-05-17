import { firebase, firestore } from './config';

// บันทึกความก้าวหน้าเมื่อเริ่มบทเรียน
export const startLesson = async (userId, unitId, lessonId) => {
  try {
    // ตรวจสอบว่ามีบันทึกความก้าวหน้าอยู่แล้วหรือไม่
    const progressRef = firestore()
      .collection('progress')
      .where('userId', '==', userId)
      .where('unitId', '==', unitId)
      .where('lessonId', '==', lessonId);
    
    const snapshot = await progressRef.get();
    
    if (snapshot.empty) {
      // ถ้าไม่มีบันทึกให้สร้างใหม่
      await firestore().collection('progress').add({
        userId,
        unitId,
        lessonId,
        progress: 0,
        startedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastAccessed: firebase.firestore.FieldValue.serverTimestamp(),
        completedSections: [],
      });
    } else {
      // ถ้ามีแล้วให้อัปเดตเวลาเข้าถึงล่าสุด
      await snapshot.docs[0].ref.update({
        lastAccessed: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    // บันทึกกิจกรรมการเข้าเรียน
    await firestore().collection('activities').add({
      userId,
      type: 'lesson',
      contentId: `${unitId}-${lessonId}`,
      action: 'started',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error('Error starting lesson:', error);
    throw error;
  }
};

// อัปเดตความก้าวหน้าระหว่างเรียน
export const updateLessonProgress = async (userId, unitId, lessonId, progressPercent, completedSection) => {
  try {
    const progressRef = firestore()
      .collection('progress')
      .where('userId', '==', userId)
      .where('unitId', '==', unitId)
      .where('lessonId', '==', lessonId);
    
    const snapshot = await progressRef.get();
    
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      const currentData = snapshot.docs[0].data();
      
      // อัปเดตความก้าวหน้าและหัวข้อที่เรียนจบ
      const updatedCompletedSections = [...new Set([...currentData.completedSections, completedSection])];
      
      await docRef.update({
        progress: progressPercent,
        lastAccessed: firebase.firestore.FieldValue.serverTimestamp(),
        completedSections: updatedCompletedSections,
      });

      // ถ้าเรียนจบแล้ว (100%)
      if (progressPercent === 100) {
        await firestore().collection('activities').add({
          userId,
          type: 'lesson',
          contentId: `${unitId}-${lessonId}`,
          action: 'completed',
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    }

    return true;
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    throw error;
  }
};

// บันทึกคะแนนแบบทดสอบ
export const saveQuizResult = async (userId, unitId, quizId, score) => {
  try {
    const progressRef = firestore()
      .collection('progress')
      .where('userId', '==', userId)
      .where('unitId', '==', unitId);
    
    const snapshot = await progressRef.get();
    
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      const currentData = snapshot.docs[0].data();
      
      // สร้างหรืออัปเดตข้อมูลคะแนนแบบทดสอบ
      const quizScores = currentData.quizScores || {};
      quizScores[quizId] = score;
      
      await docRef.update({
        quizScores,
        lastAccessed: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      // ถ้าไม่มีความก้าวหน้าของหน่วยนี้ให้สร้างใหม่
      await firestore().collection('progress').add({
        userId,
        unitId,
        progress: 0,
        startedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastAccessed: firebase.firestore.FieldValue.serverTimestamp(),
        completedSections: [],
        quizScores: {
          [quizId]: score
        }
      });
    }

    // บันทึกกิจกรรมการทำแบบทดสอบ
    await firestore().collection('activities').add({
      userId,
      type: 'quiz',
      contentId: `${unitId}-${quizId}`,
      action: 'completed',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      score,
    });

    return true;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
};

// ดึงความก้าวหน้าทั้งหมดของผู้ใช้
export const getUserProgress = async (userId) => {
  try {
    const snapshot = await firestore()
      .collection('progress')
      .where('userId', '==', userId)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
};