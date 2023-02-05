import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from "moment";

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    }

});


const InvoiceNo = ({invoice}) => (
    <>
    {console.log(invoice)}

 
    <Fragment>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoiceDate}>{invoice.order_no}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}></Text>
            <Text >Date & Time: {moment(invoice.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
        </View >
    </Fragment>
    </>
   
);

export default InvoiceNo