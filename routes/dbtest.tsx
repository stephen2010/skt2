const kv = await Deno.openKv();

interface Item {
  title: string;
  url: string;
}
/*
async function createItem(item: Item) {
  const itemsKey = ["items"];

  const res = await kv.atomic()
    .set(itemsKey, item)
    .commit();

  if (!res.ok) throw new Error("Failed to create item");
}

async function getItem() {
  const res = await kv.get<Item>(["items"]);
  return res.value;
}
*/

import { defineRoute, Handlers } from "$fresh/server.ts";
import { STATUS_CODE } from "$std/http/status.ts";

const SUBMIT_STYLES =
  "w-full text-white text-center rounded-[7px] transition duration-300 px-4 py-2 block hover:bg-white hover:text-black hover:dark:bg-gray-900 hover:dark:!text-white";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const title = form.get("title");
    const url = form.get("url");
    console.log("title: ", title, ".    url: ", url);
/*
    const itemone: Item = {
      title,
      url,
    };
    await createItem(itemone);
*/
  const itemsKey = ["items"];
  await kv.atomic().set(itemsKey, {
      title,
      url,
    }).commit();
    
    return new Response(null, {
      headers: {
        location: "/py",
      },
      status: STATUS_CODE.SeeOther,
    });
  },
};

export default defineRoute(async (_req, ctx) => {
//  const item = await getItem();
  // console.log("item: ", item);
  return (
    <>
      <main class="flex-1 flex flex-col justify-center mx-auto w-full space-y-16 p-4 max-w-6xl">
        <div class="text-center">
          <h1 class="heading-styles">Share your project</h1>
          <p class="text-gray-500">
            Let the community know about your Deno-related blog post, video or
            module!
          </p>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:gap-16 md:items-center">
          <form class="flex-1 flex flex-col justify-center" method="post">
            <div>
              <label
                htmlFor="submit_title"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                {item?.title}
              </label>

              <input
                id="submit_title"
                class="input-styles w-full mt-2"
                type="text"
                name="title"
                required
                placeholder="Title"
              />
            </div>

            <div class="mt-4">
              <label
                htmlFor="submit_url"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                {item?.url}
              </label>
              <input
                id="submit_url"
                class="input-styles w-full mt-2"
                type="text"
                name="url"
                required
                placeholder="https://xxx.xxx.com"
              />
            </div>

            <div class="w-full rounded-lg bg-gradient-to-tr from-secondary to-primary p-px mt-8">
              {<button type="submit" class={SUBMIT_STYLES}>Submit</button>}
            </div>
          </form>
        </div>
      </main>
    </>
  );
});
