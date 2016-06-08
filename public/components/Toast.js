                   
import React,{PropTypes, Component} from 'react';
export default class Toast extends Component {
    render() {
        return (
            <div id={this.props.id}>
                <div className="weui_mask_transparent"></div>
                <div className="weui_toast">
                    <i className="weui_icon_toast"></i>
                    <p className="weui_toast_content">已完成</p>
                </div>
            </div>
        )
    }
}

