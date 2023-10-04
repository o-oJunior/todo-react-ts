import styles from './flatlis.module.css'

type ObjectTask = {
  title?: string
  difficulty?: number
}

type Props = {
  tasks: ObjectTask[]
  updateTask: (i: number) => void
  removeTask: (i: number) => void
}

const Flatlist = ({ tasks, updateTask, removeTask }: Props) => {
  return (
    <div>
      {tasks.map((task, i) => {
        return (
          <ul className={styles.listContainer} key={i}>
            <div>
              <li className={styles.itemList}>
                <span className={styles.titleItem}> {task.title} </span>
              </li>
              <li className={styles.itemList}>Dificuldade: {task.difficulty}</li>
            </div>
            <div className={styles.btnFlatlistContainer}>
              <button className={styles.btnFlatlist} onClick={() => updateTask(i)}>
                <i className={`fa-solid fa-pen ${styles.icon}`}></i>
              </button>
              <button id="btnRemoveTask" className={styles.btnFlatlist} onClick={() => removeTask(i)}>
                <i className={`fa-regular fa-trash-can ${styles.icon}`}></i>
              </button>
            </div>
          </ul>
        )
      })}
    </div>
  )
}

export default Flatlist
