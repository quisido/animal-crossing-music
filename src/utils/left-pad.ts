export default function leftPad(n: number): string {
  return n.toString().padStart(2, '0');
}
