/**
 * 个人中心
 * @param params
 * @returns
 */
export default function Page({ params }: { params: { username: string } }) {
  return <div>Customer {params.username}</div>;
}
