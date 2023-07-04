import { userInputs } from "@/constants/inputs";
import { UserInputKey } from "@/types/inputs";

export function isCorrectInput(key: string): key is UserInputKey {
  return userInputs.includes(key as UserInputKey);
}
