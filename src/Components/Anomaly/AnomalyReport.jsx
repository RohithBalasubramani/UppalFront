import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import ChartsAno from "./ChartAno";
import TableAno from "./TableAno";
import TableReport from "./ReportTable";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 24,
    textAlign: "middle",
    fontWeight: 500,
  },
});

const AnomalyReport = ({ data, totalDataset }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>Anomaly Report</Text>
          {/* Add your JSX content here */}
          <View>
            <ChartsAno data={data} totalDataset={totalDataset} />
          </View>
          <View>
            <TableReport tablesData={data} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AnomalyReport;
