import React, { useState } from 'react'
import Flatlist from '../../components/flatlist/Flatlist'
import styles from './home.module.css'

interface TypeTask {
  title?: string
  difficulty?: number
}

interface INewTask {
  [key: string]: string | number | undefined
}

const initialValue = { title: '', difficulty: '' }

const Home = () => {
  const [tasks, setTasks] = useState<TypeTask[]>([])
  const [newTask, setNewTask] = useState<INewTask>(initialValue)
  const [modal, setModal] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    const name = event.target.name
    setNewTask({ ...newTask, [name]: value })
  }

  const registerTask = (): void => {
    setTasks([...tasks, newTask])
    setNewTask(initialValue)
  }

  const updateTask = (i: number): void => {
    setNewTask(initialValue)
    const filterTask = tasks.filter((_task, index: number): boolean => index == i)
    const editTask = filterTask[0]
    setNewTask({ title: editTask.title, difficulty: editTask.difficulty })
    setEditIndex(i)
    setModal(true)
  }

  const removeTask = (i: number): void => {
    setTasks(tasks.filter((_task, index: number): boolean => index !== i))
  }

  const editTask = (): void => {
    tasks[editIndex] = newTask
    setNewTask(initialValue)
    setModal(false)
  }

  const hiddenModal = (): void => {
    setModal(false)
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.form}>
        <div className={styles.textContainer}>
          <span className={styles.textTitle}>O que você vai fazer?</span>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Titulo:</label>
          <input
            name="title"
            className={styles.input}
            type="text"
            placeholder="Titulo da tarefa"
            onChange={handleChange}
            value={newTask.title}
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Dificuldade:</label>
          <input
            name="difficulty"
            className={styles.input}
            type="number"
            placeholder="0"
            onChange={handleChange}
            value={newTask.difficulty}
          />
        </div>

        <div className={styles.btnContainer}>
          <button id="btnRegister" className={styles.btn} onClick={registerTask}>
            Cadastrar
          </button>
        </div>

        <span className={styles.textTitle}>Suas tarefas:</span>
        <div className={styles.containerInfo}>
          {tasks.length > 0 ? (
            <Flatlist tasks={tasks} updateTask={updateTask} removeTask={removeTask} />
          ) : (
            <span className={styles.textWarning}>Nenhuma tarefa cadastrada!</span>
          )}
        </div>
        {modal && (
          <div id="containerModal" className={styles.containerModal}>
            <div className={styles.modal}>
              <span className={styles.titleEdit}>Editar tarefa</span>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Titulo:</label>
                <input
                  name="title"
                  className={styles.input}
                  type="text"
                  placeholder="Titulo da tarefa"
                  onChange={handleChange}
                  value={newTask.title}
                />
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.label}>Dificuldade:</label>
                <input
                  name="difficulty"
                  className={styles.input}
                  type="number"
                  placeholder="0"
                  onChange={handleChange}
                  value={newTask.difficulty}
                />
              </div>

              <div className={styles.btnContainer}>
                <button id="btnRegister" className={styles.btn} onClick={editTask}>
                  Editar tarefa
                </button>
              </div>

              <div className={styles.btnContainer}>
                <button onClick={hiddenModal} className={styles.btnExit}>
                  <i className="fa-regular fa-circle-xmark"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
