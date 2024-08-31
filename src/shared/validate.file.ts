import ApiError from "../errors/api.error";
import { File } from "../interfaces/files.type";

export default function validateFile(
  file: File | undefined,
  errorMessage: string
): void {
  if (!file) {
    throw new ApiError(400, errorMessage);
  }
}
