export function billingStatus(item: any, status: string) {
  const e = status;
  return item
    .filter(({ status }) => status === e)
    .reduce((total: any, current: any) => (total += current.value), 0);
}
