import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
});


const BillTo = ({invoice}) => (
    <>
     {console.log(invoice)}
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To: {invoice.customer.firstName} {invoice.customer.lastName}</Text>
        <Text>{invoice.company}</Text>
        <Text>Address: {invoice.address}</Text>
        <Text>Phone: {invoice.customer.phone}</Text>
        <Text>Email: {invoice.customer.email}</Text>
    </View></>
   
);

export default BillTo