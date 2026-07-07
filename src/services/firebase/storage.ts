import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

// Upload profile photo
export const uploadProfilePhoto = async (userId: string, file: File): Promise<string> => {
  try {
    const photoRef = ref(storage, `profiles/${userId}/${file.name}`);
    const snapshot = await uploadBytes(photoRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.warn("Storage upload failed, using Data URL fallback", error);
    // Fallback: read file as Base64/DataURL so it still works in offline/local environments!
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });
  }
};
