export const kv = await Deno.openKv();

export interface Item {
  title: string;
  url: string;
}

export async function createItem(item: Item) {
  const itemsKey = ["items", item.title];

  const res = await kv.atomic()
    .check({ key: itemsKey, versionstamp: null })
    .set(itemsKey, item)
    .commit();

  if (!res.ok) throw new Error("Failed to create item");
}

export async function getItem(title: string) {
  const res = await kv.get<Item>(["items", title]);
  return res.value;
}

export async function delItem(title: string) {
  await kv.delete(["items", title]);
}
