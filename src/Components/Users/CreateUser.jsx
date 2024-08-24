import { useState } from "react"
import { createUser, editUser } from "../apis/users";
import { Button, Modal, Form, Input, Select } from 'antd'
import "./index.css"

const { Option } = Select

const CreateUser = ({ editMode, record }) => {
    const [userId] = useState(editMode ? record.id : "")
    const [name, setName] = useState(editMode ? record.name : "")
    const [email, setEmail] = useState(editMode ? record.email : "")
    const [age, setAge] = useState(editMode ? record.age : null)
    const [employmentStatus, setEmploymentStatus] = useState(editMode ? record.employmentStatus : "")
    const [maritalStatus, setMaritalStatus] = useState(editMode ? record.maritalStatus : "")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (e) => {
        e.preventDefault()
        let payload = {
            name,
            email,
            age,
            employmentStatus,
            maritalStatus
        }
        if (editMode) {
            payload = { userId, ...payload }
            editUser(payload)
        }
        else createUser(payload)
        window.location.reload()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (e) => {
        console.log('Finished');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const employmentOptions = [
        {
            value: "Unemployed",
            key: "unemployed",
        },
        {
            value: "Employed",
            key: "Employed",
        }
    ]

    const maritalOptions = [
        {
            value: "Single",
            key: "Single",
        },
        {
            value: "Married",
            key: "Married",
        },
        {
            value: "Divorced",
            key: "Divorced",
        }
    ]

    const [form] = Form.useForm();

    return (
        <>
            <div className="right-button">
                <Button className={editMode ? "edit-button" : "create-button"} type={editMode ? '' : 'primary'} onClick={() => showModal()}>{editMode ? `Edit` : `Create New User`}</Button>
            </div>
            <Modal
                title="User Submission Form"
                centered
                open={isModalOpen}
                okText="Submit"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    style={{
                        padding: '10px',
                        textAlign: 'center'
                    }}
                    initialValues={{
                        name: editMode ? record.name : '',
                        email: editMode ? record.email : '',
                        age: editMode ? record.age : null,
                        employmentStatus: editMode ? record.employmentStatus : '',
                        maritalStatus: editMode ? record.maritalStatus : ''
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your age!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setAge(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Employment Status"
                        name="employmentStatus"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your employment status!',
                            },
                        ]}
                    >
                        <Select
                            onChange={(e) => setEmploymentStatus(e)}
                        >
                            {employmentOptions.map((employmentOption, index) =>
                                <Option value={employmentOption.value} />
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Marital Status"
                        name="maritalStatus"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your marital status!',
                            },
                        ]}
                    >
                        <Select
                            onChange={(e) => setMaritalStatus(e)}
                        >
                            {maritalOptions.map((maritalOption, index) =>
                                <Option value={maritalOption.value} />
                            )}
                        </Select>
                    </Form.Item>

                </Form>
            </Modal >
        </>
    )
}

export default CreateUser;