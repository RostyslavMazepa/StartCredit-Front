import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { HomeContent } from "./HomeContent";
import HeaderMenu from "./HeaderMenu";
import SiderMenu from "./SiderMenu";

import "./index.css";

import { userActions } from "../_actions";

const { Header, Content, Sider, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  onCollapse = collapsed => {
    //console.log(collapsed);
    this.setState({ collapsed });
  };

  state = {
    collapsed: false
  };

  render() {
    const { user, users } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <SiderMenu />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <HeaderMenu />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              Bill is a cat.
              <HomeContent dataUsers={users} dataUser={user} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            MYSolutions ©2018 Created by Rostyslav Mazepa
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
