export async function loadData<TArgs, TResult>(
  args: TArgs,
  getDataFromServer: (args: TArgs) => Promise<TResult>,
  getDataFromCache: (args: TArgs) => Promise<TResult>,
  storeDataInCache: (result: TResult) => Promise<any>
): Promise<TResult> {
  if (window.navigator.onLine) {
    const res = await getDataFromServer(args);
    console.debug("Server response", res);

    await storeDataInCache(res);

    return res;
  }

  const res = await getDataFromCache(args);
  console.debug("Cache data", res);

  return res;
}
