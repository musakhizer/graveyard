"use client";

import { useRef } from 'react';
import { Payment } from '@/contexts/FinanceContext';
import { Button } from '@/components/ui/button';
import { X, Download, Printer, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface PaymentReceiptProps {
  payment: Payment;
  onClose: () => void;
}

export default function PaymentReceipt({ payment, onClose }: PaymentReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getServiceTypeName = (type: string) => {
    const types: Record<string, string> = {
      plot_booking: 'Plot Booking',
      burial_service: 'Burial Service',
      maintenance: 'Maintenance',
      other: 'Other',
    };
    return types[type] || type;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-amber-500" />;
      case 'overdue':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50';
      case 'pending':
        return 'bg-amber-50';
      case 'overdue':
        return 'bg-red-50';
      default:
        return 'bg-slate-50';
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'paid':
        return 'border-green-200';
      case 'pending':
        return 'border-amber-200';
      case 'overdue':
        return 'border-red-200';
      default:
        return 'border-slate-200';
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && receiptRef.current) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Payment Receipt - ${payment.id}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: #f5f5f5;
                padding: 20px;
              }
              .receipt {
                background: white;
                max-width: 600px;
                margin: 0 auto;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 3px solid #10b981;
              }
              .company-name {
                font-size: 24px;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 8px;
              }
              .receipt-title {
                font-size: 18px;
                color: #10b981;
                font-weight: 600;
              }
              .receipt-id {
                font-size: 12px;
                color: #6b7280;
                margin-top: 5px;
              }
              .section {
                margin-bottom: 25px;
              }
              .section-title {
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                color: #6b7280;
                margin-bottom: 10px;
                letter-spacing: 0.5px;
              }
              .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-size: 13px;
              }
              .info-label {
                color: #6b7280;
              }
              .info-value {
                color: #1f2937;
                font-weight: 500;
              }
              .amount-box {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 25px;
                border-radius: 8px;
                text-align: center;
                margin: 20px 0;
              }
              .amount-label {
                font-size: 12px;
                opacity: 0.9;
                margin-bottom: 8px;
              }
              .amount-value {
                font-size: 32px;
                font-weight: 700;
              }
              .status-badge {
                display: inline-block;
                padding: 6px 16px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                margin-top: 10px;
              }
              .status-paid {
                background: #dcfce7;
                color: #15803d;
              }
              .status-pending {
                background: #fef3c7;
                color: #92400e;
              }
              .status-overdue {
                background: #fee2e2;
                color: #991b1b;
              }
              .details-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-bottom: 20px;
              }
              .detail-item {
                padding: 12px;
                background: #f9fafb;
                border-radius: 6px;
                border-left: 3px solid #10b981;
              }
              .detail-label {
                font-size: 11px;
                color: #6b7280;
                text-transform: uppercase;
                margin-bottom: 4px;
              }
              .detail-value {
                font-size: 13px;
                color: #1f2937;
                font-weight: 600;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                font-size: 11px;
                color: #9ca3af;
              }
              .print-only {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                font-size: 12px;
                color: #6b7280;
              }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="header">
                <div class="company-name">Graveyard Management System</div>
                <div class="receipt-title">OFFICIAL PAYMENT RECEIPT</div>
                <div class="receipt-id">Receipt #${payment.id}</div>
              </div>

              <div class="section">
                <div class="section-title">Customer Information</div>
                <div class="info-row">
                  <span class="info-label">Name:</span>
                  <span class="info-value">${payment.customerName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Service Type:</span>
                  <span class="info-value">${getServiceTypeName(payment.serviceType)}</span>
                </div>
              </div>

              <div class="amount-box">
                <div class="amount-label">Amount Due</div>
                <div class="amount-value">${formatCurrency(payment.amount)}</div>
              </div>

              <div class="details-grid">
                <div class="detail-item">
                  <div class="detail-label">Payment Date</div>
                  <div class="detail-value">${formatDate(payment.date)}</div>
                </div>
                ${payment.dueDate ? `
                <div class="detail-item">
                  <div class="detail-label">Due Date</div>
                  <div class="detail-value">${formatDate(payment.dueDate)}</div>
                </div>
                ` : ''}
                ${payment.plotInfo ? `
                <div class="detail-item">
                  <div class="detail-label">Plot</div>
                  <div class="detail-value">${payment.plotInfo}</div>
                </div>
                ` : ''}
                ${payment.graveInfo ? `
                <div class="detail-item">
                  <div class="detail-label">Grave</div>
                  <div class="detail-value">${payment.graveInfo}</div>
                </div>
                ` : ''}
              </div>

              <div class="section">
                <div class="section-title">Payment Status</div>
                <span class="status-badge status-${payment.status}">
                  ${payment.status.toUpperCase()}
                </span>
              </div>

              ${payment.description ? `
              <div class="section">
                <div class="section-title">Description</div>
                <div style="color: #374151; font-size: 13px; line-height: 1.5;">${payment.description}</div>
              </div>
              ` : ''}

              <div class="footer">
                <p>This is an official receipt from Graveyard Management System</p>
                <p>Generated on ${new Date().toLocaleString()}</p>
              </div>

              <div class="print-only">
                Please retain this receipt for your records.
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleDownload = () => {
    if (receiptRef.current) {
      const htmlContent = receiptRef.current.innerHTML;
      const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Receipt-${payment.id}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: #f5f5f5;
                padding: 20px;
              }
              .receipt {
                background: white;
                max-width: 600px;
                margin: 0 auto;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 3px solid #10b981;
              }
              .company-name {
                font-size: 24px;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 8px;
              }
              .receipt-title {
                font-size: 18px;
                color: #10b981;
                font-weight: 600;
              }
              .receipt-id {
                font-size: 12px;
                color: #6b7280;
                margin-top: 5px;
              }
              .section { margin-bottom: 25px; }
              .section-title {
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                color: #6b7280;
                margin-bottom: 10px;
                letter-spacing: 0.5px;
              }
              .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-size: 13px;
              }
              .info-label { color: #6b7280; }
              .info-value { color: #1f2937; font-weight: 500; }
              .amount-box {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 25px;
                border-radius: 8px;
                text-align: center;
                margin: 20px 0;
              }
              .amount-label { font-size: 12px; opacity: 0.9; margin-bottom: 8px; }
              .amount-value { font-size: 32px; font-weight: 700; }
              .status-badge {
                display: inline-block;
                padding: 6px 16px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
              }
              .status-paid { background: #dcfce7; color: #15803d; }
              .status-pending { background: #fef3c7; color: #92400e; }
              .status-overdue { background: #fee2e2; color: #991b1b; }
              .details-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-bottom: 20px;
              }
              .detail-item {
                padding: 12px;
                background: #f9fafb;
                border-radius: 6px;
                border-left: 3px solid #10b981;
              }
              .detail-label {
                font-size: 11px;
                color: #6b7280;
                text-transform: uppercase;
                margin-bottom: 4px;
              }
              .detail-value { font-size: 13px; color: #1f2937; font-weight: 600; }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                font-size: 11px;
                color: #9ca3af;
              }
            </style>
          </head>
          <body>
            <div class="receipt">
              ${htmlContent}
            </div>
          </body>
        </html>
      `;

      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${payment.id}-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-emerald-200 p-6">
          <div>
            <h2 className="text-2xl font-bold text-emerald-900">Payment Receipt</h2>
            <p className="text-sm text-emerald-700 mt-1">Receipt #${payment.id}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/50 transition-colors"
          >
            <X className="h-5 w-5 text-emerald-600" />
          </button>
        </div>

        <div className="p-8">
          <div ref={receiptRef} className="space-y-6">
            <div className="text-center pb-6 border-b-2 border-emerald-200">
              <h1 className="text-3xl font-bold text-slate-900">Graveyard Management System</h1>
              <p className="text-emerald-600 font-semibold mt-2">OFFICIAL PAYMENT RECEIPT</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600 mb-3">Customer Information</h3>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Name:</span>
                <span className="font-semibold text-slate-900">{payment.customerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Service Type:</span>
                <span className="font-semibold text-slate-900">{getServiceTypeName(payment.serviceType)}</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-8 text-white text-center shadow-lg">
              <p className="text-emerald-100 text-sm font-medium mb-2">Total Amount</p>
              <p className="text-4xl font-bold">{formatCurrency(payment.amount)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-xs font-bold uppercase text-slate-600 mb-1">Payment Date</p>
                <p className="text-sm font-semibold text-slate-900">{formatDate(payment.date)}</p>
              </div>
              {payment.dueDate && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-xs font-bold uppercase text-slate-600 mb-1">Due Date</p>
                  <p className="text-sm font-semibold text-slate-900">{formatDate(payment.dueDate)}</p>
                </div>
              )}
              {payment.plotInfo && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-xs font-bold uppercase text-slate-600 mb-1">Plot</p>
                  <p className="text-sm font-semibold text-slate-900">{payment.plotInfo}</p>
                </div>
              )}
              {payment.graveInfo && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-xs font-bold uppercase text-slate-600 mb-1">Grave</p>
                  <p className="text-sm font-semibold text-slate-900">{payment.graveInfo}</p>
                </div>
              )}
            </div>

            <div className={`rounded-lg p-4 border ${getStatusBorder(payment.status)} ${getStatusBg(payment.status)}`}>
              <div className="flex items-center gap-3">
                {getStatusIcon(payment.status)}
                <div>
                  <p className="text-xs font-bold uppercase text-slate-600">Payment Status</p>
                  <p className="font-bold capitalize text-slate-900 mt-1">{payment.status}</p>
                </div>
              </div>
            </div>

            {payment.description && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-xs font-bold uppercase text-blue-900 mb-2">Description</p>
                <p className="text-sm text-blue-900 leading-relaxed">{payment.description}</p>
              </div>
            )}

            <div className="text-center text-xs text-slate-500 space-y-1 pt-4 border-t border-slate-200">
              <p>This is an official receipt from Graveyard Management System</p>
              <p>Generated on {new Date().toLocaleString()}</p>
              <p className="mt-3 text-blue-600 font-medium">Please retain this receipt for your records</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-slate-200">
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2 hover:bg-blue-50"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              onClick={handlePrint}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center gap-2 hover:from-emerald-600 hover:to-emerald-700"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
