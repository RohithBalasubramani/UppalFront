import * as XLSX from "xlsx";
import dayjs from "dayjs"; // Ensure you have dayjs installed: npm install dayjs

export const exportToExcel = ({
  data,
  filename,
  startDatetime,
  endDatetime,
}) => {
  if (!data || data.length === 0) {
    console.warn("No data available for export.");
    return;
  }

  // Convert the datetime to string format
  const formattedStartDatetime = dayjs(startDatetime).format(
    "DD/MM/YYYY HH:mm:ss"
  );
  const formattedEndDatetime = dayjs(endDatetime).format("DD/MM/YYYY HH:mm:ss");

  // Determine which columns have data (filter out empty columns)
  const validColumns = Object.keys(data[0]).filter((key) =>
    data.some(
      (row) =>
        row[key] !== "" &&
        row[key] !== null &&
        key !== "timestamp" &&
        key !== "id"
    )
  );

  // Format the data for export and round off values
  const formattedData = data.map((row) => {
    const formattedRow = {
      Timeseries: new Date(row.timestamp).toLocaleDateString("en-GB"),
      ...validColumns.reduce((acc, key) => {
        // Round off values to 2 decimal places
        if (typeof row[key] === "number") {
          acc[key] = row[key].toFixed(2);
        } else {
          acc[key] = row[key] || "";
        }
        return acc;
      }, {}),
    };
    return formattedRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Add merged cells for "From Datetime", "To Datetime"
  worksheet["!merges"] = [
    { s: { r: 0, c: 1 }, e: { r: 0, c: validColumns.length + 1 } }, // Merge "From Datetime"
    { s: { r: 1, c: 1 }, e: { r: 1, c: validColumns.length + 1 } }, // Merge "To Datetime"
  ];

  // Insert the header rows with the correct datetime values
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      ["From Datetime", formattedStartDatetime],
      ["To Datetime", formattedEndDatetime],
      ["Timeseries", ...validColumns],
    ],
    { origin: "A1" }
  );

  // Move the data down three rows to fit under the header
  XLSX.utils.sheet_add_json(worksheet, formattedData, {
    skipHeader: true,
    origin: "A4",
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  XLSX.writeFile(workbook, filename || "table_report.xlsx");
};
