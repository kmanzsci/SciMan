import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, Modal } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonUnit1Screen from './LessonUnit1Screen'; 

// สร้าง Stack Navigator ภายใน
const LessonsStack = createNativeStackNavigator();

// หน้าหลักที่แสดงการ์ดเมนูทั้งหมด
function LessonsHomeScreen({ route, navigation }) {
  const { userType, username } = route.params || {};
  const isGuestUser = username && (username.includes('ทดลองใช้งาน'));
  const [showRecentActivities, setShowRecentActivities] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* ส่วนข้อมูลผู้ใช้ */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.welcomeText}>ยินดีต้อนรับ</Text>
          <Text style={styles.usernameText}>{username || 'ผู้ใช้งาน'}</Text>
          <Text style={styles.userTypeText}>
            {userType === 'student' ? 'นักเรียน' : 'ครูผู้สอน'}
          </Text>
          {isGuestUser && (
            <View style={styles.guestBadge}>
              <Text style={styles.guestBadgeText}>ทดลองใช้งาน</Text>
            </View>
          )}
        </View>

        {/* การ์ดเมนูทั้งหมดแบบ 2 คอลัมน์ */}
        <View style={styles.cardsContainer}>
          {/* แถวที่ 1: บทเรียนวิทยาศาสตร์ และ ใบงาน */}
          <View style={styles.cardRow}>
            {/* การ์ด "บทเรียนวิทยาศาสตร์" */}
            <TouchableOpacity 
              style={styles.menuCard}
              onPress={() => navigation.navigate('Lessons')}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.iconText}>📚</Text>
              </View>
              <Text style={styles.menuTitle}>บทเรียนวิทยาศาสตร์</Text>
              <Text style={styles.menuDescription}>
                4 หน่วยการเรียนรู้
              </Text>
            </TouchableOpacity>

            {/* การ์ด "ใบงาน" */}
            <TouchableOpacity 
              style={styles.menuCard}
              onPress={() => navigation.navigate('Worksheets')}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#2196F3' }]}>
                <Text style={styles.iconText}>📝</Text>
              </View>
              <Text style={styles.menuTitle}>ใบงาน</Text>
              <Text style={styles.menuDescription}>
                แบบฝึกหัดและใบงาน
              </Text>
            </TouchableOpacity>
          </View>

          {/* แถวที่ 2: แบบทดสอบ และ Quest-up! */}
          <View style={styles.cardRow}>
            {/* การ์ด "แบบทดสอบ" */}
            <TouchableOpacity 
              style={styles.menuCard}
              onPress={() => navigation.navigate('Quizzes')}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#FF9800' }]}>
                <Text style={styles.iconText}>📊</Text>
              </View>
              <Text style={styles.menuTitle}>แบบทดสอบ</Text>
              <Text style={styles.menuDescription}>
                ทดสอบความเข้าใจ
              </Text>
            </TouchableOpacity>

            {/* การ์ด "Quest-up!" */}
            <TouchableOpacity 
              style={styles.menuCard}
              onPress={() => navigation.navigate('Quest')}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#673AB7' }]}>
                <Text style={styles.iconText}>🏆</Text>
              </View>
              <Text style={styles.menuTitle}>Quest-up!</Text>
              <Text style={styles.menuDescription}>
                ภารกิจท้าทายพิเศษ
              </Text>
            </TouchableOpacity>
          </View>


        </View>

        {/* ข้อมูลสำหรับผู้ทดลองใช้งาน */}
        {isGuestUser && (
          <View style={styles.guestInfoCard}>
            <Text style={styles.guestInfoTitle}>ข้อมูลสำหรับผู้ทดลองใช้งาน</Text>
            <Text style={styles.guestInfoText}>
              คุณกำลังใช้งานในโหมดทดลองใช้งาน บางฟีเจอร์อาจถูกจำกัด หากต้องการใช้งานแบบเต็มรูปแบบ กรุณาลงทะเบียนเพื่อเข้าสู่ระบบ
            </Text>
            <TouchableOpacity 
              style={styles.registerNowButton}
              onPress={() => {
                navigation.reset({
                  index: 1,
                  routes: [
                    { name: 'Dashboard' }, // กลับไปที่ Dashboard ในเส้นทางสแตค
                    { 
                      name: 'Register',
                      params: {
                        fromGuest: true,
                        userType: userType
                      }
                    }
                  ],
                });
              }}
            >
              <Text style={styles.registerNowButtonText}>ลงทะเบียนตอนนี้</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* แถบแสดงความคืบหน้า */}
        <TouchableOpacity 
          style={styles.progressSummaryContainer}
          onPress={() => setShowRecentActivities(true)}
        >
          <Text style={styles.progressSummaryTitle}>ความคืบหน้าการเรียนรู้</Text>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '35%' }]} />
            <Text style={styles.progressText}>35% ของภาพรวมทั้งหมด</Text>
          </View>
          
          <View style={styles.progressDetailContainer}>
            <View style={styles.progressDetailItem}>
              <Text style={styles.progressDetailValue}>25%</Text>
              <Text style={styles.progressDetailLabel}>บทเรียน</Text>
            </View>
            <View style={styles.progressDetailItem}>
              <Text style={styles.progressDetailValue}>50%</Text>
              <Text style={styles.progressDetailLabel}>ใบงาน</Text>
            </View>
            <View style={styles.progressDetailItem}>
              <Text style={styles.progressDetailValue}>30%</Text>
              <Text style={styles.progressDetailLabel}>แบบทดสอบ</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Modal แสดงกิจกรรมล่าสุด */}
      <Modal
        visible={showRecentActivities}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRecentActivities(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowRecentActivities(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>กิจกรรมล่าสุด</Text>
            
            {/* รายการกิจกรรม */}
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>✓</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>หน่วยที่ 1: เรียนรู้วิทยาศาสตร์อย่างไร</Text>
                <Text style={styles.activityTime}>เมื่อวาน, 14:30 น.</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, styles.quizIcon]}>
                <Text style={styles.activityIconText}>Q</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>แบบทดสอบหน่วยที่ 1</Text>
                <Text style={styles.activityTime}>2 วันที่แล้ว, 09:45 น.</Text>
              </View>
              <View style={styles.activityScore}>
                <Text style={styles.activityScoreText}>88%</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowRecentActivities(false)}
            >
              <Text style={styles.closeButtonText}>ปิด</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      
      {/* ปุ่มออกจากระบบ */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }}
      >
        <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// หน้าบทเรียนวิทยาศาสตร์
