package com.planit.service;

import com.planit.model.Invoice;

public interface InvoiceService {
    void generateInvoice(String filename, String content);
    Invoice getInvoiceById(Long invoiceId); 
}
