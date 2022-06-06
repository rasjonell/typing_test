import StringSimilarity from "string-similarity";

import type { WPMResults } from "../types/global";

export function getResults(
  originalText: string,
  userInput: string
): WPMResults {
  const subParagraph = originalText.substring(0, userInput.length);
  const accuracy = StringSimilarity.compareTwoStrings(subParagraph, userInput);

  const wordsCount = userInput.split(" ").length;
  const dirtyWPM = userInput.split(" ").join("").length / 5;
  const averageWPM = Math.round((wordsCount + dirtyWPM) / 2);

  const accurateWPM = Math.round(accuracy * averageWPM);

  return {
    WPM: averageWPM,
    AWPM: accurateWPM,
    accuracy: Math.round(accuracy * 100),
  };
}
