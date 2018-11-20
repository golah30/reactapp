export const buildQueryFromLPRMatrix = (head, LPR) => {
  let q = head;

  q = `${q}/calcahpLprI.htm?step=0&col=${LPR.length}&row=${LPR.length}`;
  for (let i = 0; i < LPR.length; ++i) {
    for (let j = 0; j < LPR[i].length; ++j) {
      q = `${q}&cel-0-${i + 1}-${j + 1}=${LPR[i][j].value}`;
    }
  }

  return q;
};
