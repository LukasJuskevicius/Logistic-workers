// Simplified KV store operations
const kv = await Deno.openKv();

export async function get(key: string): Promise<string | null> {
  try {
    const result = await kv.get([key]);
    return result.value as string | null;
  } catch (error) {
    console.error(`KV get error for key ${key}:`, error);
    return null;
  }
}

export async function set(key: string, value: string): Promise<boolean> {
  try {
    await kv.set([key], value);
    return true;
  } catch (error) {
    console.error(`KV set error for key ${key}:`, error);
    return false;
  }
}

export async function del(key: string): Promise<boolean> {
  try {
    await kv.delete([key]);
    return true;
  } catch (error) {
    console.error(`KV delete error for key ${key}:`, error);
    return false;
  }
}

export async function list(prefix: string): Promise<Array<{ key: string; value: any }>> {
  try {
    const results = [];
    const iter = kv.list({ prefix: [prefix] });
    for await (const entry of iter) {
      results.push({
        key: entry.key[0] as string,
        value: JSON.parse(entry.value as string)
      });
    }
    return results;
  } catch (error) {
    console.error(`KV list error for prefix ${prefix}:`, error);
    return [];
  }
}