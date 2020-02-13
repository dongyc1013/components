import { useState } from 'react'
import styles from './styles.less'
function Modal({ onOK, visible, setVisible }) {
  const [value, setValue] = useState('')
  return (
    visible ? (
      <div className={styles.modal}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={() => {
          onOK(value)
          setVisible(false)
        }}>确认</button>
        <button onClick={() => setVisible(false)}>取消</button>
      </div>
    ) : null
  )
}
export default Modal