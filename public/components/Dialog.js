import React,{PropTypes, Component} from 'react';
export default class Dialog extends Component {
    state = {
        msg: this.props.msg
    }
    static PropTypes = {
        msg: React.PropTypes.object.isRequired
    }
    componentDidMount() {
        const that = this;
        $(".showDialog").click(function() {
            const title = $(this).find(".weui_cell_bd").html();
            const body = $(this).find(".weui_cell_ft").html();
            that.setState({
                msg: {
                    title,
                    body
                }
            })
            $('#dialog').show().on('click', '.cancel', function () {
                $('#dialog').off('click').hide();
            }).on('click', '.confirm', function() {
                this.props.callbackParent(that.state.msg);
            });         
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            msg:nextProps.msg
        })
    }
    handleChange = (event) => {
        var newMsg = {
            title: this.state.msg.title,
            body: event.target.value
        }
        this.props.callbackParent(newMsg);
    }
    render() {
        const msg = this.state.msg;
        console.log(msg);
        return (
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
                        <a href="javascript:;" className="weui_btn_dialog default cancel">取消</a>
                        <a href="javascript:;" className="weui_btn_dialog primary confirm">确定</a>
                    </div>
                </div>
            </div>
        )
    }
}

