const obj = {
  // Sum an array
  sum: arr => arr.reduce((acc, cur) => acc + cur, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    arr.forEach(element => {
      sets.forEach((set, j) => {
        const candidateSet = sets[j].concat(element);
        const candidateSum = obj.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      });
    });

    return sums[obj.random(0, sums.length - 1)];
  }
};

module.exports = obj;
