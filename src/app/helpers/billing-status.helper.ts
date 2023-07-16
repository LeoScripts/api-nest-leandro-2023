export function billingStatus(history: any, status: string) {
  const e = status;
  return history
    .filter(({ status }) => status === e)
    .reduce((total: any, current: any) => (total += current.value), 0);
}
