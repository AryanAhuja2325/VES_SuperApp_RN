import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Linking, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Placement.style';

const Placement = () => {
  const [isPhoneClicked, setPhoneClicked] = useState(false);
  const [isEmailClicked, setEmailClicked] = useState(false);

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`);
    setPhoneClicked(true);
  };

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
    setEmailClicked(true);
  };

  const openPDFInGoogleDriveViewer = (pdfUrls) => {
    pdfUrls.forEach((pdfUrl) => {
      const driveViewerUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(pdfUrl)}`;
      Linking.openURL(driveViewerUrl);
    });
  };

  const handleRecruitersPress = () => {
    openPDFInGoogleDriveViewer(['https://ves.ac.in/polytechnic/wp-content/uploads/2023/03/Our-Recruiters-logos-1.pdf']);
  };

  const handleInternshipDetailsPress = () => {
    openPDFInGoogleDriveViewer(['https://ves.ac.in/polytechnic/wp-content/uploads/2023/03/Internship-Details.pdf']);
  };

  const handlePlacementDetailsPress = (year) => {
    let pdfUrl = '';
    switch (year) {
      case '2021-22':
        pdfUrl = 'https://ves.ac.in/polytechnic/wp-content/uploads/2023/03/Placement-Details-21-22.pdf';
        break;
      case '2020-21':
        pdfUrl = 'https://ves.ac.in/polytechnic/wp-content/uploads/2023/03/Placement-Details-20-21.pdf';
        break;
      case '2019-20':
        pdfUrl = 'https://ves.ac.in/polytechnic/wp-content/uploads/2023/03/Placement-Details-19-20.pdf';
        break;
      case '2018-19':
        pdfUrl = 'https://ves.ac.in/polytechnic/wp-content/uploads/2023/03/Placement-Details-18-19.pdf';
        break;
      case '2017-18':
        pdfUrl = 'https://ves.ac.in/polytechnic/wp-content/uploads/2023/03/Placement-Details-17-18.pdf';
        break;
      case '2016-17':
        pdfUrl = 'https://ves.ac.in/polytechnic/wp-content/uploads/2023/03/Placement-Details-16-17.pdf';
        break;
      default:
        break;
    }

    if (pdfUrl !== '') {
      openPDFInGoogleDriveViewer([pdfUrl]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/imgs/Kalpesh-B.jpg')} style={styles.image} />
        <View style={styles.coloredSection1}>
          <Text style={styles.heading}>Mr. Kalpesh Bagal – In-charge Training and Placement Cell</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>About Training and Placement Cell</Text>
          <Text style={styles.aboutText}>Training and Placement Cell is an integral part of the institute. The TPO office serves to bridge the gap between a job aspirant and a prospective employer. It prepares and helps students to plan their careers by providing them information about the industries. The institute has provided complete infrastructure for the effective functioning of the cell. The Cell has a focused approach to prepare students from the first year to final year on various activities such as communication skills, personality development, technical training, group discussion, etc.</Text>
                        <Text style={styles.aboutText}>The placement officer maintains consistent communication with leading companies for the placement of students. The TPO office keeps close liaison with various industrial establishments (both private and public sectors) that conduct campus interviews and select diploma passouts from all disciplines. The placement cell provides the infrastructure facilities to conduct group discussions, tests, and interviews. The college actively organizes in-campus and out-campus interviews for the students.Job offers, interview dates, selection procedures, and results are displayed on the TPO office notice board.</Text>
                        <Text style={styles.aboutText}>As part of the industry-institute interaction, students are exposed to the actual work environment of the industry through summer internships. The TPO office helps students secure a minimum of six weeks of summer internship training in reputed industries. The TPO office ensures and takes care to provide the best arrangements and hospitality for visiting company officials.</Text>
                        <Text style={styles.aboutText}>We are proud of achieving remarkable placements and we would like to thank the corporate world for showing immense faith in our students and helping us to continue our legacy of excellence.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeading}>Contact Details</Text>
          <TouchableOpacity onPress={() => handlePhonePress('9702418363')}>
                        <Text style={[styles.contactText, isPhoneClicked && styles.clickedText]}>Mobile: 9702418363</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEmailPress('Kalpesh.bagal@ves.ac.in')}>
                        <Text style={[styles.contactText, isEmailClicked && styles.clickedText]}>Email: Kalpesh.bagal@ves.ac.in</Text>
                    </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={handleRecruitersPress}>
            <Text style={styles.subHeading}>Our Recruiters</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={handleInternshipDetailsPress}>
            <Text style={styles.subHeading}>Internship Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeading}>Placement Details</Text>
          <TouchableOpacity onPress={() => handlePlacementDetailsPress('2021-22')}>
            <Text style={styles.academicYear}>2021-22</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePlacementDetailsPress('2020-21')}>
            <Text style={styles.academicYear}>2020-21</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePlacementDetailsPress('2019-20')}>
            <Text style={styles.academicYear}>2019-20</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePlacementDetailsPress('2018-19')}>
            <Text style={styles.academicYear}>2018-19</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePlacementDetailsPress('2017-18')}>
            <Text style={styles.academicYear}>2017-18</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePlacementDetailsPress('2016-17')}>
            <Text style={styles.academicYear}>2016-17</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Placement;
