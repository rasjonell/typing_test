<script lang="ts">
  import { afterUpdate } from "svelte";

  import { activeKey } from "../stores/keyboard";
  import KeyboardData, { keyToId } from "../data/keyborad";

  import type { KeyboardRowItem } from "../types/global";

  afterUpdate(() => {
    if ($activeKey === null) return;

    const keyElement = getElement($activeKey);
    if (!keyElement) return;

    keyElement.className = `key__active ${keyElement.className}`;

    setTimeout(() => {
      const newClassName = keyElement.className.includes("key__active")
        ? keyElement.className.replace(/key__active /g, "")
        : keyElement.className;

      keyElement.className = newClassName;
    }, 100);
  });

  function getId(item: KeyboardRowItem): string {
    if (item.customId) return item.customId;
    if (typeof item.content === "string") return item.content;
    if (typeof Array.isArray(item.content) && item.content.length === 2)
      return item.content.join(",");

    return `${item.type}-${item.content.name}`;
  }

  function getElement(key: string): HTMLElement {
    const documentExists = document.getElementById(key.toUpperCase());
    if (documentExists) return documentExists;

    return document.getElementById(keyToId[key]);
  }
</script>

<div class="keyboard" tabindex="-1">
  {#each KeyboardData as rows}
    <div class="row">
      {#each rows as row}
        {#if row.type === "symbols"}
          <div
            id={getId(row)}
            class={`key key__symbols ${row.extraClass ? row.extraClass : ""}`}
          >
            {row.content[0]} <span> {row.content[1]} </span>
          </div>
        {:else}
          <div
            id={getId(row)}
            class={`key ${row.type === "key" ? "" : `key__${row.type}`}`}
          >
            {#if typeof row.content === "string"}
              {row.content}
            {:else}
              <svelte:component this={row.content} />
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style>
  :root {
    --green: #a2ccb6;
    --yellow: #fceeb5;
    --peach: #ee786e;
    --off-white: #fffff4;
  }

  span {
    display: block;
    margin-top: -5px;
  }

  .keyboard {
    width: 780px;
    height: 262px;
    margin-bottom: 10%;
    border-radius: 10px;
    background: #000000;
    border: 3px solid #000000;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .row {
    margin-top: 2px;
    overflow: hidden;
    display: flex;
  }

  .key {
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: var(--off-white);
    color: #000000;
    line-height: 48px;
    text-align: center;
    margin-left: 2px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 100ms linear;
    transition: color 100ms linear;
  }

  .key__active,
  .key:active {
    background-color: #d6584d;
    color: #fff;
  }

  .key__symbols {
    line-height: 28px;
    flex-direction: column;
    justify-content: space-between;
  }

  .key__delete {
    width: 100px;
  }

  .key__oneandhalf {
    width: 75px;
  }

  .key__esc {
    background: var(--peach);
  }

  .key__enter {
    width: 112px;
  }

  .key__caps {
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .key__shift-left {
    width: 100px;
  }

  .key__spacebar {
    width: 300px;
  }

  .key__bottom-funct {
    width: 70px;
  }

  .key__arrow {
    background: var(--green);
  }
</style>
