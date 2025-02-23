export default async function Page(searchParams) {
  const query = await searchParams;
  const state = query.code;
  const code = query.code;

  console.log({ state, code });
}
