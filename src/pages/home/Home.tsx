import React, { useState } from 'react'
import Flatlist from '../../components/flatlist/Flatlist'
import styles from './home.module.css'

interface TypeTask {
  title?: string
  difficulty?: number
}

interface INewTask {
  [key: string]: string
}

const Home = () => {
  const [tasks, setTasks] = useState<TypeTask[]>([])
  const [newTask, setNewTask] = useState<INewTask>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    const name = event.target.name
    setNewTask({ ...newTask, [name]: value })
  }

  const registerTask = (): void => {
    setTasks([...tasks, newTask])
    setNewTask({ title: '', difficulty: '' })
  }

  const updateTask = (i: number): void => {
    console.log(i)
  }

  const removeTask = (i: number): void => {
    setTasks(
      tasks.filter((_task, index: number): boolean => {
        return index !== i
      }),
    )
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.textContainer}>
        <span className={styles.textTitle}>O que você vai fazer?</span>
      </div>
      <div className={styles.form}>
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
      </div>
    </div>
  )
}

export default Home
