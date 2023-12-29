import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from './fees.styles';
import { useEffect } from 'react';
import { useAppSelector } from '../../../store/hook';
import RazorpayCheckout from 'react-native-razorpay';
import * as COLORS from '../../utils/color';

const Fees = () => {
    const user = useAppSelector((state) => state.profile.data);
    const [studentData, setStudentData] = useState(null);
    const [feeData, setFeeData] = useState(null);
    const email = user.email;
    const [amt, setAmt] = useState(null);

    let razorid = 'rzp_test_DKvXdtw930GitB';
    let razorsecret = 'FrnTnnbrQOW5OUUeghAIuo2i';
    let currency = 'INR';
    let userName = user.firstName + " " + user.lastName

    useEffect(() => {
        showFee();
    }, []);

    const showFee = async () => {
        try {
            let student;

            if (user.loginType === 'Parent') {
                const parentQuery = await firestore()
                    .collection('Users')
                    .where('email', '==', email)
                    .get();
                const parent = parentQuery.docs[0].data().child;
                const studentQuery = await firestore()
                    .collection('Users')
                    .where('email', '==', parent)
                    .get();
                student = studentQuery.docs[0].data();
            } else {
                const studentQuery = await firestore()
                    .collection('Users')
                    .where('email', '==', email)
                    .get();
                student = studentQuery.docs[0].data();
            }

            setStudentData(student);

            const feeQuerySnapshot = await firestore()
                .collection('Fees')
                .where('email', '==', student.email)
                .get();

            if (!feeQuerySnapshot.empty) {
                const feesData = feeQuerySnapshot.docs[0].data();
                setFeeData(feesData);
                setAmt(1);

                if (feesData && feesData.hasOwnProperty('isPaid')) {
                } else {
                    console.log('isPaid property not found in feesData');
                }
            } else {
                console.log('No fee data found for the student');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const payFees = async () => {
        if (feeData.isPaid) {
            Alert.alert("Warning", "Fees already paid");
        }
        else {
            const feeDocument = await firestore()
                .collection('Fees')
                .where('email', '==', studentData.email)
                .get();
            const feeDocId = feeDocument.docs[0].id;
            var options = {
                description: 'Fees payment for the academic year ' + feeData.year,
                image: '',
                currency: currency,
                key: razorid,
                amount: amt * 100,
                name: 'VES App',
                order_id: '',
                prefill: {
                    email: user.email,
                    contact: user.phoneNo,
                    name: userName
                },
                theme: { color: COLORS.lightMaroon }
            }

            RazorpayCheckout.open(options)
                .then((data) => {
                    firestore()
                        .collection('Fees')
                        .doc(feeDocId)
                        .update({
                            isPaid: true,
                            paymentId: data.razorpay_payment_id,
                            feesPaid: feeData.feesRemaining,
                            feesRemaining: 0,
                        });
                    showFee();
                    alert(`Success. Payment Successful`);
                })
                .catch((error) => {
                    alert(`Payment failed. If amount is deducted from you account please contact the college authorities`);
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>Name: {studentData?.firstName + " " + studentData?.lastName}</Text>
            </View>
            <Text></Text>
            <View style={styles.card}>
                {feeData && (
                    feeData.isPaid == true ? (
                        <Text style={styles.label}>Fees Paid: ₹ {feeData.feesPaid}</Text>
                    ) : (
                        <Text style={styles.label}>Fees Remaining: ₹ {feeData.feesRemaining}</Text>
                    )
                )}
            </View>
            <Text></Text>
            <View style={styles.card}>
                {feeData && feeData.year ? (
                    <Text style={styles.label}>Academic Year: {feeData.year}</Text>
                ) : (
                    <Text style={styles.label}>Academic Year: N/A</Text>
                )}
            </View>
            <Text></Text>
            <View style={styles.card}>
                <Text style={styles.label}>Total annual fees: ₹ {feeData ? feeData.annualFees : 'N/A'}</Text>
            </View>
            <Text></Text>
            <TouchableOpacity
                style={styles.card}
                onPress={payFees}
            >
                <Text style={styles.label1}>Pay Fees</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Fees;