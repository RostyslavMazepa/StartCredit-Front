import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";

import "./index.css";

const FormItem = Form.Item;

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        password: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.username && user.password) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="content">
        <h2>Register</h2>
        <Form
          name="form"
          onSubmit={this.handleSubmit}
          className="register-form"
        >
          <FormItem
            {...formItemLayout}
            label="First Name"
            htmlFor="firstName"
            className={
              "form-group" + (submitted && !user.firstName ? " has-error" : "")
            }
          >
            <Input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={this.handleChange}
            />
            {submitted && !user.firstName && (
              <div className="help-block">First Name is required</div>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Last Name"
            htmlFor="lastName"
            className={
              "form-group" + (submitted && !user.lastName ? " has-error" : "")
            }
          >
            <Input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={this.handleChange}
            />
            {submitted && !user.lastName && (
              <div className="help-block">Last Name is required</div>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Username"
            htmlFor="username"
            className={
              "form-group" + (submitted && !user.username ? " has-error" : "")
            }
          >
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
            {submitted && !user.username && (
              <div className="help-block">Username is required</div>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
            htmlFor="password"
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
            }
          >
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className="help-block">Password is required</div>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
            {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/login" className="register-form-forgot">
              Cancel
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
