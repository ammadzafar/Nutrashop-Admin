import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './invoiceHeading'
import BillTo from './billTo'
import InvoiceNo from './invoiceNo'
import InvoiceItemsTable from './invoiceItemTables'
import InvoiceThankYouMsg from './thankYou'
import logo from '../../assets/images/logos/abc.png'
import {PDFViewer} from '@react-pdf/renderer'
import invoiceData from '../../data/invoice_data'
import { ConsoleSqlOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux"
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 130,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const FinalInvoice = (props)=>{
    // console.log(props)
    const {pendingOrder} = useSelector(({orders}) => orders);

   console.log(pendingOrder)
    return(
        <Invoice invoice={pendingOrder}/>
    )
}
const Invoice = ({ invoice }) => (
 <>
  {console.log(invoice)}
     <PDFViewer width="1000" height="600" className="app" >
        <Document>
            <Page size="A4" style={styles.page}>
                <Image style={styles.logo} src={logo} />
                <InvoiceTitle title='Invoice' />
                <InvoiceNo invoice={invoice} />
                <BillTo invoice={invoice} />
                <InvoiceItemsTable invoice={invoice.OrderVariants} />
                <InvoiceThankYouMsg />
            </Page>
        </Document></PDFViewer></>
   
          
    
   
);
export {Invoice,FinalInvoice}