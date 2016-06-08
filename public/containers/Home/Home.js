import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import {register, test, login, guest, guestPrice, guestLogin} from "../../redux/reducers/userAuth";
import superagent from 'superagent';
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
@connect(
    state => ({
        // user: state.userAuth.user,
        result: state.userAuth.result,
        loggingIn: state.userAuth.loggingIn
    }),
    {
        pushState: push,
        register,
        login,
        guest,
        guestLogin,
        guestPrice
    }
)
export default class Home extends Component{
    static PropTypes = {
        user: PropTypes.object,
        pushState: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired
    }
    componentDidMount() {
        const userLogin = localStorage.getItem('user');
        const isGuest = localStorage.getItem('isGuest');
        if (userLogin) {
            if (isGuest) {
                this.props.guestLogin(userLogin);
            } else {
                this.props.login('test');
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.result && nextProps.result.user) {
            if (nextProps.result.isGuest) {
                localStorage.setItem('isGuest', true);
            } 
            localStorage.setItem('user', nextProps.result.user);
        } 
    }
    handleLogin = (event) => {
        event.preventDefault();    
        this.props.login("test");
    };
    handleGuest = (event) => {
        event.preventDefault();
        this.props.guest();
    }
    handleGuestPrice = (event) => {
        event.preventDefault();
        if (this.props.result.user && this.props.result.isGuest) {
            this.props.guestPrice(this.props.result.user);
        }
    }
    handleQRCode = (event) => { 
        const originalGuest = localStorage.getItem('isGuest');
        var isGuest = true;
        if (!originalGuest) {
            isGuest = false;
        }
        event.preventDefault();
        console.log(this.props.result.user, isGuest);
        window.webkit.messageHandlers.Qrcode.postMessage({user: this.props.result.user,isGuest: isGuest })
    }
    handleActionSheet = (event) => {
        var mask = $('#mask');
        var weuiActionsheet = $('#weui_actionsheet');
        weuiActionsheet.addClass('weui_actionsheet_toggle');
        mask.show()
            .focus()//加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
            .addClass('weui_fade_toggle').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
        });
        $('#actionsheet_cancel').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
        });
        mask.unbind('transitionend').unbind('webkitTransitionEnd');
        function hideActionSheet(weuiActionsheet, mask) {
            weuiActionsheet.removeClass('weui_actionsheet_toggle');
            mask.removeClass('weui_fade_toggle');
            mask.on('transitionend', function () {
                mask.hide();
            }).on('webkitTransitionEnd', function () {
                mask.hide();
            })
        }    
    }
	render() {
        // 解构
        // const user = this.props.user;
        const initialResult = {
            user: null,
            msg: null
        }
        const result = this.props.result || initialResult;
        const loggingIn = this.props.loggingIn;
        const style = require('./home.css');
        const alertBody = {
            title: '您需要付的车费是',
            body: result.price
        }
		return (            
            <div className="indexPage" onClick={this.handler}>
                {loggingIn &&
                    <Loading msg="登录中"/>
                }
                <div className="indexHead">
                    <h1 id="logo"> 
                        <i className="weui_icon_safe weui_icon_safe_success"></i>
                        小区安全卫士
                        Welcome!{result.userName}
                    </h1>
                </div>
                <div className="indexBody">
                    {!result.user ?
                        <a className="weui_btn weui_btn_default" onClick={this.handleLogin}>用户登录</a> :
                        <a className="weui_btn weui_btn_default" id="showActionSheet" onClick={this.handleActionSheet}>扫描二维码</a>
                    }     
                    {result.user && result.isGuest &&
                        <a className="weui_btn weui_btn_default" onClick={this.handleGuestPrice}>查看车费</a>
                    }           
                    {!result.user &&
                        <a className="weui_btn weui_btn_default" onClick={this.handleGuest}>客人登录</a>            
                    }
                    {!result.user && <Link to="user/register" className="weui_btn weui_btn_default">账户注册</Link>}
                    <Link to="about" className="weui_btn weui_btn_default">关于(v1.0.0)</Link>
                    {result.price && 
                        <a className="weui_btn weui_btn_default">目前车费:{result.price}元</a>
                    }   
                    <div id="actionSheet_wrap">
                        <div className="weui_mask_transition" id="mask"></div>
                        <div className="weui_actionsheet" id="weui_actionsheet">
                            <div className="weui_actionsheet_menu">
                                <div className="weui_actionsheet_cell" onClick={this.handleQRCode}>打开相机</div>
                            </div>
                            <div className="weui_actionsheet_action">
                                <div className="weui_actionsheet_cell" id="actionsheet_cancel">取消</div>
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
		)
	}
}
