import * as types from "../../reduxStore/types/userList"

export const getUserList = (userId) => {

    return async (dispatch, getState) => {
        fetch('https://reqres.in/api/products').then(respnse => respnse.json()).then(res => {            
            dispatch({
                type: types.SET_USER_LIST,
                payload: {
                    userList: res.data
                }
            })

            let usersRecord = JSON.parse(localStorage.getItem('usersRecord'))

            if(usersRecord){
                usersRecord[userId] = res.data
                localStorage.setItem('usersRecord', JSON.stringify(usersRecord))
            }else{
                let record = {}
                record[userId] = res.data
                localStorage.setItem('usersRecord', JSON.stringify(record))
            }
        })
    }
}