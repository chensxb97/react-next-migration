async function getUsers() {
    const res = await fetch('http://localhost:3001/api/users/get')
    const data = await res.json()
    return data
}

async function getUser(userId) {
    const res = await fetch(
        `http://localhost:3001/api/users/get/${userId}`
    )
    const data = await res.json()
    return data
}

async function createUser(payload) {
    const { name, email, age, employmentStatus, maritalStatus } = payload
    await fetch('http://localhost:3001/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            age,
            employmentStatus,
            maritalStatus
        }),
    })
}

async function editUser(payload) {
    const { userId, name, email, age, employmentStatus, maritalStatus } = payload
    await fetch(`http://localhost:3001/api/users/edit/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            age,
            employmentStatus,
            maritalStatus
        }),
    })
}

async function deleteUser(userId) {
    await fetch(`http://localhost:3001/api/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
export {
    getUsers,
    getUser,
    createUser,
    editUser,
    deleteUser
}