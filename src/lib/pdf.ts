import html2canvas from 'html2canvas';

export async function exportCertificateAsImage(
  elementId: string,
  fileName: string = 'Cockroach-Lifetime-Certificate.png'
) {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    throw new Error('Certificate DOM element not found.');
  }

  const canvas = await html2canvas(targetElement, {
    scale: 3, // High DPI export
    useCORS: true,
    backgroundColor: '#FAF8F5',
    logging: false,
  });

  const image = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = image;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printCertificate(elementId: string) {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Cockroach Membership Certificate</title>
        <style>
          body { margin: 0; padding: 20px; font-family: sans-serif; background: #fff; }
          .print-container { width: 100%; max-width: 1000px; margin: 0 auto; }
        </style>
      </head>
      <body>
        <div class="print-container">
          ${targetElement.outerHTML}
        </div>
        <script>
          setTimeout(() => {
            window.print();
            window.close();
          }, 500);
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
