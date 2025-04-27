import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';

function LessonUnit1Screen({ navigation }) {
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 5; // สมมติว่ามี 5 หัวข้อย่อย
  
  // เปลี่ยนไปที่หัวข้อถัดไป
  const goToNextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      // เลื่อนขึ้นด้านบนของหน้าจอเมื่อเปลี่ยนหัวข้อ
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };
  
  // เปลี่ยนไปที่หัวข้อก่อนหน้า
  const goToPrevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      // เลื่อนขึ้นด้านบนของหน้าจอเมื่อเปลี่ยนหัวข้อ
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };
  
  const scrollViewRef = React.useRef();
  
  // เนื้อหาตามหัวข้อย่อย
  const renderContent = () => {
    switch(currentSection) {
      case 1:
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>ทักษะกระบวนการทางวิทยาศาสตร์</Text>
            <Image
              source={require('./assets/images/scientific-method.png')}
              style={styles.contentImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              ทักษะกระบวนการทางวิทยาศาสตร์เป็นพื้นฐานสำคัญในการเรียนรู้วิทยาศาสตร์ ประกอบด้วยทักษะต่าง ๆ ที่ช่วยให้เราสามารถค้นหาความรู้และทำความเข้าใจปรากฏการณ์ทางธรรมชาติได้อย่างเป็นระบบ
            </Text>
            <Text style={styles.subheading}>ทักษะกระบวนการทางวิทยาศาสตร์ขั้นพื้นฐาน</Text>
            <Text style={styles.paragraph}>
              1. <Text style={styles.bold}>การสังเกต (Observing)</Text> - การใช้ประสาทสัมผัสทั้ง 5 ในการรวบรวมข้อมูล
            </Text>
            <Text style={styles.paragraph}>
              2. <Text style={styles.bold}>การวัด (Measuring)</Text> - การใช้เครื่องมือวัดเพื่อหาปริมาณของสิ่งต่าง ๆ
            </Text>
            <Text style={styles.paragraph}>
              3. <Text style={styles.bold}>การจำแนกประเภท (Classifying)</Text> - การจัดกลุ่มหรือจำแนกวัตถุตามเกณฑ์
            </Text>
            <Text style={styles.paragraph}>
              4. <Text style={styles.bold}>การหาความสัมพันธ์ (Relating)</Text> - การหาความเกี่ยวข้องระหว่างสิ่งต่าง ๆ
            </Text>
            <Text style={styles.paragraph}>
              5. <Text style={styles.bold}>การคำนวณ (Computing)</Text> - การนำตัวเลขมาคำนวณเพื่อให้ได้คำตอบ
            </Text>
            <Text style={styles.paragraph}>
              6. <Text style={styles.bold}>การสื่อความหมาย (Communicating)</Text> - การนำเสนอข้อมูลในรูปแบบต่าง ๆ
            </Text>
            <Text style={styles.paragraph}>
              7. <Text style={styles.bold}>การลงความเห็นจากข้อมูล (Inferring)</Text> - การแปลความหมายหรือการลงข้อสรุปจากข้อมูลที่มีอยู่
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>ทักษะกระบวนการทางวิทยาศาสตร์ขั้นสูง</Text>
            <Image
              source={require('./assets/images/advanced-science.png')}
              style={styles.contentImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              ทักษะกระบวนการทางวิทยาศาสตร์ขั้นสูงเป็นทักษะที่ซับซ้อนมากขึ้น ซึ่งจำเป็นต้องใช้ทักษะขั้นพื้นฐานหลายทักษะร่วมกัน
            </Text>
            <Text style={styles.subheading}>ทักษะกระบวนการทางวิทยาศาสตร์ขั้นสูง</Text>
            <Text style={styles.paragraph}>
              1. <Text style={styles.bold}>การกำหนดและควบคุมตัวแปร</Text> - การระบุตัวแปรต้น ตัวแปรตาม และตัวแปรควบคุมในการทดลอง
            </Text>
            <Text style={styles.paragraph}>
              2. <Text style={styles.bold}>การตั้งสมมติฐาน</Text> - การคาดการณ์คำตอบที่อาจเป็นไปได้ก่อนการทดลอง
            </Text>
            <Text style={styles.paragraph}>
              3. <Text style={styles.bold}>การทดลอง</Text> - การปฏิบัติตามขั้นตอนเพื่อทดสอบสมมติฐาน
            </Text>
            <Text style={styles.paragraph}>
              4. <Text style={styles.bold}>การตีความหมายข้อมูลและลงข้อสรุป</Text> - การวิเคราะห์ผลการทดลองและสรุปผล
            </Text>
            <Text style={styles.paragraph}>
              5. <Text style={styles.bold}>การกำหนดนิยามเชิงปฏิบัติการ</Text> - การให้ความหมายของคำหรือข้อความในเชิงที่สามารถสังเกตหรือวัดได้
            </Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>วิธีการทางวิทยาศาสตร์</Text>
            <Image
              source={require('./assets/images/sci-method.png')}
              style={styles.contentImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              วิธีการทางวิทยาศาสตร์เป็นกระบวนการที่นักวิทยาศาสตร์ใช้ในการค้นหาคำตอบหรือแก้ปัญหาอย่างเป็นระบบ
            </Text>
            <Text style={styles.subheading}>ขั้นตอนวิธีการทางวิทยาศาสตร์</Text>
            <Text style={styles.paragraph}>
              1. <Text style={styles.bold}>ขั้นระบุปัญหา</Text> - การตั้งคำถามหรือระบุสิ่งที่อยากรู้
            </Text>
            <Text style={styles.paragraph}>
              2. <Text style={styles.bold}>ขั้นตั้งสมมติฐาน</Text> - การคาดคะเนคำตอบที่น่าจะเป็นไปได้
            </Text>
            <Text style={styles.paragraph}>
              3. <Text style={styles.bold}>ขั้นตรวจสอบสมมติฐาน</Text> - การทดลองหรือเก็บรวบรวมข้อมูลเพื่อทดสอบสมมติฐาน
            </Text>
            <Text style={styles.paragraph}>
              4. <Text style={styles.bold}>ขั้นวิเคราะห์ข้อมูล</Text> - การนำข้อมูลมาวิเคราะห์เพื่อสรุปผล
            </Text>
            <Text style={styles.paragraph}>
              5. <Text style={styles.bold}>ขั้นสรุปผล</Text> - การลงข้อสรุปว่าผลการทดลองสอดคล้องกับสมมติฐานหรือไม่
            </Text>
          </View>
        );
      case 4:
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>การทดลองทางวิทยาศาสตร์</Text>
            <Image
              source={require('./assets/images/experiment.png')}
              style={styles.contentImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              การทดลองทางวิทยาศาสตร์เป็นการตรวจสอบสมมติฐานผ่านการปฏิบัติจริง ซึ่งช่วยให้เราได้ข้อมูลเชิงประจักษ์มาสนับสนุนแนวคิด
            </Text>
            <Text style={styles.subheading}>องค์ประกอบของการทดลอง</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>1. ตัวแปรต้น (Independent Variable)</Text> - ตัวแปรที่เราต้องการศึกษาผลของมัน เป็นสิ่งที่เราเปลี่ยนแปลงในการทดลอง
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>2. ตัวแปรตาม (Dependent Variable)</Text> - ตัวแปรที่เปลี่ยนแปลงไปตามตัวแปรต้น เป็นผลลัพธ์ที่เกิดขึ้นจากการเปลี่ยนแปลงตัวแปรต้น
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>3. ตัวแปรควบคุม (Controlled Variables)</Text> - ตัวแปรอื่น ๆ ที่อาจส่งผลต่อการทดลอง ซึ่งเราต้องควบคุมให้คงที่
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>4. กลุ่มควบคุม (Control Group)</Text> - กลุ่มที่ไม่ได้รับการเปลี่ยนแปลงตัวแปรต้น เพื่อใช้เปรียบเทียบกับกลุ่มทดลอง
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>5. กลุ่มทดลอง (Experimental Group)</Text> - กลุ่มที่ได้รับการเปลี่ยนแปลงตัวแปรต้น
            </Text>
          </View>
        );
      case 5:
        return (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>ประโยชน์ของวิทยาศาสตร์ในชีวิตประจำวัน</Text>
            <Image
              source={require('./assets/images/science-daily.png')}
              style={styles.contentImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              วิทยาศาสตร์มีความสำคัญและเกี่ยวข้องกับชีวิตประจำวันของเราอย่างมาก ทั้งทางตรงและทางอ้อม
            </Text>
            <Text style={styles.subheading}>ประโยชน์ของวิทยาศาสตร์</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>1. ด้านการแพทย์และสาธารณสุข</Text> - การพัฒนายารักษาโรค วัคซีน และเทคโนโลยีทางการแพทย์ต่าง ๆ
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>2. ด้านการเกษตร</Text> - การปรับปรุงพันธุ์พืชและสัตว์ การพัฒนาเทคนิคการเพาะปลูกและการเลี้ยงสัตว์
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>3. ด้านการสื่อสารและเทคโนโลยี</Text> - การพัฒนาโทรศัพท์มือถือ อินเทอร์เน็ต และเทคโนโลยีการสื่อสารต่าง ๆ
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>4. ด้านการคมนาคมและขนส่ง</Text> - การพัฒนายานพาหนะและระบบขนส่งที่มีประสิทธิภาพ
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>5. ด้านอุตสาหกรรมและพลังงาน</Text> - การพัฒนาแหล่งพลังงานทางเลือกและกระบวนการผลิตที่มีประสิทธิภาพ
            </Text>
            
            <View style={styles.quizContainer}>
              <Text style={styles.quizTitle}>คำถามทบทวน</Text>
              <Text style={styles.quizQuestion}>1. ขั้นตอนแรกของวิธีการทางวิทยาศาสตร์คืออะไร?</Text>
              <Text style={styles.quizQuestion}>2. ตัวแปรที่เราเปลี่ยนแปลงในการทดลองเรียกว่าอะไร?</Text>
              <Text style={styles.quizQuestion}>3. ทักษะการใช้ประสาทสัมผัสทั้ง 5 ในการรวบรวมข้อมูลคือทักษะใด?</Text>
              
              <TouchableOpacity style={styles.quizButton}>
                <Text style={styles.quizButtonText}>ทำแบบทดสอบเพิ่มเติม</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{'< กลับ'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>หน่วยที่ 1: เรียนรู้วิทยาศาสตร์อย่างไร</Text>
        <View style={styles.placeholderView} />
      </View>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${(currentSection / totalSections) * 100}%` }
          ]} 
        />
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {renderContent()}
      </ScrollView>
      
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentSection === 1 && styles.disabledButton]}
          onPress={goToPrevSection}
          disabled={currentSection === 1}
        >
          <Text style={styles.navButtonText}>ก่อนหน้า</Text>
        </TouchableOpacity>
        
        <Text style={styles.pageIndicator}>{currentSection} / {totalSections}</Text>
        
        <TouchableOpacity
          style={[styles.navButton, currentSection === totalSections && styles.disabledButton]}
          onPress={goToNextSection}
          disabled={currentSection === totalSections}
        >
          <Text style={styles.navButtonText}>ถัดไป</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  placeholderView: {
    width: 50,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4CAF50',
  },
  contentImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#2E7D32',
  },
  bold: {
    fontWeight: 'bold',
  },
  quizContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2E7D32',
  },
  quizQuestion: {
    fontSize: 15,
    marginBottom: 10,
    color: '#333',
  },
  quizButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  quizButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pageIndicator: {
    fontSize: 14,
    color: '#666',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
});

export default LessonUnit1Screen;