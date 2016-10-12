module.exports = function (got) {
  const json = got.in.data.map(d => JSON.parse(d.value));

  const total = json.reduce((p, d) => p + d.count, 0);

  const query = got.query;
  const threadId = query[0];
  let newestCount = json
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .shift().count;

  return [
    {
      name: 'count',
      key: 'word_count',
      value: total
    },
    {
      name: 'threads',
      key: threadId,
      value: {
        list: newestCount
      }
    }
  ]
}
