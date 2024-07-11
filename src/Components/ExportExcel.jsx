import * as XLSX from "xlsx";

const exportToExcel = (jsonData, fileName) => {
  // Create a worksheet from the JSON data
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Create a new workbook and add the worksheet to it
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a binary string
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a Blob from the binary string
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });

  // Create a link element to download the Blob as an Excel file
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${fileName}.xlsx`);

  // Append the link to the document body and click it to start the download
  document.body.appendChild(link);
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};
