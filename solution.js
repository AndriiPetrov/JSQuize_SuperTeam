function myPerfectTeam(n, candidates) {
  if([...new Set(candidates.flat())].length !== n) return -1;

  // transform to array to object for the counting purposes;
  const obj = candidates.reduce((acc, curElem)=> {
    curElem.forEach(el => acc[el] ? acc[el] += 1 : acc[el] = 1);
    return acc;
  }, {});

  // sort array by the length and unique;
  candidates.sort((a, b) => {
    if( a.length === b.length) {
        return b.reduce((acc, curElem) => acc + obj[curElem], 0) - a.reduce((acc, curElem) => acc + obj[curElem], 0)
    }

    if(a.filter(el => obj[el] === 1).length > 0) {
        return 1;
    } else if (b.filter(el => obj[el] === 1).length > 0) {
        return -1;
    }

    return a.length - b.length;
  });


  // solution (1 + 1) and (1 + 2) candidates;
  for (let i = candidates.length - 1; i >= 0; i--) {
    if( candidates[i].length === n ) {
        return 2;
    }

    for (let j = candidates.length - 1; j >= 0; j--) {
      if (candidates[i] == candidates[j]) continue;

      if ([...new Set([...candidates[i], ...candidates[j]])].length == n) {
          return 3;
      }
    }
  }
    
  // Solution for (1 + 3) and more candidates;
  const arrUnique = [];
  return candidates.reduce((acc, cE) => {
    let unique = 0
    cE.forEach(el => obj[el] === 1 && ![...new Set(arrUnique.flat())].includes(el) ? unique += 1 : obj[el] -= 1);

    if (unique > 0) { arrUnique.push(cE) };

    return unique > 0 ? acc + 1 : acc;    
  }, 1);
}