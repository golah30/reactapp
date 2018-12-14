export const buildQueryFromLPRMatrix = (head, LPR) => {
  let q = head;

  q = `${q}/calcahpLprI.htm?step=0&col=${LPR[0].length}&row=${LPR[0].length}`;
  for (let i = 0; i < LPR[0].length; ++i) {
    for (let j = 0; j < LPR[i].length; ++j) {
      q = `${q}&cel-0-${i + 1}-${j + 1}=${LPR[i][j].value}`;
    }
  }

  return q;
};

export const buildAHPResultQuery = (head, data) => {
  const { alternatives, criterias, LPRs } = data;
  let q = head;

  q = `${q}/AHP_Result.htm?cr=${criterias.length}&alt=${alternatives.length}`;
  for (let i = 0; i < criterias.length; ++i) {
    q = `${q}&celLpr-0-${i + 1}=${LPRs[0].lpr[i]}`;
  }
  for (let i = 1; i < LPRs.length; ++i) {
    for (let j = 0; j < alternatives.length; ++j) {
      q = `${q}&celLpr-${i}-${j + 1}=${LPRs[i].lpr[j]}`;
    }
  }

  return q;
};
