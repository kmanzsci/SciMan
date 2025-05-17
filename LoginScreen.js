import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { loginWithEmail } from './src/firebase/auth';

function LoginScreen({ navigation }) {
  const [userType, setUserType] = useState('student'); // 'student' หรือ 'teacher'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateInput = () => {
    if (username.trim() === '') {
      Alert.alert('ข้อผิดพลาด', userType === 'student' ? 'กรุณากรอกรหัสนักเรียน' : 'กรุณากรอกชื่อผู้ใช้');
      return false;
    }
    if (password.trim() === '') {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกรหัสผ่าน');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('ข้อผิดพลาด', 'รหัสผ่านต้องมีอย่างน้อย 6 หลัก');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      console.log("Attempting to login with:", username, password);
      const { user, userData } = await loginWithEmail(username, password);
      console.log("Login successful:", userData);
      
      // ตรวจสอบประเภทผู้ใช้...
    } catch (error) {
      console.error('Login error details:', error);
      Alert.alert(
        'ข้อผิดพลาดในการเข้าสู่ระบบ', 
        `รายละเอียด: ${error.message || 'ไม่สามารถเชื่อมต่อกับระบบได้'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // กำหนดค่าเริ่มต้นสำหรับผู้ใช้ทดลองใช้งาน
    const guestName = userType === 'student' ? 'นักเรียนทดลองใช้งาน' : 'ครูทดลองใช้งาน';
    
    // นำทางไปยังหน้าบทเรียนโดยตรง
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Lessons',
          params: {
            userType: userType,
            username: guestName,
          },
        },
      ],
    });
  };

  const handleRegister = () => {
    // นำทางไปหน้าลงทะเบียน
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    // นำทางไปหน้าลืมรหัสผ่าน
    navigation.navigate('ForgotPassword');
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
          <View style={styles.logoContainer}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>SciMan</Text>
            <Text style={styles.subTitle}>ระบบห้องเรียนวิทยาศาสตร์</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>เข้าสู่ระบบ</Text>

            {/* เลือกประเภทผู้ใช้ */}
            <View style={styles.userTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  userType === 'student' && styles.activeUserType,
                ]}
                onPress={() => setUserType('student')}
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

            {/* ฟอร์มเข้าสู่ระบบ */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {userType === 'student' ? 'รหัสประจำตัวนักเรียน' : 'ชื่อผู้ใช้ (Username)'}
              </Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder={
                  userType === 'student' ? 'กรอกรหัสประจำตัวนักเรียน' : 'กรอก Username'
                }
                placeholderTextColor="#999"
                keyboardType={userType === 'student' ? 'number-pad' : 'default'}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>รหัสผ่าน</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="กรอกรหัสผ่าน 6 หลัก"
                placeholderTextColor="#999"
                secureTextEntry={true}
                maxLength={6}
              />
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>กำลังเข้าสู่ระบบ...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
                  <Text style={styles.guestButtonText}>เข้าสู่ระบบโดยไม่ต้องลงทะเบียน</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.optionsContainer}>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.optionText}>ลงทะเบียน</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.optionText}>ลืมรหัสผ่าน?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        disabled={isLoading}
      >
        <Text style={styles.backButtonText}>กลับไปหน้าหลัก</Text>
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
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    color: '#555',
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
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestButton: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  guestButtonText: {
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  optionText: {
    color: '#4CAF50',
    fontSize: 14,
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

export default LoginScreen;