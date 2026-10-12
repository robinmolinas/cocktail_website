// A QR code as one SVG path, for the printed keepsake: one unit per module,
// so the caller sets the size and the quiet zone in its own viewBox. The
// encoder loads only when a reading asks for it.

export async function qrPath(url: string): Promise<{ size: number; d: string }> {
  const { default: qrcode } = await import('qrcode-generator');
  const qr = qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  const size = qr.getModuleCount();
  let d = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    }
  }
  return { size, d };
}
