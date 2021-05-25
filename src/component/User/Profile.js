import React from 'react';
import * as User from './UserDetails';
import * as UserService from '../../services/User';
import SideMenu from '../Queries/SideMenu';
import EditIcon from '../../assets/images/edit_icon.svg';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import moment from 'moment';


const userDetails = User.userDetails;
const user_id = userDetails._id;
let categories = userDetails !== '' && userDetails.Category;
let choosen_categories_ids = categories !== false && categories.map(el => el._id);

var yesterday = moment().subtract( 1, 'day' );
var valid = ( current ) => current.isBefore( yesterday );
const validEmailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


export default class List extends React.Component {
    constructor(props) {
        super();
        this.state = {
            id : userDetails._id,
            NameEdit : false,
            FirstName : userDetails.FirstName,
            LastName : userDetails.LastName,
            Mobile : userDetails.Mobile,
            Email : userDetails.Email,
            BirthDate : moment(userDetails.BirthDate).format('DD/MM/YYYY'),
            Image : userDetails.Image,
            ImageFile : '', 
            errors : {
                FirstName : null,
                LastName : null,
                Mobile : null,
                BirthDate : null,
                Email : null,
                Image : null,
                showImageErrorModal: 'none',
            }
        }
    }
    handleChange = (event) => {
        let { FirstName, LastName, Mobile, Email, BirthDate, Image, errors } = this.state;
        const { type, name, id, value, className, checked, files } = event.target;
        
        var availImageType = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
        switch (name) {
            case 'ImageFile':
                if (files.length > 0 && availImageType.indexOf(files[0].type) == '-1') {
                    errors.showImageErrorModal = 'block';
                } else {
                    errors.showImageErrorModal = 'none';
                }
                break;
            case 'Email':
                if (value.trim() == '') {
                    errors.Email = 'Email is required *';
                } else if (validEmailRegex.test(value.trim()) === false) {
                    errors.Email = 'Email is not valid !';
                } else {
                    errors.Email = null;
                }
                break;
            case 'submit':
                event.preventDefault();
                this.submitForm();
                break;
            default:
                if (value.trim() == '') {
                    errors[name] = name+' is required*';
                } else {
                    errors[name] = null;
                }
                break;
        }
        this.setState({ [name]: value });
        // this.setState({
        //     queryImageFile: event.target.files[0]
        // });
    }
    submitForm = async () => { 
        const { FirstName, LastName, Mobile, Email, BirthDate, Image, ImageFile, errors } = this.state;
        let postArr = {
            FirstName : FirstName,
            LastName : LastName,
            Mobile : Mobile,
            Email : Email,
            BirthDate : BirthDate,
        }
        ImageFile !== '' && (postArr.Image = ImageFile);

        let formData = new FormData();
        var postArr_values = Object.values(postArr);
        var postArr_keys = Object.keys(postArr);
        for (let i = 0; i < postArr_keys.length; i++) {
            formData.append(postArr_keys[i], postArr_values[i]);
        }
        UserService.profile_update(this.state.id,formData).then(
            result => {console.log('result', result)}
        )
    }
    render() {
        const { FirstName, LastName, Mobile, Email, BirthDate, Image, NameEdit, errors } = this.state;
        return(
            <section className="query-banner-img">
                <div class="container">
                    <div class="query-inner d-flex">
                        <SideMenu component={'profile'}/>
                        <div class="right-container">
                        <div className="right-container-inner">
                            <div className="edit-profile-info">
                                <div className="flex-box">
                                    <div className="edit-prof-img">
                                        <span className="profile-img ng-star-inserted" style={{backgroundImage: "url('"+Image+"')"}}></span>
                                        <div className="browse-img">
                                            <input type="file" name="ImageFile" onChange={this.handleChange} accept="image/png, image/gif, image/jpeg, image/jpg" />
                                            <label><img src={EditIcon} /></label>
                                        </div>
                                    </div>
                                    <div className="edit-profile-info-inner">
                                        <h2 className="user-name">{FirstName} {LastName} <span className="edit-text"><a className="edit_name" onClick={() => this.setState({NameEdit : true})}>Edit.</a></span></h2>
                                    </div>
                                </div>
                                <div style={{position:'relative'}}>
                                    {(errors.ImageFile != null && errors.ImageFile.length > 0) && <span className='validation-msg'>{errors.ImageFile}</span>}
                                </div>
                            </div>
                            <form novalidate="" className="edit-profile-form">
                                <div className="add-more-info">
                                    <div className="form-group">
                                        {NameEdit === true && 
                                            <div className="form-field flex-box validation-error">
                                                <label>First Name<sup>*</sup></label>
                                                <div>
                                                    <input type="text" name="FirstName" formcontrolname="FirstName" className="" defaultValue={FirstName} onChange={this.handleChange} />
                                                    {(errors.FirstName != null && errors.FirstName.length > 0) && <span className='validation-msg'>{errors.FirstName}</span>}
                                                </div>
                                            </div>
                                        }
                                        {NameEdit === true && 
                                            <div className="form-field flex-box validation-error">
                                                <label>Last Name<sup>*</sup></label>
                                                <div>
                                                    <input type="text" name="LastName" formcontrolname="LastName" className="" defaultValue={LastName} onChange={this.handleChange} />
                                                    {(errors.LastName != null && errors.LastName.length > 0) && <span className='validation-msg'>{errors.LastName}</span>}
                                                </div>
                                            </div>
                                        }
                                        <div className="form-field mobile flex-box validation-error">
                                            <label>Contact No.</label>
                                            <div>
                                                <input type="text" formcontrolname="Mobile" name="Mobile" className="" defaultValue={Mobile} onChange={this.handleChange} />
                                                {(errors.Mobile != null && errors.Mobile.length > 0) && <span className='validation-msg'>{errors.Mobile}</span>}
                                            </div>
                                        </div>
                                        <div className="form-field select-date flex-box validation-error">
                                            <label>DOB.<sup>*</sup></label>
                                            <div>
                                                <Datetime dateFormat="DD/MM/YYYY" initialValue={BirthDate} name="BirthDate" timeFormat={false} isValidDate={ valid } />
                                                {/* {(errors.BirthDate != null && errors.BirthDate.length > 0) && <span className='validation-msg'>{errors.BirthDate}</span>} */}
                                            </div>
                                        </div>
                                        <div className="form-field email flex-box validation-error">
                                            <label>Email ID.<sup>*</sup></label>
                                            <div>
                                                <input type="email" formcontrolname="Email" className="" name="Email" defaultValue={Email} onChange={this.handleChange}/>
                                                {(errors.Email != null && errors.Email.length > 0) && <span className='validation-msg'>{errors.Email}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-btn"><button type="submit" onClick={this.handleChange} name="submit"> Update</button></div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swal2-container swal2-center swal2-backdrop-show" style={{overflowY: "auto", display : errors.showImageErrorModal}}>
                    <div aria-labelledby="swal2-title" aria-describedby="swal2-content" className="swal2-popup swal2-modal swal2-icon-info swal2-show" tabIndex="-1" role="dialog" aria-live="assertive" aria-modal="true" style={{display: "flex"}}>
                        <div className="swal2-header">
                            <div className="swal2-icon swal2-info swal2-icon-show" style={{display: "flex"}}>
                                <div className="swal2-icon-content">i</div>
                            </div>
                            <h2 className="swal2-title" id="swal2-title" style={{display: "flex"}}>Whoops..</h2>
                            <button type="button" className="swal2-close" aria-label="Close this dialog" style={{display: "none"}}>×</button>
                        </div>
                        <div className="swal2-content">
                            <div id="swal2-content" className="swal2-html-container" style={{display: "block"}}>Please upload valid Image !</div>
                        </div>
                        <div className="swal2-actions">
                            <div className="swal2-loader"></div>
                            <button type="button" className="swal2-confirm swal2-styled" aria-label="" style={{display: "inline-block", borderLeftColor: "rgb(48, 133, 214)", borderRightColor: "rgb(48, 133, 214)"}} onClick={() => this.setState({ errors : { showImageErrorModal : 'none' }})}>OK</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}