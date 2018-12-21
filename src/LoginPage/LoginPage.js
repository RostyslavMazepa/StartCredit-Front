import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./index.css";

import { userActions } from "../_actions";

import { Form, Icon, Input, Button, Checkbox, Spin } from "antd";

const FormItem = Form.Item;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      username: "",
      password: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="content">
        <h2>Login</h2>
        <Form name="form" onSubmit={this.handleSubmit} className="login-form">
          <Spin spinning={!!loggingIn}>
            <FormItem
              className={
                "form-group" + (submitted && !password ? " has-error" : "")
              }
            >
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={this.handleChange}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
              {submitted && !username && (
                <div className="help-block">Username is required</div>
              )}
            </FormItem>
            <FormItem
              className={
                "form-group" + (submitted && !password ? " has-error" : "")
              }
            >
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
              {submitted && !password && (
                <div className="help-block">Password is required</div>
              )}
            </FormItem>

            <FormItem>
              <Checkbox>Remember me</Checkbox>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              Or{" "}
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            </FormItem>
          </Spin>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
