import React,{PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {load, loadGuest} from "../../redux/reducers/carLog";
import Loading from "../../components/Loading";
import {pushState} from 'history';
@connect(
    state => ({
        carLogResult: state.carLog.result,
        loading: state.carLog.loading,
        userResult: state.userAuth.result
    }),
    {
        load,
        pushState,
        loadGuest
    }
)
export default class extends Component{
    componentWillMount() {
        if (this.props.userResult) {
            const user = this.props.userResult.user;
            if (this.props.userResult.isGuest) {
                this.props.loadGuest(user)
            } else {
                this.props.load(user);
            }
        } else {
            // this.props.pushState('./');
            location.href = './';
        }
    }
    render() {
        const loading = this.props.loading;
        const result = this.props.carLogResult;
        const {carLogs, carLog} = result;
        const style = require('./carLog.css');
        return (
            <div className="carLogPage">
                 {loading && 
                    <Loading msg="获取中" />
                 }
                 { carLogs &&
                    carLogs.map(carLog => {
                        return  (
                            <div className="weui_panel weui_panel_access">
                                <div className="weui_panel_hd">车辆进出记录</div>
                                <div className="weui_panel_bd">
                                    <div className="weui_media_box weui_media_text">
                                        <p className="weui_media_desc">{carLog.enterIn}进入小区</p>
                                        <p className="weui_media_desc">{carLog.entranceIn}出去小区</p>    
                                    </div>
                                </div>
                            </div>
                        )               
                    })
                 }
                 { carLog &&
                    <div className="weui_panel weui_panel_access">
                        <div className="weui_panel_hd">车辆进出记录</div>
                        <div className="weui_panel_bd">
                            <div className="weui_media_box weui_media_text">
                                <p className="weui_media_desc">{carLog.enterIn}进入小区</p>
                                <p className="weui_media_desc">{carLog.entranceIn}出去小区</p>    
                            </div>
                        </div>
                    </div>       
                 }
            </div>
        )
    }
}