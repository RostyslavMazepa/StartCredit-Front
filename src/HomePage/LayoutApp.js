import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import HeaderMenu from "./HeaderMenu";
import SiderMenu from "./SiderMenu";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import "antd/dist/antd.css";
import "../styles.css";

export default class LayoutApp extends React.Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
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
