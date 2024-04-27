import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge";
import crypto from "crypto"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// DEBOUNCE
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};


// Generate a unique hash for our object stored key on S3 bucket
export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};


export const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")


