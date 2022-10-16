export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function randomDistribution(array, exclude = [], size = 100) {
  const distribution = [];
  let sum = 0;
  if (exclude && exclude.length) {
    for (const item of exclude) {
      delete array[item];
    }
  }
  for (const [_, v] of Object.entries(array)) {
    sum += Number(v);
  }
  const quant = size / sum;

  for (const i of Object.keys(array)) {
    const limit = quant * array[i];
    for (let j = 0; j < limit; ++j) {
      distribution.push(i);
    }
  }

  const index = Math.floor(distribution.length * Math.random());
  return distribution[index];
}
