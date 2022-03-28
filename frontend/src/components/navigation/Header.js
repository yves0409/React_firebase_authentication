import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  //{user} = DESTRUCTURED FROM STATE.USER
  let { user } = useSelector((user) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  //LOGOUT WILL DELETE THE LOCAL STORAGE
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home </Link>
      </Item>

      {user && (
        <SubMenu
          icon={<UserOutlined />}
          title={user.email}
          style={{ marginLeft: "auto" }}
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      {!user && (
        <Item
          key="login"
          icon={<LoginOutlined />}
          style={{ marginLeft: "auto" }}
        >
          <Link to="/login">Login</Link>
        </Item>
      )}

      {!user && (
        <Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
