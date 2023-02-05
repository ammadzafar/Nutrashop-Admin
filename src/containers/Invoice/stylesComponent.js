import styled from '@react-pdf/styled-components';

const Heading = styled.Text`
  margin: 10px;
  font-size: 22px;
  font-family: 'Helvetica';
`;

const MyDocument = () => (
    <Document>
        <Page>
            <Heading>
                D'oh!
            </Heading>
        </Page>
    </Document>
)