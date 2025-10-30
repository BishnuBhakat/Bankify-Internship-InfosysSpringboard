package org.example.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.Models.Transaction;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class DownloadTransactions {
    public static byte[] exportTransactions(List<Transaction> transactions) throws Exception {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Transactions");


        String[] headers = {"Transaction ID", "Account ID", "Amount", "Date", "Sender Account", "Receiver Account", "Mode", "Description"};
        Row headerRow = sheet.createRow(0);

        CellStyle headerStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        headerStyle.setFont(font);

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }


        int rowNum = 1;
        for (Transaction t : transactions) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(t.getTransaction_id());
            row.createCell(1).setCellValue(t.getAccount_id());
            row.createCell(2).setCellValue(t.getTransaction_amount());
            row.createCell(3).setCellValue(String.valueOf(t.getTransaction_date()));
            row.createCell(4).setCellValue(t.getSender_account_number());
            row.createCell(5).setCellValue(t.getReceiver_account_number());
            row.createCell(6).setCellValue(t.getMode());
            row.createCell(7).setCellValue(t.getDescription());
        }

        // Auto-size columns
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return out.toByteArray();
    }
}



