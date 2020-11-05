const { url } = require('../configs');
const queryString = require('querystring');

module.exports = async (query, modelData, modelCount, path) => {
  const { page, limit } = query;

  const _page = page && parseInt(page) > 0 ? parseInt(page) : 1;
  const _limit = limit && parseInt(limit) > 0 ? parseInt(limit) : 5;
  let totalData = await modelCount(query);
  const totalPage = Math.ceil(totalData / _limit);

  const start = _page * _limit - _limit;

  const prevLink =
    _page > 1
      ? queryString.stringify({ ...query, ...{ page: _page - 1 } })
      : null;
  const nextLink =
    _page < totalPage
      ? queryString.stringify({ ...query, ...{ page: _page + 1 } })
      : null;

  const result = await modelData(query, start, _limit);

  return {
    result,
    msg: 'List all '.concat(path.replace('/', '')),
    pageInfo: {
      page: _page,
      totalPage,
      perPage: _limit,
      totalData,
      nextLink: nextLink && url + path + `?${nextLink}`,
      prevLink: prevLink && url + path + `?${prevLink}`,
    },
  };
};
