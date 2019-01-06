export default function(original, min, max) {
  let num = original;
  let breaker = 0;
  while (num === original){
    if (breaker++ > 100) break;
    num = Math.floor(Math.random() * (max - min) + min);
  }
  return num;
}
