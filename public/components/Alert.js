import React,{PropTypes, Component} from 'react';
export default class Alert extends Component {
    state = {
        msg: this.props.msg
    }
    static PropTypes = {
        msg: React.PropTypes.object.isRequired
    }
    componentDidMount() {
       $(".confirmPrice").on('click', function () {
            $(".weui_dialog_alert").hide();
       })
    }
    render() {
        const msg = this.state.msg;
        return (
            <div className="weui_dialog_alert">
                <div className="weui_mask"></div>
                <div className="weui_dialog">
                    <div className="weui_dialog_hd">
                    <strong className="weui_dialog_title">{msg.title}</strong>
                </div>
                    <div className="weui_dialog_bd">{msg.body}</div>
                    <div className="weui_dialog_ft">
                        <a href="javascript:;" className="weui_btn_dialog primary confirmPrice">确定</a>
                    </div>
                </div>
            </div>
        )
    }
}