/// <reference lib="deno.unstable" />

const kv = await Deno.openKv();
//const kv = await Deno.openKv("https://api.deno.com/databases/8fe05f0b-e7af-4619-bcf5-05f599a4bd13/connect");

export interface Item {
  title: string;
  url: string;
}

export async function createItem(item: Item) {
  const itemsKey = ["items","test1"];

  const res = await kv.atomic()
    .set(itemsKey, item)
    .commit();

  if (!res.ok) throw new Error("Failed to create item");
}

export async function getItem() {
  const res = await kv.get<Item>(["items","test1"]);
  return res.value;
}
