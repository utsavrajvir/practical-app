import React, {useEffect, useState} from "react"
import {Table, Space, Button, Modal, notification} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {getUserList} from "../../api/userList/getUserList"
import { ViewModal } from "./viewModal"
import * as types from "../../reduxStore/types/userList"
import {useHistory} from "react-router-dom"
import {isEmpty} from "lodash"
import moment from "moment"

export const UserListComponent = () => {
    const userList = useSelector(state => state.userList.userList)
    const editInformation = useSelector(state => state.userList.editInformation)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const clsoeNotification = () => {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        let users = JSON.parse(localStorage.getItem('users'))

        users.map(user => {
            if(user.id == activeUser.id){
                user.notification = false
            }
        })
        
        activeUser.notification = false
        localStorage.setItem('activeUser', JSON.stringify(activeUser))
        localStorage.setItem('users', JSON.stringify(users))
    }

    const openNotification = () => {
        const args = {
          message: 'Happy Birthday dear',
          description: 'Hope this birthday brings all the happiness you wanted',
          duration: 0,
          onClose: () => clsoeNotification()
        };
        notification.open(args);
    };

    const editInfo = (data) => {
        setInfo(data)
        history.push("/information")
    }

    const deleteData = (data) => {
        let filterdArray = userList.filter(user => user.id != data.id)

        dispatch({
            type: types.SET_USER_LIST,
            payload: {
                userList: filterdArray
            }
        })

        let usersRecord = JSON.parse(localStorage.getItem('usersRecord'))
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))

        usersRecord[activeUser.id] = filterdArray

        localStorage.setItem('usersRecord', JSON.stringify(usersRecord))
    }

    const deleteInfo = (data) => {
        Modal.warning({
          title: 'It will remove this record',
          content: 'Are you sure you want to remove?',
          onOk: () => deleteData(data)
        });
    }

    const setInfo = (data) => {
        dispatch({
            type: types.SET_EDIT_INFORMATION,
            payload: {
                editInformation: data
            }
        })
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '25%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%'
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width: '25%'
        },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => {setInfo(record); setIsModalVisible(prevState => !prevState)}}> View </Button>
                    <Button type="link" onClick={() => editInfo(record)}> Edit </Button>
                    <Button type="link" onClick={() => deleteInfo(record)}>Delete</Button>
                </>
            )
        }
    ]

    const checkDate = (date) => {
        let currentDate = moment().format("YYYY-MM-DD")

        let currentDateCheck = currentDate.toString().substr(4, 6)
        let selectedDateCheck = date.toString().substr(4, 6)

        return currentDateCheck == selectedDateCheck
    }

    const birthDayCheck = () => {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        let users = JSON.parse(localStorage.getItem('users'))

        if(activeUser.dateOfBirth && checkDate(activeUser.dateOfBirth) && activeUser.notification){
            openNotification()
        }else{
            users.map(user => {
                if(user.id == activeUser.id){
                    user.notification = false
                }
            })
            activeUser.notification = false
            localStorage.setItem('activeUser', JSON.stringify(activeUser))
            localStorage.setItem('users', JSON.stringify(users))
        }

        if(activeUser.dateOfBirth && !checkDate(activeUser.dateOfBirth)){
            users.map(user => {
                if(user.id == activeUser.id){
                    user.notification = true
                }
            })

            localStorage.setItem('users', JSON.stringify(users))
        }
    }

    useEffect(() => {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        let usersRecord = JSON.parse(localStorage.getItem('usersRecord'))
        
        if(isEmpty(activeUser)){
            history.push('/login')
            return
        }

        birthDayCheck()
        
        if(!usersRecord){
            dispatch(getUserList(activeUser.id))
        }

        if(usersRecord && !usersRecord?.[activeUser.id]){
            dispatch(getUserList(activeUser.id))
        }

        if(usersRecord && usersRecord[activeUser.id]){
            dispatch({
                type: types.SET_USER_LIST,
                payload: {
                    userList: usersRecord[activeUser.id]
                }
            })
        }
        
    }, [])
    
    const logout = () => {
        localStorage.setItem('activeUser', JSON.stringify({}))
        history.push("/login")
    }

    return(
        <>
            <ViewModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
            <Button type="primary" onClick={() => history.push("/information")}>Add</Button>
            <Table dataSource={userList} columns={columns} />
            <Button type="primary" onClick={logout}>Logout</Button>
        </>
    )
}