// หน้าบทเรียนวิทยาศาสตร์
function LessonsContentScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.screenHeader}>บทเรียนวิทยาศาสตร์</Text>
        
        {/* บทเรียน 2 คอลัมน์ 2 แถว */}
        <View style={styles.lessonGrid}>
          {/* แถวที่ 1 */}
          <View style={styles.lessonRow}>
            {/* หน่วยที่ 1 */}
            <TouchableOpacity 
              style={styles.lessonGridCard}
              onPress={() => navigation.navigate('LessonUnit1Screen')}
            >
              <Image 
                source={require('./assets/images/LessonsciBG1.png')} 
                style={styles.lessonCardBackground}
                resizeMode="cover"
              />
              <View style={styles.lessonCardContent}>
                <View style={styles.textBackdrop}>
                  <Text style={styles.lessonGridTitle}>หน่วยที่ 1</Text>
                  <Text style={styles.lessonGridSubtitle}>เรียนรู้วิทยาศาสตร์อย่างไร</Text>
                </View>
                <View style={styles.lessonGridMeta}>
                  <Text style={styles.lessonGridTime}>6 ชั่วโมง</Text>
                  <TouchableOpacity 
                    style={styles.startButtonSmall}
                    onPress={() => navigation.navigate('LessonUnit1Screen')} // เพิ่ม/แก้ไขส่วนนี้
                  >
                    <Text style={styles.startButtonText}>เริ่ม</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            {/* หน่วยที่ 2 */}
            <TouchableOpacity style={styles.lessonGridCard}>
              <Image 
                source={require('./assets/images/LessonsciBG2.png')} 
                style={styles.lessonCardBackground}
                resizeMode="cover"
              />
              <View style={styles.lessonCardContent}>
                <View style={styles.textBackdrop}>
                  <Text style={styles.lessonGridTitle}>หน่วยที่ 2</Text>
                  <Text style={styles.lessonGridSubtitle}>สารบริสุทธิ์</Text>
                </View>
                <View style={styles.lessonGridMeta}>
                  <Text style={styles.lessonGridTime}>22 ชั่วโมง</Text>
                  <TouchableOpacity style={styles.startButtonSmall}>
                    <Text style={styles.startButtonText}>เริ่ม</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* แถวที่ 2 */}
          <View style={styles.lessonRow}>
            {/* หน่วยที่ 3 */}
            <TouchableOpacity style={styles.lessonGridCard}>
              <Image 
                source={require('./assets/images/LessonsciBG3.png')} 
                style={styles.lessonCardBackground}
                resizeMode="cover"
              />
              <View style={styles.lessonCardContent}>
                <View style={styles.textBackdrop}>
                  <Text style={styles.lessonGridTitle}>หน่วยที่ 3</Text>
                  <Text style={styles.lessonGridSubtitle}>หน่วยพื้นฐานของสิ่งมีชีวิต</Text>
                </View>
                <View style={styles.lessonGridMeta}>
                  <Text style={styles.lessonGridTime}>12 ชั่วโมง</Text>
                  <TouchableOpacity style={styles.startButtonSmall}>
                    <Text style={styles.startButtonText}>เริ่ม</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            {/* หน่วยที่ 4 */}
            <TouchableOpacity style={styles.lessonGridCard}>
              <Image 
                source={require('./assets/images/LessonsciBG4.png')} 
                style={styles.lessonCardBackground}
                resizeMode="cover"
              />
              <View style={styles.lessonCardContent}>
                <View style={styles.textBackdrop}>
                  <Text style={styles.lessonGridTitle}>หน่วยที่ 4</Text>
                  <Text style={styles.lessonGridSubtitle}>การดำรงชีวิตของพืช</Text>
                </View>
                <View style={styles.lessonGridMeta}>
                  <Text style={styles.lessonGridTime}>20 ชั่วโมง</Text>
                  <TouchableOpacity style={styles.startButtonSmall}>
                    <Text style={styles.startButtonText}>เริ่ม</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>กลับไปหน้าหลัก</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// หน้าใบงาน
function WorksheetsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.screenHeader}>ใบงาน</Text>
        
        <TouchableOpacity style={styles.lessonCard}>
          <Text style={styles.lessonTitle}>ใบงานหน่วยที่ 1-4</Text>
          <Text style={styles.lessonDescription}>
            แบบฝึกหัดและใบงานที่เกี่ยวข้องกับบทเรียนทั้ง 4 หน่วย
          </Text>
          <View style={styles.lessonMeta}>
            <Text style={styles.lessonTime}>จำนวน: 8 ชิ้น</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>เริ่มทำ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>กลับไปหน้าหลัก</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// หน้าแบบทดสอบ
function QuizzesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.screenHeader}>แบบทดสอบ</Text>
        
        <TouchableOpacity style={styles.quizCard}>
          <View style={styles.quizBadge}>
            <Text style={styles.quizBadgeText}>ใหม่</Text>
          </View>
          <Text style={styles.quizTitle}>แบบทดสอบหน่วยที่ 1: เรียนรู้วิทยาศาสตร์อย่างไร</Text>
          <Text style={styles.quizDescription}>
            ทดสอบความเข้าใจเกี่ยวกับกระบวนการทางวิทยาศาสตร์
          </Text>
          <View style={styles.quizMeta}>
            <Text style={styles.quizDetails}>10 ข้อ • 20 นาที</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>เริ่มทำ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quizCard}>
          <Text style={styles.quizTitle}>แบบทดสอบหน่วยที่ 2: สารบริสุทธิ์</Text>
          <Text style={styles.quizDescription}>
            ทดสอบความรู้เกี่ยวกับคุณสมบัติของสารบริสุทธิ์
          </Text>
          <View style={styles.quizMeta}>
            <Text style={styles.quizDetails}>15 ข้อ • 30 นาที</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>เริ่มทำ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quizCard}>
          <Text style={styles.quizTitle}>แบบทดสอบหน่วยที่ 3: หน่วยพื้นฐานของสิ่งมีชีวิต</Text>
          <Text style={styles.quizDescription}>
            ทดสอบความเข้าใจเกี่ยวกับโครงสร้างเซลล์
          </Text>
          <View style={styles.quizMeta}>
            <Text style={styles.quizDetails}>12 ข้อ • 25 นาที</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>เริ่มทำ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quizCard}>
          <Text style={styles.quizTitle}>แบบทดสอบหน่วยที่ 4: การดำรงชีวิตของพืช</Text>
          <Text style={styles.quizDescription}>
            ทดสอบความรู้เกี่ยวกับกระบวนการดำรงชีวิตของพืช
          </Text>
          <View style={styles.quizMeta}>
            <Text style={styles.quizDetails}>15 ข้อ • 30 นาที</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>เริ่มทำ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>กลับไปหน้าหลัก</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}



