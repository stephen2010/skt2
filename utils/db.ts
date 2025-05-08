/// <reference lib="deno.unstable" />

const kv = await Deno.openKv();

export interface Item {
  title: string;
  url: string;
}

export async function createItem(item: Item) {
  const itemsKey = ["items"];

  const res = await kv.atomic()
    .set(itemsKey, item)
    .commit();

  if (!res.ok) throw new Error("Failed to create item");
}

export async function getItem() {
  const res = await kv.get<Item>(["items"]);
  return res.value;
}
