import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert
} from 'react-native';
import { resetPassword } from './src/firebase/auth';

function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleResetPassword = async () => {
    // ตรวจสอบข้อมูลก่อนดำเนินการต่อ
    if (email.trim() === '') {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกอีเมล');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // ส่งอีเมลรีเซ็ตรหัสผ่านด้วย Firebase
      await resetPassword(email);
      setIsEmailSent(true);
    } catch (error) {
      console.error('Reset password error:', error);
      
      if (error.code === 'auth/user-not-found') {
        Alert.alert('ข้อผิดพลาด', 'ไม่พบอีเมลนี้ในระบบ');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('ข้อผิดพลาด', 'รูปแบบอีเมลไม่ถูกต้อง');
      } else {
        Alert.alert('ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการส่งอีเมล โปรดลองอีกครั้ง');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    if (isEmailSent) {
      // ถ้าส่งอีเมลแล้ว กลับไปหน้าล็อกอิน
      navigation.navigate('Login');
    } else {
      // ถ้ายังไม่ได้ส่งอีเมล กลับไปหน้าก่อนหน้า
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {!isEmailSent ? (
              <>
                <Text style={styles.title}>ลืมรหัสผ่าน</Text>
                <Text style={styles.subTitle}>กรุณากรอกข้อมูลเพื่อรีเซ็ทรหัสผ่าน</Text>
                
                {/* เลือกประเภทผู้ใช้ */}
                <View style={styles.userTypeContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.userTypeButton, 
                      userType === 'student' && styles.activeUserType
                    ]}
                    onPress={() => setUserType('student')}
                  >
                    <Text 
                      style={[
                        styles.userTypeText, 
                        userType === 'student' && styles.activeUserTypeText
                      ]}
                    >
                      นักเรียน
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.userTypeButton, 
                      userType === 'teacher' && styles.activeUserType
                    ]}
                    onPress={() => setUserType('teacher')}
                  >
                    <Text 
                      style={[
                        styles.userTypeText, 
                        userType === 'teacher' && styles.activeUserTypeText
                      ]}
                    >
                      ครู
                    </Text>
                  </TouchableOpacity>
                </View>
                
                {/* ฟอร์มรีเซ็ทรหัสผ่าน */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {userType === 'student' ? 'รหัสประจำตัวนักเรียน' : 'ชื่อผู้ใช้ (Username)'}
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={identifier}
                    onChangeText={setIdentifier}
                    placeholder={userType === 'student' ? 'กรอกรหัสประจำตัวนักเรียน' : 'กรอกชื่อผู้ใช้'}
                    placeholderTextColor="#999"
                    keyboardType={userType === 'student' ? 'number-pad' : 'default'}
                    autoCapitalize="none"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>อีเมลที่ใช้ลงทะเบียน</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="กรอกอีเมลที่ใช้ลงทะเบียน"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                
                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                  <Text style={styles.resetButtonText}>รีเซ็ทรหัสผ่าน</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.successContainer}>
                  <Text style={styles.title}>ส่งอีเมลแล้ว</Text>
                  <Text style={styles.message}>
                    ระบบได้ส่งลิงก์สำหรับรีเซ็ทรหัสผ่านไปยังอีเมล {email} แล้ว 
                    กรุณาตรวจสอบอีเมลของคุณและทำตามคำแนะนำในอีเมล
                  </Text>
                  <TouchableOpacity style={styles.loginButton} onPress={handleGoBack}>
                    <Text style={styles.loginButtonText}>กลับไปหน้าเข้าสู่ระบบ</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {!isEmailSent && (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <Text style={styles.backButtonText}>กลับไปหน้าเข้าสู่ระบบ</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    ...(Platform.OS === 'web' 
      ? { boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }
    ),
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeUserType: {
    backgroundColor: '#4CAF50',
    borderRadius: 7,
  },
  userTypeText: {
    fontWeight: '500',
    color: '#666',
  },
  activeUserTypeText: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default ForgotPasswordScreen;