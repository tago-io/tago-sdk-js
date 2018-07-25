
/**
 * Group data by series or time
 * @param  {Array} variables
 * @param  {String} groupBy: time or serie
 * @param  {boolean} valueOnly: defines if the object is variable value only or the full object
 * @return {Array} returns the array grouped by time or series
 */
function groupData(variables, groupBy = 'serie', valueOnly = false) {
  if (valueOnly) {
    return Object.values(variables.reduce((pre, cur) => {
      (pre[cur[groupBy]] = {
        ...pre[cur[groupBy]],
        ...{
          ...{
            [cur.variable]: cur.value,
            origin: cur.origin,
            ...(cur[groupBy] ? { [groupBy]: cur[groupBy] } : {}),
          },
        },
      });
      return pre;
    }, {}));
  }

  return Object.values(variables.reduce((pre, cur) => {
    (pre[cur[groupBy]] = {
      ...pre[cur[groupBy]],
      ...{
        ...{
          [cur.variable]: {
            ...{ value: cur.value, id: cur.id, time: cur.time },
            ...(cur.metadata ? { metadata: cur.metadata } : {}),
            ...(cur.location ? { location: cur.location } : {}),
          },
          origin: cur.origin,
          ...(cur.serie ? { serie: cur.serie } : {}),
        },
      },
    });
    return pre;
  }, {}));
}

module.exports = groupData;
