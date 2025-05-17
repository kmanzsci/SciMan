import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

function StudentDetailsScreen({ route, navigation }) {
  const { studentId, studentName, progress } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);

  // คำนวณค่าสรุป
  const calculateSummary = () => {
    if (!progress || progress.length === 0) {
      return {
        overallProgress: 0,
        completedLessons: 0,
        totalLessons: 4, // สมมติว่ามี 4 หน่วยการเรียนรู้
        quizAverage: 0,
      };
    }

    const completedLessons = progress.filter(p => p.progress === 100).length;
    const quizScores = progress.flatMap(p => 
      p.quizScores ? Object.values(p.quizScores) : []
    );
    const quizAverage = quizScores.length > 0 
      ? quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length 
      : 0;
    const overallProgress = progress.reduce((sum, p) => sum + p.progress, 0) / progress.length;

    return {
      overallProgress: Math.round(overallProgress),
      completedLessons,
      totalLessons: 4,
      quizAverage: Math.round(quizAverage),
    };
  };

  const summary = calculateSummary();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* ส่วนข้อมูลนักเรียน */}
        <View style={styles.studentHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{'< กลับ'}</Text>
          </TouchableOpacity>
          <Text style={styles.studentName}>{studentName || 'นักเรียน'}</Text>
        </View>

        {/* สรุปภาพรวม */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>สรุปความก้าวหน้า</Text>
          <View style={styles.progressCircle}>
            <Text style={styles.progressValue}>{summary.overallProgress}%</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{summary.completedLessons}/{summary.totalLessons}</Text>
              <Text style={styles.statLabel}>บทเรียนที่เรียนจบ</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{summary.quizAverage}%</Text>
              <Text style={styles.statLabel}>คะแนนแบบทดสอบเฉลี่ย</Text>
            </View>
          </View>
        </View>

        {/* รายละเอียดบทเรียน */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>ความก้าวหน้ารายหน่วย</Text>
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
          ) : (
            <View style={styles.lessonsList}>
              {/* หน่วยที่ 1 */}
              <View style={styles.lessonCard}>
                <View style={styles.lessonHeader}>
                  <Text style={styles.lessonTitle}>หน่วยที่ 1: เรียนรู้วิทยาศาสตร์อย่างไร</Text>
                  <Text style={styles.lessonStatus}>
                    {progress.find(p => p.unitId === 'unit1')?.progress === 100 ? 'เรียนจบแล้ว' : 'กำลังเรียน'}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${progress.find(p => p.unitId === 'unit1')?.progress || 0}%` }
                    ]} 
                  />
                </View>
                <View style={styles.lessonDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>ความก้าวหน้า:</Text>
                    <Text style={styles.detailValue}>
                      {progress.find(p => p.unitId === 'unit1')?.progress || 0}%
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>คะแนนแบบทดสอบ:</Text>
                    <Text style={styles.detailValue}>
                      {progress.find(p => p.unitId === 'unit1')?.quizScores?.quiz1 || '-'}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>เข้าเรียนล่าสุด:</Text>
                    <Text style={styles.detailValue}>
                      {progress.find(p => p.unitId === 'unit1')?.lastAccessed 
                        ? new Date(progress.find(p => p.unitId === 'unit1').lastAccessed.toDate()).toLocaleDateString('th-TH')
                        : '-'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* หน่วยที่ 2 */}
              <View style={styles.lessonCard}>
                <View style={styles.lessonHeader}>
                  <Text style={styles.lessonTitle}>หน่วยที่ 2: สารบริสุทธิ์</Text>
                  <Text style={styles.lessonStatus}>
                    {progress.find(p => p.unitId === 'unit2')?.progress === 100 ? 'เรียนจบแล้ว' : 'กำลังเรียน'}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${progress.find(p => p.unitId === 'unit2')?.progress || 0}%` }
                    ]} 
                  />
                </View>
                <View style={styles.lessonDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>ความก้าวหน้า:</Text>
                    <Text style={styles.detailValue}>
                      {progress.find(p => p.unitId === 'unit2')?.progress || 0}%
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>คะแนนแบบทดสอบ:</Text>
                    <Text style={styles.detailValue}>
                      {progress.find(p => p.unitId === 'unit2')?.quizScores?.quiz1 || '-'}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>เข้าเรียนล่าสุด:</Text>
                    <Text style={styles.detailValue}>
                      {progress.find(p => p.unitId === 'unit2')?.lastAccessed 
                        ? new Date(progress.find(p => p.unitId === 'unit2').lastAccessed.toDate()).toLocaleDateString('th-TH')
                        : '-'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* หน่วยที่ 3 และ 4 สามารถเพิ่มเติมในลักษณะเดียวกัน */}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    marginTop: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loader: {
    marginVertical: 20,
  },
  lessonsList: {
    marginBottom: 8,
  },
  lessonCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  lessonStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  lessonDetails: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default StudentDetailsScreen;