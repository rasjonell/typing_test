/// <reference types="svelte" />

import type { SvelteComponentTyped } from "svelte";

interface KeyboardRowItem {
  type: string;
  content: any;
  customId?: string;
  extraClass?: string;
}

type KeyboardRow = Array<KeyboardRowItem>;
type KeyboardData = Array<KeyboardRow>;
