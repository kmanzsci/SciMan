import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

function LessonsScreen({ route, navigation }) {
  const { userType, username } = route.params || {};
  const isGuestUser = username && (username.includes('ทดลองใช้งาน'));
  const [activeTab, setActiveTab] = useState('lessons');

  const renderContent = () => {
    switch (activeTab) {
      case 'lessons':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabHeader}>บทเรียนวิทยาศาสตร์</Text>
            
            <TouchableOpacity style={styles.lessonCard}>
              <Text style={styles.lessonTitle}>หน่วยที่ 1: เรียนรู้วิทยาศาสตร์อย่างไร</Text>
              <Text style={styles.lessonDescription}>
                เรียนรู้วิธีการศึกษาวิทยาศาสตร์และกระบวนการทางวิทยาศาสตร์
              </Text>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonTime}>เวลาเรียน: 6 ชั่วโมง</Text>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>เริ่มเรียน</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.lessonCard}>
              <Text style={styles.lessonTitle}>หน่วยที่ 2: สารบริสุทธิ์</Text>
              <Text style={styles.lessonDescription}>
                ศึกษาคุณสมบัติและการจำแนกสารบริสุทธิ์ในธรรมชาติ
              </Text>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonTime}>เวลาเรียน: 22 ชั่วโมง</Text>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>เริ่มเรียน</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.lessonCard}>
              <Text style={styles.lessonTitle}>หน่วยที่ 3: หน่วยพื้นฐานของสิ่งมีชีวิต</Text>
              <Text style={styles.lessonDescription}>
                เรียนรู้โครงสร้างและหน้าที่ของเซลล์ในสิ่งมีชีวิต
              </Text>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonTime}>เวลาเรียน: 12 ชั่วโมง</Text>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>เริ่มเรียน</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.lessonCard}>
              <Text style={styles.lessonTitle}>หน่วยที่ 4: การดำรงชีวิตของพืช</Text>
              <Text style={styles.lessonDescription}>
                ศึกษากระบวนการดำรงชีวิตและการปรับตัวของพืช
              </Text>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonTime}>เวลาเรียน: 20 ชั่วโมง</Text>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>เริ่มเรียน</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        );
      
      case 'worksheets':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabHeader}>ใบงาน</Text>
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
          </View>
        );

      case 'quizzes':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabHeader}>แบบทดสอบ</Text>
            
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
          </View>
        );
      
      case 'progress':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabHeader}>ความคืบหน้าการเรียนรู้</Text>
            
            <View style={styles.progressCard}>
              <Text style={styles.progressTitle}>สรุปความคืบหน้า</Text>
              
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '25%' }]} />
                <Text style={styles.progressText}>25% ของบทเรียนทั้งหมด</Text>
              </View>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>1/4</Text>
                  <Text style={styles.statLabel}>บทเรียนที่เรียนแล้ว</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>1/4</Text>
                  <Text style={styles.statLabel}>แบบทดสอบที่ทำแล้ว</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>88%</Text>
                  <Text style={styles.statLabel}>คะแนนเฉลี่ย</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.recentActivityCard}>
              <Text style={styles.recentActivityTitle}>กิจกรรมล่าสุด</Text>
              
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
            </View>
          </View>
        );
      
      case 'quest':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabHeader}>Quest-up!</Text>
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
          </View>
        );
      
      default:
        return <Text>เลือกแท็บเพื่อดูเนื้อหา</Text>;
    }
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollView}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'lessons' && styles.activeTabButton]} 
            onPress={() => setActiveTab('lessons')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'lessons' && styles.activeTabButtonText]}>บทเรียนวิทยาศาสตร์</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'worksheets' && styles.activeTabButton]} 
            onPress={() => setActiveTab('worksheets')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'worksheets' && styles.activeTabButtonText]}>ใบงาน</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'quizzes' && styles.activeTabButton]} 
            onPress={() => setActiveTab('quizzes')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'quizzes' && styles.activeTabButtonText]}>แบบทดสอบ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'progress' && styles.activeTabButton]} 
            onPress={() => setActiveTab('progress')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'progress' && styles.activeTabButtonText]}>ความคืบหน้าการเรียนรู้</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'quest' && styles.activeTabButton]} 
            onPress={() => setActiveTab('quest')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'quest' && styles.activeTabButtonText]}>Quest-up!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView style={styles.content}>
        {renderContent()}
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
                    { name: 'Home' },
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
      </ScrollView>
      
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userInfoContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    marginBottom: 8,
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
  
  // แถบนำทาง
  tabContainer: {
    backgroundColor: 'white',
    paddingVertical: 4,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
  },
  tabsScrollView: {
    paddingHorizontal: 8,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#e8f5e9',
  },
  tabButtonText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 14,
  },
  activeTabButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  
  // เนื้อหา
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabContent: {
    paddingBottom: 16,
  },
  tabHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  
  // บทเรียน
  lessonCard: {
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
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonTime: {
    fontSize: 12,
    color: '#888',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // แบบทดสอบ
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
  
  // ความคืบหน้า
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
  
  // ปุ่มออกจากระบบ
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
});

export default LessonsScreen;