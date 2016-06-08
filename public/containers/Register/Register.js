import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {register} from "../../redux/reducers/userAuth";
import Loading from "../../components/Loading";

@connect(
    state => ({
        // user: state.userAuth.user,
        result: state.userAuth.result,
        registerIn: state.userAuth.registerIn
    }),
    {
        register
    }
)
export default class Home extends Component{
    static PropTypes = {
        register: PropTypes.func.isRequired
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.result && nextProps.result.user) {
            alert('跳转主页面')
        } 
    }
    handleRegister = (event) => {
        event.preventDefault();
        const userName = $(".userName")[0];
        const password = $(".password")[0];
        if (userName.length > 0 && password.length > 0) {
            this.props.register({
                userName,
                password
            })
        } else {
            alert('输入的用户或密码为空');
            event.target.focus();
        }
    }
	render() {
        const registerIn = this.props.registerIn;
		return (
			<div className="indexPage">
                {registerIn &&
                    <Loading msg="登录中"/>
                }
                <div className="indexHead">
                    <h1 id="logo"> 
                        <i className="weui_icon_safe weui_icon_safe_success"></i>
                        注册
                    </h1>
                </div>
                <div className="indexBody">
                    <div className="weui_cells_title">注册</div>
                    <div className="weui_cells weui_cells_form">
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                <label className="weui_label">用户</label>
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input ref="userName" className="weui_input userName" type="text" placeholder="请输入用户名"/>
                            </div>
                        </div>
                        <div className="weui_cell">
                            <div className="weui_cell_hd">
                                <label className="weui_label password">密码</label>
                            </div>
                            <div className="weui_cell_bd weui_cell_primary">
                                <input ref="password" className="weui_input" type="number" placeholder="请输入密码"/>
                            </div>
                        </div>
                    </div>                  
                    <div className="weui_btn_area">
                        <a className="weui_btn weui_btn_primary" onClick={this.handleRegister}>确定</a>
                    </div>
                </div>                
            </div>
		)
	}
}
