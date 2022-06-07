import type { Data, DataSetItem } from "./chart";

const WPM: DataSetItem[] = [{ x: "World Average", y: 55 }];
const AWPM: DataSetItem[] = [{ x: "World Average", y: 50 }];

function getStorageItems(): Data {
  let storedWPM = WPM;
  let storedAWPM = AWPM;

  const currentWPM = JSON.parse(localStorage.getItem("WPM"));
  if (!currentWPM) localStorage.setItem("WPM", JSON.stringify(WPM));
  else storedWPM = currentWPM;

  const currentAWPM = JSON.parse(localStorage.getItem("AWPM"));
  if (!currentAWPM) localStorage.setItem("AWPM", JSON.stringify(AWPM));
  else storedAWPM = currentAWPM;

  return { WPM: storedWPM, AWPM: storedAWPM };
}

export function appendResults(newWPM: number, newAWPM: number): Data {
  const currentDate = new Date().toLocaleString();

  const withDateWPM: DataSetItem = { x: currentDate, y: newWPM };
  const withDateAWPM: DataSetItem = { x: currentDate, y: newAWPM };

  const currentData = getStorageItems();
  const updatedWPM = [...currentData.WPM, withDateWPM];
  const updatedAWPM = [...currentData.AWPM, withDateAWPM];

  localStorage.setItem("WPM", JSON.stringify(updatedWPM));
  localStorage.setItem("AWPM", JSON.stringify(updatedAWPM));

  return { WPM: updatedWPM, AWPM: updatedAWPM };
}
