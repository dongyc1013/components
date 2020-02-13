export default function genNestedData(data, id = null) { // 转换树状
  return data.filter(item => item.parentId === id).map(item => Object.assign({}, item, {
    children: genNestedData(data, item.id)
  }))
}