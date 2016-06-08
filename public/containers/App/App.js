// 主界面 包含其他container
import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class App extends Component{
    static propTypes = {
        children: PropTypes.object.isRequired
    };
    componentDidMount() {
        $(".weui_tabbar_item").click(function() {
            $(".weui_tabbar_item").removeClass("weui_bar_item_on");
            $(this).addClass("weui_bar_item_on");
        })
    }
    render() {
        const { pathname } = this.props.location;
        const key = pathname.split('/')[1] || "root";
        const style = require('./index.css');
        // 解构
        return (
            <div className="container">
                <div className="weui_tab">                
                    <div className="weui_tab_bd">
                        <ReactCSSTransitionGroup
                        component="div" transitionName="example"
                        transitionEnterTimeout={500} transitionLeaveTimeout={500}
                        >
                            {React.cloneElement(this.props.children || <div />, { key: key })}
                        </ReactCSSTransitionGroup>
                    </div>                
                    <div className="weui_tabbar">
                        <Link to="/" ref="Home" className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img  alt="" />
                            </div>
                            <p className="weui_tabbar_label">主界面</p>
                        </Link>
                        <Link to="/carMan/carLog" ref="CarLog" className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img  alt="" />
                            </div>
                            <p className="weui_tabbar_label">动态</p>
                        </Link>
                        <Link to="/user/manage" ref="Home" className="weui_tabbar_item">
                            <div className="weui_tabbar_icon">
                                <img  alt="" />
                            </div>
                            <p className="weui_tabbar_label">我</p>
                        </Link>
                    </div>
                </div>                
            </div>
        )
    };
}