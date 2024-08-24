import { useState, useEffect } from "react"
import { getUsers, createUser, deleteUser } from "../apis/users";
import CreateUser from "./CreateUser";
import { Table, Button } from 'antd'
import "./index.css"

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Employment Status',
        dataIndex: 'employmentStatus',
        key: 'employmentStatus',
    },
    {
        title: 'Marital Status',
        dataIndex: 'maritalStatus',
        key: 'maritalStatus',
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
            <div className="actions">
                <CreateUser editMode={true} record={record} />
                <Button className="clone-button" onClick={() => {
                    const {
                        name,
                        email,
                        age,
                        employmentStatus,
                        maritalStatus
                    } = record
                    let payload = {
                        name,
                        email,
                        age,
                        employmentStatus,
                        maritalStatus
                    }
                    createUser(payload)
                    window.location.reload();
                }}>
                    Clone
                </Button>
                <Button className="delete-button" onClick={() => {
                    deleteUser(record.id);
                    window.location.reload();
                }}>
                    Delete
                </Button>
            </div >
        ),
        width: 10
    }
];

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data);
            setLoading(false);
        })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Users</h1>
            <p>You can manage your users here.</p>
            <CreateUser />
            <Table className="users-table" dataSource={users} columns={columns} />
        </div>
    );
};

export default Users;