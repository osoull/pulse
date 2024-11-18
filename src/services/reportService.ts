import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

interface ReportOptions {
  title: string;
  subtitle?: string;
  orientation?: 'portrait' | 'landscape';
}

export class ReportGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin = 40;
  private primaryColor = [26, 27, 93]; // #1A1B5D
  private goldColor = [197, 165, 114]; // #C5A572
  private fallbackLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDItMTVUMTA6MDA6MDBaIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAyLTE1VDEwOjAwOjAwWiIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDItMTVUMTA6MDA6MDBaIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ5YzFiMjQwLTRkMjQtNDQ0Zi1hMzU2LTNkYjM5ZjM0YzM0NiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjIzMGU5MTZiLTQ5ZDgtNDM0MS05YjQ5LTYzNmU2ZjM0YzM0NiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQ5YzFiMjQwLTRkMjQtNDQ0Zi1hMzU2LTNkYjM5ZjM0YzM0NiIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ5YzFiMjQwLTRkMjQtNDQ0Zi1hMzU2LTNkYjM5ZjM0YzM0NiIgc3RFdnQ6d2hlbj0iMjAyNC0wMi0xNVQxMDowMDowMFoiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
  private logoWidth = 100;
  private logoHeight = 25;
  private headerHeight = 120;

  constructor(options: ReportOptions) {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });
    this.pageWidth = this.doc.internal.pageSize.width;
    this.pageHeight = this.doc.internal.pageSize.height;
    this.addHeader(options.title, options.subtitle);
  }

  private async loadLogo(): Promise<HTMLImageElement> {
    const logoUrls = [
      'https://www.osoul.partners/wp-content/uploads/2024/04/basic-file-2.png',
      '/logo.png',
      this.fallbackLogo
    ];

    for (const url of logoUrls) {
      try {
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.crossOrigin = 'anonymous';
          img.src = url;
        });
        return img;
      } catch (error) {
        console.warn(`Failed to load logo from ${url}, trying next...`);
        continue;
      }
    }

    throw new Error('Failed to load any logo');
  }

  private async addHeader(title: string, subtitle?: string) {
    // Header background
    this.doc.setFillColor(...this.primaryColor);
    this.doc.rect(0, 0, this.pageWidth, this.headerHeight, 'F');

    // Add logo
    try {
      const logoImg = await this.loadLogo();
      const logoX = this.pageWidth - this.margin - this.logoWidth;
      const logoY = (this.headerHeight - this.logoHeight) / 2;
      this.doc.addImage(
        logoImg,
        'PNG',
        logoX,
        logoY,
        this.logoWidth,
        this.logoHeight
      );
    } catch (error) {
      console.warn('Failed to add logo to PDF, using text fallback');
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFontSize(24);
      this.doc.text('PULSE', this.pageWidth - this.margin - 80, this.headerHeight / 2);
    }

    // Report title
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.margin, this.headerHeight / 2, { align: 'left' });

    if (subtitle) {
      this.doc.setFontSize(16);
      this.doc.setTextColor(...this.goldColor);
      this.doc.text(subtitle, this.margin, (this.headerHeight / 2) + 25, { align: 'left' });
    }

    // Generation date
    this.doc.setFontSize(10);
    this.doc.setTextColor(200, 200, 200);
    this.doc.text(
      `Generated on ${format(new Date(), 'MMMM d, yyyy')}`,
      this.margin,
      this.headerHeight - 15
    );

    // Reset cursor position for content
    this.doc.setTextColor(0, 0, 0);
    this.currentY = this.headerHeight + 40;
  }

  private currentY = 160;

  addTable(headers: string[], data: any[][], options: {
    title?: string;
    headerColor?: number[];
  } = {}) {
    if (options.title) {
      this.doc.setFillColor(...this.primaryColor);
      this.doc.roundedRect(this.margin, this.currentY, this.pageWidth - (this.margin * 2), 40, 3, 3, 'F');
      
      this.doc.setFontSize(16);
      this.doc.setTextColor(255, 255, 255);
      this.doc.text(options.title, this.pageWidth / 2, this.currentY + 25, { align: 'center' });
      this.currentY += 60;
    }

    autoTable(this.doc, {
      startY: this.currentY,
      head: [headers],
      body: data,
      theme: 'striped',
      headStyles: {
        fillColor: options.headerColor || this.primaryColor,
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold',
        cellPadding: 8
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        fontSize: 11,
        cellPadding: 6
      },
      margin: { left: this.margin, right: this.margin }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 40;
  }

  addSection(title: string, content: string) {
    this.doc.setFillColor(...this.primaryColor);
    this.doc.roundedRect(this.margin, this.currentY, this.pageWidth - (this.margin * 2), 40, 3, 3, 'F');
    
    this.doc.setFontSize(16);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(title, this.pageWidth / 2, this.currentY + 25, { align: 'center' });
    this.currentY += 60;

    this.doc.setDrawColor(...this.primaryColor);
    this.doc.setLineWidth(0.5);
    this.doc.roundedRect(this.margin, this.currentY, this.pageWidth - (this.margin * 2), 100, 3, 3, 'S');

    this.doc.setFontSize(12);
    this.doc.setTextColor(60, 60, 60);
    this.doc.text(content, this.margin + 10, this.currentY + 20, {
      maxWidth: this.pageWidth - (this.margin * 2) - 20
    });
    this.currentY += 120;
  }

  addPageBreak() {
    this.doc.addPage();
    this.currentY = this.headerHeight + 40;
  }

  addFooter() {
    const pageCount = this.doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      
      // Footer line
      this.doc.setDrawColor(...this.goldColor);
      this.doc.setLineWidth(1);
      this.doc.line(
        this.margin, 
        this.pageHeight - 50, 
        this.pageWidth - this.margin, 
        this.pageHeight - 50
      );

      // Page numbers
      this.doc.setFontSize(10);
      this.doc.setTextColor(100, 100, 100);
      this.doc.text(
        `Page ${i} of ${pageCount}`,
        this.pageWidth / 2,
        this.pageHeight - 30,
        { align: 'center' }
      );

      // Copyright text
      this.doc.setFontSize(8);
      this.doc.text(
        '© Osoul Capital Partners. All rights reserved.',
        this.margin,
        this.pageHeight - 20
      );
    }
  }

  save(filename: string) {
    this.addFooter();
    this.doc.save(`${filename}-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  }
}