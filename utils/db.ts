const kv = await Deno.openKv();

export interface Item {
  title: string;
  url: string;
}

export async function createItem(title: String, url: String) {
  const itemsKey = ["items", "test1"];

  const res = await kv.atomic()
    .set(itemsKey, {
      title,
      url,
    })
    .commit();

  if (!res.ok) throw new Error("Failed to create item");
}

export async function getItem() {
  const res = await kv.get<Item>(["items", "test1"]);
  return res.value;
}
