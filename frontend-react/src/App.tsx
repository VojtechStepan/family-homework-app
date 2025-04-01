import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CreateUser } from './components/CreateUser'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Task, User } from './types'
import { AppWrapper } from './App.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

const App: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [users, setUsers] = useState<User[]>([])
	const [selectedUserId, setSelectedUserId] = useState<string>('')

	// Načtení tasků
	const fetchTasks = async (userId?: string) => {
		try {
			const url = userId ? `http://localhost:5000/api/tasks?assignedTo=${userId}` : 'http://localhost:5000/api/tasks'
			const response = await axios.get(url)
			setTasks(response.data)
		} catch (error) {
			console.error('Chyba při načítání úkolů:', error)
		}
	}

	// Načtení userů
	const fetchUsers = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/users')
			setUsers(response.data)
		} catch (error) {
			console.error('Chyba při načítání uživatelů:', error)
		}
	}

	useEffect(() => {
		fetchTasks()
		fetchUsers()
	}, [])

	// Mazání tasku
	const handleDelete = async (taskId: string) => {
		try {
			await axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
			setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
		} catch (error) {
			console.error('Chyba při mazání úkolu:', error)
		}
	}

	// Filtrování úkolů
	const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const userId = e.target.value
		setSelectedUserId(userId)
		fetchTasks(userId) // Filtrování úkolů podle vybraného uživatele
	}

	return (
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<h1>Rodinná aplikace pro úkoly</h1>
				<CreateUser onUserAdded={fetchUsers} />
				<TaskForm onTaskAdded={fetchTasks} users={users} />
				<div>
					<label>Filtrovat úkoly podle uživatele: </label>
					<select value={selectedUserId} onChange={handleUserSelect}>
						<option value="">Všichni uživatelé</option>
						<option value="unassigned">Nepřiřazeno</option>
						{users.map((user) => (
							<option key={user._id} value={user._id}>
								{user.name}
							</option>
						))}
					</select>
				</div>
				<TaskList tasks={tasks} users={users} onDelete={handleDelete} />
			</AppWrapper>
		</ThemeProvider>
	)
}

export default App
