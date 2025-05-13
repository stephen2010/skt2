const kv = await Deno.openKv();

const prefs = {
  username: "ada",
  theme: "dark",
  language: "en-US",
};

const result = await kv.set(["preferences", "ada"], prefs);
