import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert  // เพิ่ม Alert ถ้ายังไม่มี
} from 'react-native';
import { getAllStudents, getStudentProgress } from './src/firebase/users';
import { getCurrentUser, logout } from './src/firebase/auth';  // เพิ่ม logout ในบรรทัดนี้

function TeacherDashboardScreen({ route, navigation }) {
  const { username } = route.params || {};
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await logout(); // เรียกใช้ฟังก์ชัน logout จาก Firebase
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถออกจากระบบได้ โปรดลองอีกครั้ง');
    }
  };
  
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const studentsList = await getAllStudents();
        setStudents(studentsList);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentData();
  }, []);

  const viewStudentDetails = async (studentId, studentName) => {
    try {
      setIsLoading(true);
      const progress = await getStudentProgress(studentId);
      
      // นำทางไปยังหน้ารายละเอียดนักเรียน
      navigation.navigate('StudentDetails', { 
        studentId, 
        studentName, 
        progress 
      });
    } catch (error) {
      console.error('Error loading student details:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลนักเรียนได้');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* ส่วนข้อมูลครู */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.welcomeText}>ยินดีต้อนรับ</Text>
          <Text style={styles.usernameText}>{username || 'ครูผู้สอน'}</Text>
          <Text style={styles.userTypeText}>ครูผู้สอน</Text>
        </View>

        {/* สรุปภาพรวม */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>ภาพรวมชั้นเรียน</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{students.length}</Text>
              <Text style={styles.summaryLabel}>นักเรียนทั้งหมด</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>75%</Text>
              <Text style={styles.summaryLabel}>ความก้าวหน้าเฉลี่ย</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>85%</Text>
              <Text style={styles.summaryLabel}>คะแนนเฉลี่ย</Text>
            </View>
          </View>
        </View>

        {/* รายชื่อนักเรียน */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>รายชื่อนักเรียน</Text>
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
          ) : (
            <View style={styles.studentsList}>
              {students.map(student => (
                <TouchableOpacity 
                  key={student.id} 
                  style={styles.studentCard}
                  onPress={() => viewStudentDetails(student.id, student.fullName)}
                >
                  <View style={styles.studentInfo}>
                    <Text style={styles.studentName}>{student.fullName}</Text>
                    <Text style={styles.studentId}>รหัส: {student.studentId}</Text>
                  </View>
                  <View style={styles.studentProgress}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${student.progressPercent || 0}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {student.progressPercent || 0}%
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout} // เปลี่ยนจาก onPress={...} เป็น onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
    </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
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
summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
summaryItem: {
  flex: 1,
  alignItems: 'center',
},
summaryValue: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#4CAF50',
  marginBottom: 4,
},
summaryLabel: {
  fontSize: 12,
  color: '#666',
},
sectionContainer: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 16,
  marginHorizontal: 16,
  marginBottom: 20,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1.5,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 16,
},
loader: {
  marginVertical: 20,
},
studentsList: {
  marginBottom: 8,
},
studentCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
studentInfo: {
  flex: 1,
},
studentName: {
  fontSize: 16,
  fontWeight: '500',
  marginBottom: 4,
},
studentId: {
  fontSize: 12,
  color: '#666',
},
studentProgress: {
  width: 100,
},
progressBar: {
  height: 8,
  backgroundColor: '#e0e0e0',
  borderRadius: 4,
  marginBottom: 4,
  overflow: 'hidden',
},
progressFill: {
  height: '100%',
  backgroundColor: '#4CAF50',
  borderRadius: 4,
},
progressText: {
  fontSize: 12,
  textAlign: 'right',
  color: '#666',
},
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

export default TeacherDashboardScreen;