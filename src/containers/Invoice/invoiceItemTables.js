import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './tableHeaders'
import InvoiceTableRow from './tableRows'
import InvoiceTableBlankSpace from './space'
import InvoiceTableFooter from './footer'

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

const InvoiceItemsTable = ({invoice}) => (
    <>
     
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice} />
        {/* <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice} /> */}
        <InvoiceTableFooter items={invoice} />
    </View>
    </>
   
);

export default InvoiceItemsTable