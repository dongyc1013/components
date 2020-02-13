import { useState } from 'react'
import styles from './styles.less'
function TreeListItem({
  treeData,
  treeItem,
  setCurrentId,
  setVisible,
  setTreeData,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove
}) {
  const [spread, setSpread] = useState(false)
  function handleMove(index, parentId, up) { // 改变index属性，排序确认位置, true上移，false下移
    const alternate = treeData.concat()
    const targetIndex = up ? index - 1 : index + 1
    alternate.map(item => {
      if (item.parentId === parentId) {
        if (item.index === index) {
          item.index = targetIndex
        } else if (item.index === targetIndex) {
          item.index = index
        }
      }
    })
    setTreeData(alternate)
  }
  function handleRemove(id) {
    setTreeData(treeData.filter(item => item.id !== id))
  }
  function calcDepth(treeItem) {
    let depth = 0
    let parent = treeData.find(item => item.id === treeItem.parentId)
    while (parent) {
      depth++
      parent = treeData.find(item => item.id === parent.parentId)
    }
    return depth
  }
  return (
    <div
      className={[styles.treeListItem, spread ? styles.spreadItem : ''].join(' ')}
      onClick={e => {
        e.stopPropagation()
        setSpread(!spread)
      }}
      style={{ left: 30 * calcDepth(treeItem) + 'px'}}
    >
      {treeItem.title}
      <button
        className={styles.addButton}
        onClick={() => {
          setVisible(true)
          setCurrentId(treeItem.id)
        }}
      >添加下一级</button>
      <button
        className={styles.addButton}
        onClick={onRemove}
      >删除</button>
      {!isFirst && isFirst !== undefined ? <button onClick={onMoveUp}>上移</button> : null}
      {!isLast && isLast !== undefined ? <button onClick={onMoveDown}>下移</button> : null}
      {spread ? (treeItem.children && treeItem.children.sort((a, b) => a.index - b.index).map((item, index) => {
        return (
          <TreeListItem
            treeData={treeData}
            isFirst={index === 0}
            isLast={index === treeItem.children.length - 1}
            treeItem={item}
            setCurrentId={setCurrentId}
            setVisible={setVisible}
            onMoveUp={() => handleMove(index, item.parentId, true)}
            onMoveDown={() => handleMove(index, item.parentId, false)}
            onRemove={() => handleRemove(item.id)}
          />
        )
      })) : null}
    </div>
  )
}
export default TreeListItem