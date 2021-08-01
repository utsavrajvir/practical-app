import React, {useState, useEffect} from "react"
import { Button, Input, Card } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import "./style.css"
import {isEmpty} from "lodash"

export const LoginComponent = () => {
    const history = useHistory()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        if(!isEmpty(activeUser)){
            history.push('/')
            return
        }
    }, [])

    const LoginSubmit = () => {
        if(!userName.trim()){
            setError("Invalid user name")
            return
        }

        if(!password.trim()){
            setError("Invalid password")
            return
        }

        let localStorageUsersList = JSON.parse(localStorage.getItem('users'))

        if(localStorageUsersList?.length){
            let userExist = localStorageUsersList.filter(user => user.userName === userName)

            if(!userExist?.length){
                alert('User does not exist')
                return
            }

            if(userExist[0] != userName && userExist[0].password != password){
                setError('Invalid password')
                return
            }

            localStorage.setItem('activeUser', JSON.stringify(userExist[0]))
            history.push('/')
        }else{
            alert('User does not exist')
        }

    }

    return(
        <>
            <div className="login-container">
                <Card block title="Login" className="login-panel">

                    <Input 
                        size="large" 
                        placeholder="Enter user email" 
                        prefix={<UserOutlined />} 
                        onChange={(e) => setUserName(e.target.value)}
                        block
                    />
                    <br />
                    <br />
            
                    <Input.Password
                        size="large" 
                        placeholder="Enter password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => setPassword(e.target.value)}
                        block
                    />

                    <br />
                    <br />

                    {error && <span className="error">{error}</span>}
                    
                    <Button type="primary" block onClick={() => LoginSubmit()}>
                        Login
                    </Button>

                    <Button block type="link" onClick={() => history.push('/registration')}>
                        Register
                    </Button>
                    
                </Card>
            </div>
        </>
    )
}