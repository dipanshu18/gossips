import bcrypt from "bcrypt";

export async function hashValue(value: string) {
  const result = await bcrypt.hash(value, 10);
  return result;
}

export async function compareValue(value: string, encryptedValue: string) {
  const result = await bcrypt.compare(value, encryptedValue);
  return result;
}
