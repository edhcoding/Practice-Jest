export function timer(callback) {
  setTimeout(() => {
    callback("success");
  }, 3000);
}

export function timer2(callback) {
  setTimeout(() => {
    callback("success");
  }, 10_000);
}
