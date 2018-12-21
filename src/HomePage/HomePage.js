import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
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

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  onCollapse = collapsed => {
    console.log(collapsed);
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
            <div className="col-md-6 col-md-offset-3">
              <h1>Hi {user.firstName}!</h1>
              <p>You're logged in with React!!</p>
              <h3>All registered users:</h3>
              {users.loading && <em>Loading users...</em>}
              {users.error && (
                <span className="text-danger">ERROR: {users.error}</span>
              )}
              {users.items && (
                <ul>
                  {users.items.map((user, index) => (
                    <li key={user.id}>
                      {user.firstName + " " + user.lastName}
                      {user.deleting ? (
                        <em> - Deleting...</em>
                      ) : user.deleteError ? (
                        <span className="text-danger">
                          {" "}
                          - ERROR: {user.deleteError}
                        </span>
                      ) : (
                        <span>
                          {" "}
                          -{" "}
                          <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <p>
                <Link to="/login">Logout</Link>
              </p>
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
