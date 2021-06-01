import React from 'react';
import confetti from '../../assets/images/confetti.gif';
import check_circle1 from '../../assets/images/check-circle1.gif';

export class ConfirmModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Label : (props.Label && props.Label !== '') ? props.Label : '',
            yesOption : (props.yesOption && props.yesOption !== '') ? props.yesOption : '',
            noOption : (props.noOption && props.noOption !== '') ? props.noOption : '',
        }
    }
    render() {
        const { Label, yesOption, noOption } = this.state;
        return(
            <div className="category-popup query-details-popup">
                <div className={ (this.props.modalOpen === true) ? 'model-open custom-model-main' : 'custom-model-main' }>
                    <div className="vote-popup-box">
                        <div className="close-btn" onClick={this.props.handlerCloseModal}>×</div>
                        <div className="vote-popup-inner">
                            <span className=""></span>
                            <div className="vote-popup-desc">{Label}</div>
                            <div className="popup-btn-grp flex-box submit-btn">
                            <button type="button" onClick={this.props.handlerFun !== '' ? this.props.handlerFun : this.props.handlerCloseModal }>{yesOption}</button>
                            <button type="button" className="btn-cancel" onClick={this.props.handlerCloseModal}>{noOption}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class ErrorModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Label : (props.Label && props.Label !== '') ? props.Label : '',
            yesOption : (props.yesOption && props.yesOption !== '') ? props.yesOption : '',
            noOption : (props.noOption && props.noOption !== '') ? props.noOption : '',
        }
    }
    render() {
        const { Label, yesOption, noOption } = this.state;
        let showModal = this.props.modalOpen === true ? 'block' : 'none';
        return(
            <div className="swal2-container swal2-center swal2-backdrop-show" style={{overflowY: "auto", display : showModal}}>
                <div aria-labelledby="swal2-title" aria-describedby="swal2-content" className="swal2-popup swal2-modal swal2-icon-info swal2-show" tabIndex="-1" role="dialog" aria-live="assertive" aria-modal="true" style={{display: "flex"}}>
                    <div className="swal2-header">
                        <div className="swal2-icon swal2-info swal2-icon-show" style={{display: "flex"}}>
                            <div className="swal2-icon-content">i</div>
                        </div>
                        <h2 className="swal2-title" id="swal2-title" style={{display: "flex"}}>Whoops..</h2>
                        <button type="button" className="swal2-close" aria-label="Close this dialog" onClick={this.props.handlerCloseModal}>×</button>
                    </div>
                    <div className="swal2-content">
                        <div id="swal2-content" className="swal2-html-container" style={{display: "block"}}>{Label}</div>
                    </div>
                    <div className="swal2-actions">
                        <div className="swal2-loader"></div>
                        {yesOption !== '' && 
                            <button type="button" className="swal2-confirm swal2-styled" aria-label="" style={{display: "inline-block", borderLeftColor: "rgb(48, 133, 214)", borderRightColor: "rgb(48, 133, 214)"}} onClick={this.props.handlerCloseModal}>{yesOption}</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export class SuccessModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Label : (props.Label && props.Label !== '') ? props.Label : '',
            yesOption : (props.yesOption && props.yesOption !== '') ? props.yesOption : '',
            noOption : (props.noOption && props.noOption !== '') ? props.noOption : '',
        }
    }
    render() {
        const { Label, yesOption, noOption } = this.state;
        let showModal = this.props.modalOpen === true ? 'block' : 'none';
        return(
            <div className="swal2-container swal2-center swal2-backdrop-show" style={{overflowY: 'auto', display : showModal}}>
                <div aria-labelledby="swal2-title" aria-describedby="swal2-content" className="swal2-popup swal2-modal swal2-show" tabIndex="-1" role="dialog" aria-live="assertive" aria-modal="true" style={{background: "url('"+confetti+"')", display: "flex"}}>
                    <div className="swal2-header">
                        <img className="swal2-image" src={check_circle1} alt="Custom image" style={{width: '150px', height: '150px'}} />
                        <button type="button" className="swal2-close" aria-label="Close this dialog">×</button>
                    </div>
                    <div className="swal2-content">
                        <div id="swal2-content" className="swal2-html-container" style={{display: "block"}}>{Label}</div>
                    </div>
                    <div className="swal2-actions">
                        <div className="swal2-loader"></div>
                        {yesOption !== '' && 
                            <button type="button" className="swal2-confirm swal2-styled" aria-label="" style={{display: "inline-block", borderLeftColor: "rgb(48, 133, 214)", borderRightColor: "rgb(48, 133, 214)"}} onClick={this.props.handlerCloseModal}>{yesOption}</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}