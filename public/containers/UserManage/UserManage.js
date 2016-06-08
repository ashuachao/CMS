import React,{PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {load, update} from "../../redux/reducers/userMsg.js";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@connect(
    state => ({
        result: state.userMsg.result,
        loading: state.userMsg.loading,
        loaded: state.userMsg.loaded,
        updated: state.userMsg.updated,
        updating: state.userMsg.updating,
        userResult: state.userAuth.result       
    }),
    {
        load,
        update
    }
)
export default class UserManage extends Component{
    state = {
        msg: {
            title: "loading",
            body: "loading"
        },
        user: {
            userName: "loading",
            createAt: "loading"
        }
    }
    componentWillMount() {
        if (this.props.userResult) {
            const user = this.props.userResult.user;
            this.props.load(user);
        } else {
            // this.props.pushState('./');
            location.href = './';
        }
    }
    componentDidMount() {
        const that = this;
        $(".showDialog").click(function() {
            const title = $(this).find(".weui_cell_bd").html();
            const body = $(this).find(".weui_cell_ft").html();
            const key = $(this).find(".hidden").val();
            that.setState({
                msg: {
                    title,
                    body,
                    key
                }
            })
            $('#dialog').show().on('click', '.cancel', function () {
                $('#dialog').off('click').hide();
            }).on('click', '.confirm', function() {
                $('#dialog').off('click').hide();
                that.setState({
                    user: {
                        ...that.state.user,
                        [key]: that.state.msg.body
                    }
                })
            }); 
        })
    }
    // 不触发render
    componentWillReceiveProps(nextProps) {
        if (nextProps.loaded) {
            this.setState({
                user: nextProps.result.user
            })
        }
        if(nextProps.updated) {
            setTimeout(function () {
                $('#toast').hide();
            }, 2000);        
        }
    }
    handleChange = (event) => {
        this.setState({
            msg: {
                ...this.state.msg,
                body: event.target.value
            }
        })
    }
    onChildChange = (msg) => {
        this.setState({
            msg
        })
    }
    handleModify = (event) => {
        event.preventDefault();
        this.props.update(this.state.user);
    }
    render() {
        const style = require('./userManage.css');
        const loading = this.props.loading;
        const result = this.props.result;
        const loaded = this.props.loaded;
        const updating = this.props.updating;
        const updated = this.props.updated;
        const user = this.state.user;
        const msg = this.state.msg;
        console.log(updating);
        return (
            <div className="indexPage">
                {loading && 
                    <Loading msg="获取中" />
                }
                {loaded && updated &&
                    <Toast id="toast"/>
                }
                <div className="weui_cells_title">查看及修改个人信息</div>
                <div className="weui_cells weui_cells_access">
                    <a className="weui_cell showDialog" href="javascript:;">
                        <div className="weui_cell_bd weui_cell_primary">
                            用户
                        </div>
                        <input  type="hidden" className="hidden" defaultValue="userName"/>
                        <div className="weui_cell_ft">
                            {user.userName}
                        </div>
                    </a>
                    <a className="weui_cell showDialog" href="javascript:;">
                        <div className="weui_cell_bd weui_cell_primary">
                            地址
                        </div>
                        <input  type="hidden" className="hidden" defaultValue="address"/>
                        <div className="weui_cell_ft">
                            {user.address}
                        </div>
                    </a>
                    <a className="weui_cell showDialog" href="javascript:;">
                        <div className="weui_cell_bd weui_cell_primary">
                            电话
                        </div>
                        <input  type="hidden" className="hidden" defaultValue="tel"/>
                        <div className="weui_cell_ft">
                            {user.tel}
                        </div>
                    </a>
                    <a className="weui_cell" href="javascript:;">
                        <div className="weui_cell_bd weui_cell_primary">
                            拥有车辆
                        </div>
                        <div className="weui_cell_ft">
                        </div>
                    </a>
                    <a className="weui_cell showDialog" href="javascript:;">
                        <div className="weui_cell_bd weui_cell_primary">
                            登录信息
                        </div>
                        <input  type="hidden" className="hidden" defaultValue="createAt"/>
                        <div className="weui_cell_ft">
                            2012052289                             
                        </div>
                    </a>
                </div>                 
                <div className="weui_btn_area">
                    <a className="weui_btn weui_btn_warn" onClick={this.handleModify}>确定修改</a>
                </div>
                {loaded && 
                    <div className="weui_dialog_confirm" id="dialog">
                        <div className="weui_mask"></div>
                        <div className="weui_dialog">
                            <div className="weui_dialog_hd">
                            <strong className="weui_dialog_title">{msg.title}</strong>
                            </div>
                            <div className="weui_dialog_bd">
                                <textarea className="weui_textarea" placeholder="修改一些东西吧" rows="3" value={msg.body} onChange={this.handleChange}></textarea>
                                <div className="weui_textarea_counter"><span>0</span>/200</div>
                            </div>
                            <div className="weui_dialog_ft">
                                <a href="javascript:;" className="weui_btn_dialog default cancel" >取消</a>
                                <a href="javascript:;" className="weui_btn_dialog primary confirm" >确定</a>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}