// หน้า Quest
function QuestScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.screenHeader}>Quest-up!</Text>
        
        <View style={styles.questIntroCard}>
          <Text style={styles.questIntroTitle}>ท้าทายตัวเองกับภารกิจวิทยาศาสตร์!</Text>
          <Text style={styles.questIntroText}>
            รับภารกิจท้าทาย สะสมแต้ม แลกรางวัล และเปิดประสบการณ์การเรียนรู้วิทยาศาสตร์ที่สนุกและน่าตื่นเต้น
          </Text>
          <View style={styles.questStats}>
            <View style={styles.questStat}>
              <Text style={styles.questStatValue}>350</Text>
              <Text style={styles.questStatLabel}>คะแนนสะสม</Text>
            </View>
            <View style={styles.questStat}>
              <Text style={styles.questStatValue}>7/25</Text>
              <Text style={styles.questStatLabel}>ภารกิจที่สำเร็จ</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.questCard}>
          <View style={styles.questDifficulty}>
            <Text style={styles.questDifficultyText}>ระดับกลาง</Text>
          </View>
          <Text style={styles.questTitle}>นักสำรวจดวงดาว</Text>
          <Text style={styles.questDescription}>
            ถ่ายภาพดวงจันทร์หรือดาวเคราะห์ที่มองเห็นได้จากท้องฟ้าคืนนี้ พร้อมอธิบายข้อมูลที่น่าสนใจ
          </Text>
          <View style={styles.questReward}>
            <Text style={styles.questRewardText}>รางวัล: 50 คะแนน</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>รับภารกิจ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.questCard}>
          <View style={[styles.questDifficulty, styles.questEasy]}>
            <Text style={styles.questDifficultyText}>ระดับง่าย</Text>
          </View>
          <Text style={styles.questTitle}>นักวิทยาศาสตร์ในบ้าน</Text>
          <Text style={styles.questDescription}>
            ทำการทดลองวิทยาศาสตร์ง่ายๆ ที่บ้าน โดยใช้วัสดุที่หาได้ทั่วไป และอัพโหลดผลลัพธ์
          </Text>
          <View style={styles.questReward}>
            <Text style={styles.questRewardText}>รางวัล: 30 คะแนน</Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>รับภารกิจ</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>กลับไปหน้าหลัก</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// คอมโพเนนต์หลักที่มี Navigator ภายใน
