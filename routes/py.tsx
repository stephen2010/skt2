import { defineRoute, Handlers } from "$fresh/server.ts";
//import { STATUS_CODE } from "$std/http/status.ts";

//import { Item, createItem, getItem, delItem } from "../utils/db.ts";
interface Item {
  title: string;
  url: string;
}


const kv = await Deno.openKv();

const SUBMIT_STYLES =
  "w-full text-white text-center rounded-[7px] transition duration-300 px-4 py-2 block hover:bg-white hover:text-black hover:dark:bg-gray-900 hover:dark:!text-white";

var title = "";
var url = "";

export const handler: Handlers<Item | null> = {
  async POST(req, _ctx) {
    const form = await req.formData();
    title = form.get("title");
    url = form.get("url");

    const item1 = {
      "title": title,
      "url": url,
    } as Item;
//    await createItem(item1);
    const itemsKey = ["items", item.title];
    const ok = await kv.atomic().set(itemsKey, item1).commit();
    if (!ok) throw new Error("Something went wrong.");
/*
    return new Response(null, {
      headers: {
        location: "/py",
      },
      status: STATUS_CODE.SeeOther,
    });
*/
//    return new Response(JSON.stringify({title, url}));
//    return Response.json({title, url});
    return Response.json(item1);
  },
};

export default defineRoute(async (_req, _ctx) => {
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
                {title}
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
                {url}
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
