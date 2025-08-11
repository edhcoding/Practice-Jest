// 3일 뒤를 반환하는 함수
export function after3days() {
  const date = new Date();
  date.setDate(date.getDate() + 3);

  return date;
}
