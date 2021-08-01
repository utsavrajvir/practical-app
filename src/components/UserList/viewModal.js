import React from "react"
import {Modal, Space} from "antd"
import {useSelector} from "react-redux"

export const ViewModal = (props) => {
    const {isModalVisible, setIsModalVisible} = props
    const editInformation = useSelector(state => state.userList.editInformation)
    
    const closeModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    return(
        <Modal title="Detail Information" visible={isModalVisible} onOk={closeModal} onCancel={closeModal}>
            <Space direction="vertical">
                <p>Id: {editInformation.id}</p>
                <p>Name: {editInformation.name}</p>
                <p>Color: {editInformation.color}</p>
                <p>Year: {editInformation.year}</p>
            </Space>
        </Modal>
    )
}