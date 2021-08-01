import React from "react"
import {Form, Input, Button, InputNumber} from "antd"
import {useSelector, useDispatch} from "react-redux"
import {isEmpty} from 'lodash'
import { useEffect } from "react"
import * as types from "../../reduxStore/types/userList"
import {uniqueId} from "lodash"
import {useHistory} from "react-router-dom"

export const AddEditInformation = () => {
    const editInformation = useSelector(state => state.userList.editInformation)
    const userList = useSelector(state => state.userList.userList)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        if(isEmpty(activeUser)){
            history.push('/login')
            return
        }
        
        return () => {
            dispatch({
                type: types.SET_EDIT_INFORMATION,
                payload: {
                    editInformation: {}
                }
            })
        }
    }, [])

    const setData = (data) => {
        dispatch({
            type: types.SET_USER_LIST,
            payload: {
                userList: data
            }
        })
        let usersRecords = JSON.parse(localStorage.getItem('usersRecord'))
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        usersRecords[activeUser.id] = data
        localStorage.setItem('usersRecord', JSON.stringify(usersRecords))
    }

    const onFinish = (values) => {
        if(!isEmpty(editInformation)){
            let userArray = [...userList]
            userArray.map(user => {
                if(user.id == editInformation.id){
                    user.name = values.name
                    user.year = values.year
                }
            })

            setData(userArray)
        }else{
            let userArray = [...userList]
            userArray.push({...values, id: uniqueId('A')})
            setData(userArray)
        }

        history.goBack()
    }

    return(
        <>
            <h2>{!isEmpty(editInformation) ? 'Edit' : 'Add'} Information</h2>
            <Form
                name="basic"
                // labelCol={{span: 4}}
                wrapperCol={{span: 2}}
                initialValues={!isEmpty(editInformation) ? { name: editInformation.name, year: editInformation.year }: {}}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Year"
                    name="year"
                    rules={[{ required: true, message: 'Please year!' }]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}