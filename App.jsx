import { useState } from 'react'
import Modal from './Modal'
import TreeListItem from './TreeListItem'
import styles from './styles.less'
import genNestedData from './genNestedData'
let treeId = 0
function App() {
  const [treeData, setTreeData] = useState([{
    id: treeId,
    parentId: null,
    title: '一级',
    children: [],
    index: 0
  }])
  const [currentId, setCurrentId] = useState(treeData[0].id) // 要添加子级的菜单Id
  const [visible, setVisible] = useState(false) // modal框可见
  function isExceed(id) { // 是否超出3个
    return treeData.filter(item => item.parentId === id).length > 2
  }
  return (
    <div className={styles.container}>
      {genNestedData(treeData).map(item => {
        return (
          <TreeListItem
            treeData={treeData}
            treeItem={item}
            setCurrentId={setCurrentId}
            setVisible={setVisible}
            setTreeData={setTreeData}
          />
        )
      })}
      <Modal
        visible={visible}
        setVisible={setVisible}
        onOK={value => {
          if (!isExceed(currentId)) {
            let childrenLen = treeData.filter(item => item.parentId === currentId).length - 1
            setTreeData(
              treeData.concat({
                id: ++treeId,
                parentId: currentId,
                children: [],
                title: value,
                index: ++childrenLen
              })
            )
          }
        }}
      />
    </div>
  )
}
export default App