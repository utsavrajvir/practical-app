import React, { useState } from "react";
import { Button, Input, Card, DatePicker } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "../Login/style.css";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import moment from "moment";

export const Register = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (!isEmpty(activeUser)) {
      history.push("/");
      return;
    }
  }, []);

  const checkDate = () => {
    let currentDate = moment().format("YYYY-MM-DD");

    let currentDateCheck = currentDate.toString().substr(4, 6);
    let selectedDateCheck = dateOfBirth.toString().substr(4, 6);

    return currentDateCheck == selectedDateCheck;
  };

  const register = () => {
    if (!userName.trim()) {
      setError("Invalid user name");
      return;
    }

    if (!password.trim()) {
      setError("Invalid password");
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setError("Invalid password and confirm password does not match");
      return;
    }

    let localStorageUsersList = JSON.parse(localStorage.getItem("users"));

    if (localStorageUsersList) {
      let userExist = localStorageUsersList.filter(
        (user) => user.userName == userName
      );
      if (userExist.length) {
        alert("User Already exist");
        return;
      }

      localStorageUsersList.push({
        id: Math.floor(Math.random() * 1000),
        userName,
        password,
        confirmPassword,
        dateOfBirth,
        notification: dateOfBirth ? checkDate() : false,
      });
      localStorage.setItem("users", JSON.stringify(localStorageUsersList));
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            id: Math.floor(Math.random() * 1000),
            userName,
            password,
            confirmPassword,
            dateOfBirth,
            notification: dateOfBirth ? checkDate() : false,
          },
        ])
      );
    }

    history.push("/login");
    // alert('User Created Successfully!!')
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  const onChange = (date, dateString) => {
    setDateOfBirth(dateString);
  };

  return (
    <>
      <div className="login-container">
        <Card block title="Registration" className="login-panel">
          <Input
            size="large"
            placeholder="Enter user name"
            prefix={<UserOutlined />}
            onChange={(e) => setUserName(e.target.value)}
            block
          />

          <br />
          <br />

          <Input.Password
            size="large"
            placeholder="Enter password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setPassword(e.target.value)}
            block
          />

          <br />
          <br />

          <Input.Password
            size="large"
            placeholder="Confirm password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
            block
          />

          <br />
          <br />

          <DatePicker
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
            onChange={onChange}
            placeholder="DOB"
          />
          <br />
          <br />

          {error && <span className="error">{error}</span>}

          <Button type="primary" block onClick={() => register()}>
            Register
          </Button>

          <Button block type="link" onClick={() => history.goBack()}>
            Login
          </Button>
        </Card>
      </div>
    </>
  );
};
