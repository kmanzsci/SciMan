import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

function RegisterScreen({ navigation, route }) {
  // รับค่าจาก route params (ถ้ามี)
  const fromGuest = route.params?.fromGuest || false;
  const initialUserType = route.params?.userType || 'student';

  const [userType, setUserType] = useState(initialUserType);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // แสดงข้อความต้อนรับพิเศษสำหรับผู้ใช้ที่มาจากการทดลองใช้งาน
  useEffect(() => {
    if (fromGuest) {
      Alert.alert(
        'ยินดีต้อนรับสู่การลงทะเบียน',
        'คุณได้ทดลองใช้งานแล้ว หากต้องการใช้งานแบบเต็มรูปแบบ กรุณาลงทะเบียนผู้ใช้งาน',
        [{ text: 'ตกลง' }]
      );
    }
  }, [fromGuest]);

  // URL ของ Web App จาก Google Apps Script ที่คุณได้จากการ Deploy
  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxZ2uvEi4fX6B0QAG1DQ4MggYmMlaCVt792Ry_zIZTUhDIJlo8pAfrRQCzHrY_-uLlyeQ/exec'; // Replace with your actual URL

  const validateInput = () => {
    if (fullName.trim() === '') {
      setErrorMessage('กรุณากรอกชื่อ-นามสกุล');
      return false;
    }
    if (email.trim() === '') {
      setErrorMessage('กรุณากรอกอีเมล');
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('รูปแบบอีเมลไม่ถูกต้อง');
      return false;
    }

    if (userType === 'student') {
      if (studentId.trim() === '') {
        setErrorMessage('กรุณากรอกรหัสประจำตัวนักเรียน');
        return false;
      }
    } else {
      if (username.trim() === '') {
        setErrorMessage('กรุณากรอกชื่อผู้ใช้');
        return false;
      }
    }

    if (password.trim() === '') {
      setErrorMessage('กรุณากรอกรหัสผ่าน');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('รหัสผ่านต้องมีอย่างน้อย 6 หลัก');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setErrorMessage(''); // Reset error message

    if (!validateInput()) {
      return;
    }

    setIsLoading(true);

    const formData = {
      action: 'register', // Add the action for registration
      userType,
      fullName,
      email,
      studentId: userType === 'student' ? studentId : '',
      username: userType === 'teacher' ? username : '',
      password,
    };

    try {
      console.log('Sending data to:', GOOGLE_SCRIPT_URL);
      console.log('Data being sent:', JSON.stringify(formData));

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Set Content-Type
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const text = await response.text();
      console.log('Response text:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error('ไม่สามารถประมวลผลการตอบกลับจากเซิร์ฟเวอร์ได้');
      }

      if (result.status === 'success') {
        Alert.alert(
          'ลงทะเบียนสำเร็จ',
          'คุณได้ลงทะเบียนเรียบร้อยแล้ว จะนำไปสู่หน้าเข้าสู่ระบบ',
          [
            {
              text: 'ตกลง',
              onPress: () => {
                navigation.navigate('Login'); // Navigate to Login
              },
            },
          ]
        );
      } else {
        setErrorMessage(result.message || 'ไม่สามารถลงทะเบียนได้ โปรดลองอีกครั้ง');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(
        error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ โปรดลองอีกครั้ง'
      );
    } finally {
      setIsLoading(false);
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
            <Text style={styles.title}>ลงทะเบียน</Text>
            
            {fromGuest && (
              <View style={styles.guestInfoContainer}>
                <Text style={styles.guestInfoText}>
                  ลงทะเบียนเพื่อใช้งานแบบเต็มรูปแบบ หลังจากทดลองใช้งาน
                </Text>
              </View>
            )}

            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* เลือกประเภทผู้ใช้ */}
            <View style={styles.userTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  userType === 'student' && styles.activeUserType,
                ]}
                onPress={() => setUserType('student')}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'student' && styles.activeUserTypeText,
                  ]}
                >
                  นักเรียน
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  userType === 'teacher' && styles.activeUserType,
                ]}
                onPress={() => setUserType('teacher')}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'teacher' && styles.activeUserTypeText,
                  ]}
                >
                  ครู
                </Text>
              </TouchableOpacity>
            </View>

            {/* ฟอร์มลงทะเบียน */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ชื่อ-นามสกุล</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="กรอกชื่อและนามสกุล"
                placeholderTextColor="#999"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>อีเมล</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="กรอกอีเมล"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            {userType === 'student' ? (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>รหัสประจำตัวนักเรียน</Text>
                <TextInput
                  style={styles.input}
                  value={studentId}
                  onChangeText={setStudentId}
                  placeholder="กรอกรหัสประจำตัวนักเรียน"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  editable={!isLoading}
                />
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>ชื่อผู้ใช้ (Username)</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="กรอกชื่อผู้ใช้"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>รหัสผ่าน (6 หลัก)</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="กรอกรหัสผ่าน 6 หลัก"
                placeholderTextColor="#999"
                secureTextEntry={true}
                maxLength={6}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>ยืนยันรหัสผ่าน</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                placeholderTextColor="#999"
                secureTextEntry={true}
                maxLength={6}
                editable={!isLoading}
              />
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>กำลังลงทะเบียน...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>ลงทะเบียน</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        disabled={isLoading}
      >
        <Text style={styles.backButtonText}>กลับไปหน้าเข้าสู่ระบบ</Text>
      </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  guestInfoContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  guestInfoText: {
    color: '#2e7d32',
    textAlign: 'center',
    fontSize: 14,
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
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
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

export default RegisterScreen;