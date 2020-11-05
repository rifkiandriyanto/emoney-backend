const { url } = require('../configs');
const queryString = require('querystring');
const getSort = (sort) => (sort && sort !== '' ? sort : 'desc');

module.exports = async (
  data,
  query,
  modelData,
  modelCount,
  path,
  user_id = ''
) => {
  const { page, limit, sort } = query;

  const _page = page && parseInt(page) > 0 ? parseInt(page) : 1;
  const _limit = limit && parseInt(limit) > 0 ? parseInt(limit) : 5;
  const _sort = getSort(sort);

  let totalData = await modelCount(user_id);
  totalData = totalData[0].count;
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

  const result = await modelData(data, start, _limit, _sort);

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