function LessonsScreen({ route, navigation }) {
  const routeParams = route.params || {};

  return (
    <LessonsStack.Navigator>
      <LessonsStack.Screen 
        name="Dashboard" 
        component={LessonsHomeScreen} 
        initialParams={routeParams}
        options={{ 
          headerShown: false 
        }} 
      />
      <LessonsStack.Screen 
        name="Lessons" 
        component={LessonsContentScreen} 
        options={{ 
          headerShown: false
        }} 
      />
      <LessonsStack.Screen 
        name="Worksheets" 
        component={WorksheetsScreen} 
        options={{ 
          headerShown: false
        }} 
      />
      <LessonsStack.Screen 
        name="Quizzes" 
        component={QuizzesScreen} 
        options={{ 
          headerShown: false
        }} 
      />

      <LessonsStack.Screen 
        name="Quest" 
        component={QuestScreen} 
        options={{ 
          headerShown: false
        }} 
      />
      <LessonsStack.Screen 
        name="LessonUnit1" 
        component={LessonUnit1Screen} 
        options={{ 
          headerShown: false
        }} 
      />
      
    </LessonsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  // แถบความคืบหน้าด้านล่าง
  progressSummaryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    marginTop: 0,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  progressSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  progressDetailItem: {
    alignItems: 'center',
  },
  progressDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressDetailLabel: {
    fontSize: 12,
    color: '#666',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  // ส่วนข้อมูลผู้ใช้
  userInfoContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
  },
  usernameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  userTypeText: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  guestBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
  },
  guestBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // คอนเทนเนอร์สำหรับแสดงการ์ดเมนู
  cardsContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  
  // แถวสำหรับการ์ด 2 คอลัมน์
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  
  // แถวสำหรับการ์ดตรงกลาง
  cardRowCenter: {
    alignItems: 'center',
    marginBottom: 12,
  },
  
  // การ์ดเมนูสำหรับ 2 คอลัมน์
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  // การ์ดตรงกลาง
  centerCard: {
    width: '60%',
    alignSelf: 'center',
  },
  
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 20,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: '#555',
  },
  
  // ส่วนหัวของแต่ละหน้าย่อย
  screenHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  
  // สไตล์บทเรียน
  // เพิ่ม styles เหล่านี้ในส่วนของ StyleSheet.create({...}) ที่มีอยู่แล้ว

  // สไตล์สำหรับการแสดงผลแบบกริดของบทเรียน
  lessonGrid: {
    marginBottom: 20,
  },
  lessonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  lessonGridCard: {
    width: '48%', // ประมาณครึ่งหนึ่งของพื้นที่ความกว้าง ลบด้วยช่องว่างระหว่างการ์ด
    height: 180,
    borderRadius: 10,
    overflow: 'hidden', // ทำให้รูปภาพไม่ล้นขอบ borderRadius
    marginBottom: 8,
    // เงา
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    // ตำแหน่ง
    position: 'relative',
  },
  lessonCardBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  lessonCardContent: {
    flex: 1,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // พื้นหลังสีทึบเพื่อให้อ่านข้อความได้ง่าย
    justifyContent: 'space-between',
  },
  textBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  lessonGridTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  lessonGridSubtitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  lessonGridMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonGridTime: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  startButtonSmall: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  
  // สไตล์แบบทดสอบ
  quizCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    position: 'relative',
  },
  quizBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quizBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingRight: 40,
  },
  quizDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  quizMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizDetails: {
    fontSize: 12,
    color: '#888',
  },
  
  // สไตล์ความคืบหน้า
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBar: {
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
  },
  progressText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  recentActivityCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  recentActivityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quizIcon: {
    backgroundColor: '#2196F3',
  },
  activityIconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityTime: {
    fontSize: 12,
    color: '#888',
  },
  activityScore: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityScoreText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  // Quest
  questIntroCard: {
    backgroundColor: '#673AB7',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  questIntroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  questIntroText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  questStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
  },
  questStat: {
    alignItems: 'center',
  },
  questStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  questStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  questCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    position: 'relative',
  },
  questDifficulty: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  questEasy: {
    backgroundColor: '#8BC34A',
  },
  questDifficultyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  questReward: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questRewardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#673AB7',
  },
  
  // ส่วนของผู้ใช้ทดลอง
  guestInfoCard: {
    backgroundColor: '#fff8e1',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffecb3',
  },
  guestInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff8f00',
    marginBottom: 8,
  },
  guestInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  registerNowButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  registerNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // ปุ่มออกจากระบบและกลับ
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    borderRadius: 25,
    margin: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 25,
    margin: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LessonsScreen;