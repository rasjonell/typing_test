import {
  LogInIcon,
  DeleteIcon,
  Trash2Icon,
  CommandIcon,
  ArrowUpIcon,
  ActivityIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
  ChevronsUpIcon,
  ArrowRightIcon,
  ArrowUpCircleIcon,
  CornerDownLeftIcon,
} from "svelte-feather-icons";

import type { KeyboardData } from "../types/global";

const KeyboardMap: KeyboardData = [
  [
    { type: "esc", content: "Esc", customId: "esc" },
    { type: "symbols", content: ["!", "1"] },
    { type: "symbols", content: ["@", "2"] },
    { type: "symbols", content: ["#", "3"] },
    { type: "symbols", content: ["$", "4"] },
    { type: "symbols", content: ["%", "5"] },
    { type: "symbols", content: ["^", "6"] },
    { type: "symbols", content: ["&", "7"] },
    { type: "symbols", content: ["*", "8"] },
    { type: "symbols", content: ["(", "9"] },
    { type: "symbols", content: [")", "0"] },
    { type: "symbols", content: ["_", "-"] },
    { type: "symbols", content: ["+", "="] },
    { type: "symbols", content: ["_", "-"] },
    { type: "delete", content: DeleteIcon, customId: "backspace" },
  ],
  [
    { type: "oneandhalf", content: LogInIcon, customId: "tab" },
    { type: "key", content: "Q" },
    { type: "key", content: "W" },
    { type: "key", content: "E" },
    { type: "key", content: "R" },
    { type: "key", content: "T" },
    { type: "key", content: "Y" },
    { type: "key", content: "U" },
    { type: "key", content: "I" },
    { type: "key", content: "O" },
    { type: "key", content: "P" },
    { type: "symbols", content: ["{", "["] },
    { type: "symbols", content: ["}", "]"] },
    { type: "symbols", content: ["|", "\\"], extraClass: "key__oneandhalf" },
  ],
  [
    { type: "caps", content: ChevronsUpIcon, customId: "caps-lock" },
    { type: "key", content: "A" },
    { type: "key", content: "S" },
    { type: "key", content: "D" },
    { type: "key", content: "F" },
    { type: "key", content: "G" },
    { type: "key", content: "H" },
    { type: "key", content: "J" },
    { type: "key", content: "K" },
    { type: "key", content: "L" },
    { type: "symbols", content: [":", ";"] },
    { type: "symbols", content: ['"', "'"] },
    { type: "enter", content: CornerDownLeftIcon, customId: "enter" },
  ],
  [
    { type: "shift-left", content: ArrowUpCircleIcon, customId: "shift-left" },
    { type: "key", content: "Z" },
    { type: "key", content: "X" },
    { type: "key", content: "C" },
    { type: "key", content: "V" },
    { type: "key", content: "B" },
    { type: "key", content: "N" },
    { type: "key", content: "M" },
    { type: "symbols", content: ["<", ","] },
    { type: "symbols", content: [">", "."] },
    { type: "symbols", content: ["?", "/"] },
    { type: "shift-right", content: ArrowUpCircleIcon },
    { type: "arrow", content: ArrowUpIcon, customId: "arrow-up" },
    { type: "key", content: Trash2Icon },
  ],
  [
    { type: "bottom-funct", content: "^", customId: "control-left" },
    { type: "bottom-funct", content: ActivityIcon, customId: "options" },
    { type: "bottom-funct", content: CommandIcon, customId: "alt" },
    { type: "spacebar", content: "", customId: "spacebar" },
    { type: "key", content: CommandIcon },
    { type: "key", content: ActivityIcon },
    { type: "arrow", content: ArrowLeftIcon, customId: "arrow-left" },
    { type: "arrow", content: ArrowDownIcon, customId: "arrow-down" },
    { type: "arrow", content: ArrowRightIcon, customId: "arrow-right" },
  ],
];

function retrieveKeyToIdMap() {
  const initialMap = KeyboardMap.flat()
    .filter((item) => item.type === "symbols")
    .map((item) => ({
      [item.content[0]]: item.content.join(","),
      [item.content[1]]: item.content.join(","),
    }))
    .reduce((prev, curr, {}) => ({ ...prev, ...curr }));

  const customs = {
    Alt: "alt",
    Tab: "tab",
    OS: "options",
    Escape: "esc",
    Enter: "enter",
    " ": "spacebar",
    Shift: "shift-left",
    ArrowUp: "arrow-up",
    CapsLock: "caps-lock",
    Backspace: "backspace",
    Control: "control-left",
    ArrowLeft: "arrow-left",
    ArrowDown: "arrow-down",
    ArrowRight: "arrow-right",
  };

  return { ...initialMap, ...customs };
}

export const keyToId = retrieveKeyToIdMap();

export default KeyboardMap;
