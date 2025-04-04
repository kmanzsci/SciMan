import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// นำเข้าหน้าต่างๆ
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import LessonsScreen from './LessonsScreen';

// สร้าง Stack Navigator
const Stack = createNativeStackNavigator();

// หน้าหลัก (Home Screen)
function HomeScreen({ navigation }) {
  const handlePress = () => {
    // นำทางไปยังหน้า Login เมื่อกดปุ่ม
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to SciMan</Text>
      <Text style={styles.subtitle}>แอพพลิเคชั่นการเรียนรู้วิทยาศาสตร์</Text>
      
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>เข้าสู่การเรียนรู้</Text>
      </TouchableOpacity>
      
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>โดย นายวิทวัส กันแจ่ม</Text>
        <Text style={styles.footerText}>ครูโรงเรียนศรีสองรักษ์วิทยา อำเภอด่านซ้าย จังหวัดเลย</Text>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

// App component ที่จะใช้ NavigationContainer
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            title: 'เข้าสู่ระบบ',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ 
            title: 'ลงทะเบียน',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ 
            title: 'ลืมรหัสผ่าน',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="Lessons" 
          component={LessonsScreen} 
          options={{ 
            title: 'บทเรียนวิทยาศาสตร์',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            // ป้องกันการกลับไปหน้า login ด้วยปุ่ม back
            headerLeft: () => null,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
});