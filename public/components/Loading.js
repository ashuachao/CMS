import React,{Component} from "react";
const Loading = (props) => {
    const {msg} = props;
    return (
        <div id="loadingToast" className="weui_loading_toast">
            <div className="weui_mask_transparent"></div>
            <div className="weui_toast">
                <div className="weui_loading">
                    <div className="weui_loading_leaf weui_loading_leaf_0"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_1"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_2"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_3"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_4"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_5"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_6"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_7"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_8"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_9"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_10"></div>
                    <div className="weui_loading_leaf weui_loading_leaf_11"></div>
                </div>
                <p className="weui_toast_content">{msg}</p>
            </div>
        </div>
    )
}
Loading.propTypes = {
    msg: React.PropTypes.string.isRequired
}

export default Loading;
