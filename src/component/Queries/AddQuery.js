import React from 'react';
import * as Queries from '../../services/Queries';
import * as User from '../User/UserDetails';
import SideMenu from './SideMenu';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import moment from 'moment';
import { AllCategories } from './Categories';


export default class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            query:'',
            showCategoryErrorModal: 'none',
            categories_list: '',
            queryImageFile : '',
            IsPublic: true,
            Category: [],
            EndDate: new Date(),
            OptionType: "1",
            ChartOption: "2",
            options : [
                {
                    value : '',
                    optionImage : ''
                },
                {
                    value : '',
                    optionImage : ''
                }
            ],
            errors: {
                query : '',
                options : [],
            }
        }
        this.addMoreOption = this.addMoreOption.bind(this);
    }
    changeDate = () => {
    }
    addMoreOption = () => {
        let options = [...this.state.options];
        options.push({
            value : '',
            optionImage : ''
        });
        
        this.setState({
            options : options
        });
    }
    changeQueryImage = (event) => {
        this.setState({
            queryImageFile: event.target.files[0]
        });
    }
    removeOptionsImage = (optionId) => {
        const { queryImageFile, options } = this.state;
        delete options[optionId].optionImage;
        
        this.setState({
            options : options
        });
    }
    removeQueryImage = () => {
        this.setState({
            queryImageFile: ''
        });
    }
    changeOptionInfo = (event) => {
        event.preventDefault();
        let { options, errors } = this.state;
        const { defaultValue, type, name, id, value, className, files } = event.target;
        
        if (type == 'file') {
            options[name]['optionImage'] = files;            
        } else {
            options[name]['value'] = value;
            if (value == '') {
                errors.options[name] = 'is required*';
            } else {
                errors.options[name] = null;
            }
        }
        // showCategoryErrorModal
        this.setState({
            [name]: value,
            options : options,
        });
    }
    handleChange = (event) => {
        let { options, errors, IsPublic, ChartOption, Category } = this.state;
        const { type, name, id, value, className, checked } = event.target;
        switch (name) {
            case 'query': 
                if (value == '') {
                    errors.query = 'Query is required*';
                } else {
                    errors.query = null;
                }
                break;
            case 'submit':
                event.preventDefault();
                this.submitForm();
                break;
            default:
                break;
        }


            // case 'selectCategory':
            // showCategoryErrorModal
            // if (Category.length === 0) {
            //     errors.query = 'Query is required*';
            // } else {
            //     errors.query = null;
            // }
            // break;

        if (name === 'selectCategory') {
            this.setState({ 'Category' : [...Category, value] });
        } else {
            this.setState({ [name]: value });
        }
    }
    submitForm = async () => { 
        const { options, query, queryImageFile, IsPublic, EndDate, ChartOption, Category } = this.state;
        const numberWordsArr = {
            '0' : 'One',
            '1' : 'Two',
            '2' : 'Three',
            '3' : 'Four',
            '4' : 'Five',
            '5' : 'Six',
        };
        let postArr = {
            "UserID": User.user_id,
            "IsPublic": IsPublic,
            "EndDate": moment(EndDate).format('DD/MM/YYYY HH:mm A'),
            "OptionType": "1",
            "ChartOption": ChartOption
        }
        if (Category.length > 0) {
            postArr.Category = Category.join(',')
        } else {
            this.setState({ showCategoryErrorModal : 'block' });
            return false;
        }
        query !== '' && (postArr.Query = query);
        queryImageFile !== '' && (postArr.File = queryImageFile);
        
        options.length > 0 && options.map((option, key) => {
            option.value !== '' && (postArr['Option'+numberWordsArr[key]] = option.value);
            option.optionImage !== '' && (postArr['Option'+numberWordsArr[option.value]+'File'] = option.optionImage);
        });
        Queries.create_poll(postArr).then(
            result => {console.log('result', result)}
        )
    }
    
    removeOptions = (key) => {
        const { options } = this.state;
        delete options[key];
        var i = 0;
        var resetOptions = [];
        options.filter((el, key) => resetOptions[i++] = el);
        this.setState({
            options : resetOptions
        });
    }
    componentDidMount () {
        Queries.categories_list().then(
            result => {
                this.setState({
                    categories_list: result.Data
                });
            }
        )
    }
    render() {
        const { queryImageFile, options, errors, showCategoryErrorModal, ChartOption, EndDate, IsPublic, Category } = this.state;
        const alphabetArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        return(
            <section className="query-banner-img">
                <div className="container">
                    <div className="query-inner d-flex">
                        <SideMenu />
                        <div className="right-container">
                            <div className="blue-strip">
                                <h1 className="page-title">Query Of The Day</h1>
                            </div>
                            <div className="right-container-inner">
                                <form className="">
                                    <div className="profile-info">
                                        <span className="profile-img ng-star-inserted" style={{backgroundImage: 'url("'+User.UserImage+'")'}}></span>
                                        <span className="general-title">{User.userDetails.FirstName} {User.userDetails.LastName}</span>
                                    </div>
                                    <div className="select-query-type-block">
                                        <div className="upload-img-box">
                                            <div className="text-area-field">
                                                {queryImageFile != '' &&
                                                    <div className="file-upload-blk">
                                                        <img alt="smile" src={URL.createObjectURL(queryImageFile)} />
                                                        <div className="remove-selected-file" onClick={this.removeQueryImage}>
                                                            <span>X</span>
                                                        </div>
                                                    </div>
                                                }
                                                <div className={(errors.query != null && errors.query.length > 0 && "cross-validation-error") + " browse-img"}>
                                                    <input id="QueryFile" type="file" onChange={this.changeQueryImage} />
                                                    <label><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/file.svg"} /></label>
                                                </div>
                                                <textarea placeholder="Write your query here..." formcontrolname="query" name="query" className="full-height" defaultValue={this.state.query} onChange={this.handleChange}></textarea>
                                            </div>
                                        </div>
                                        {(errors.query != null && errors.query.length > 0) && <span className='validation-msg'>{errors.query}</span>}
                                    </div>
                                    <div className="select-query-type-block">
                                        <div className="select-option-title">Add Options</div>
                                        <div className="option-textarea">
                                            {options != '' && options.map((option, key) => ( (key < 6) &&
                                            <div key={key} className="option-textarea-inner">
                                                <div className="text-area-field">
                                                    {(option.optionImage && option.optionImage.length > 0) &&
                                                        <div className="opt-upload-file">
                                                            <img alt="smile" src={URL.createObjectURL(option.optionImage[0])} />
                                                            <div className="remove-selected-file" onClick={() => this.removeOptionsImage(key)}>
                                                                <span>X</span>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className={(errors.options[key] != null && errors.options[key].length > 0 && "cross-validation-error") + " browse-img"} >
                                                        <input id="OptionOneFile" type="file" name={key} onChange={this.changeOptionInfo} />
                                                        <label><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/file.svg"} /></label>
                                                    </div>
                                                    <textarea placeholder={'Option '+alphabetArr[key]+'.'} name={key} className="full-height"  defaultValue={options.value} onChange={this.changeOptionInfo}></textarea>
                                                    {key > 1 && 
                                                        <div className="detete-opt" onClick={() => this.removeOptions(key)}>
                                                            <span className="delete">X</span>
                                                        </div>
                                                    }
                                                </div>
                                                {(errors.options[key] != null && errors.options[key].length > 0) && <span className='validation-msg'>{ 'Option ' + alphabetArr[key] } { errors.options[key] }</span>}
                                            </div>
                                            ))}
                                            {options.length < 6 && 
                                                <div className="option-textarea-inner add-options ng-star-inserted"><button type="button" onClick={this.addMoreOption}><span>+</span><span>Add More Options</span></button></div>
                                            }
                                        </div>
                                    </div>
                                    <div className="chart-type">
                                        <div className="section-title">Representation of your Result</div>
                                        <div className="custom-select-box">
                                            <div className="select-box-inner">
                                                <input id="pieChart" formcontrolname="ChartOption" name="ChartOption" type="radio" value="2" className="ChartOption" onChange={this.handleChange} defaultChecked/>
                                                <label htmlFor="pieChart">
                                                    <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/pie-chart.png"} />
                                                    <span>Pie Chart</span>
                                                </label>
                                            </div>
                                            <div className="select-box-inner">
                                                <input id="barChart" formcontrolname="ChartOption" name="ChartOption" type="radio" value="1" className="ChartOption" onChange={this.handleChange} />
                                                <label htmlFor="barChart">
                                                    <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/bar-chart.jpg"} />
                                                    <span>Bar Chart</span>
                                                </label>
                                            </div>
                                            <div className="select-box-inner">
                                                <input id="lineChart" formcontrolname="ChartOption" name="ChartOption" type="radio" value="3" className="ChartOption" onChange={this.handleChange} />
                                                <label htmlFor="lineChart">
                                                    <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/lin-chart.jpg"} />
                                                    <span>Line Chart</span>
                                                </label>
                                            </div>
                                            <div className="select-box-inner">
                                                <input id="donutChart" formcontrolname="ChartOption" name="ChartOption" type="radio" value="4" className="ChartOption" onChange={this.handleChange} />
                                                <label htmlFor="donutChart">
                                                    <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/donut-chart.png"} />
                                                    <span>Donut Chart</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ask-query">
                                        <div className="ask-query-inner flex-box">
                                            <h2 className="section-title">Share your query with</h2>
                                            <div className="query-type-radio">
                                                <span className="public"><input type="radio" name="IsPublic" formcontrolname="isPublic" value={true} className="isPublic" onChange={this.handleChange} defaultChecked/>
                                                    <label htmlFor="public"><i aria-hidden="true" className="fa fa-users"></i> Public </label>
                                                </span>
                                                <span className="private"><input type="radio" name="IsPublic" formcontrolname="isPublic" value={false} className="isPublic" onChange={this.handleChange} />
                                                    <label htmlFor="private"><i aria-hidden="true" className="fa fa-user"></i> Private </label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="query-end-time">
                                        <div className="query-end-inner flex-box">
                                            <h2 className="section-title">Query End Time</h2>
                                            <div className="form-group">
                                                <div className="input-group date select-date choose-calendar-picker">
                                                    {/* <span className="input-group-addon"> */}
                                                        <Datetime dateFormat="DD/MM/YYYY" initialValue={EndDate} />
                                                    {/* </span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="select-category" className="select-category">
                                        <h2 className="section-title">Select Categories</h2>
                                        <div className="five-grid">
                                            <AllCategories categoriesList={this.state.categories_list} selectCategories={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="submit-btn">
                                        <button type="submit" onClick={this.handleChange} name="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="swal2-container swal2-center swal2-backdrop-show" style={{overflowY: "auto", display : showCategoryErrorModal}}>
                    <div aria-labelledby="swal2-title" aria-describedby="swal2-content" className="swal2-popup swal2-modal swal2-icon-info swal2-show" tabindex="-1" role="dialog" aria-live="assertive" aria-modal="true" style={{display: "flex"}}>
                        <div className="swal2-header">
                            <ul className="swal2-progress-steps" style={{display: "none"}}></ul>
                            <div className="swal2-icon swal2-error" style={{display: "none"}}></div>
                            <div className="swal2-icon swal2-question" style={{display: "none"}}></div>
                            <div className="swal2-icon swal2-warning" style={{display: "none"}}></div>
                            <div className="swal2-icon swal2-info swal2-icon-show" style={{display: "flex"}}>
                                <div className="swal2-icon-content">i</div>
                            </div>
                            <div className="swal2-icon swal2-success" style={{display: "none"}}></div>
                            <img className="swal2-image" style={{display: "none"}} />
                            <h2 className="swal2-title" id="swal2-title" style={{display: "flex"}}>Whoops..</h2>
                            <button type="button" className="swal2-close" aria-label="Close this dialog" style={{display: "none"}}>×</button>
                        </div>
                        <div className="swal2-content">
                            <div id="swal2-content" className="swal2-html-container" style={{display: "block"}}>Please select Category for your QUERY!</div>
                        </div>
                        <div className="swal2-actions">
                            <div className="swal2-loader"></div>
                            <button type="button" className="swal2-confirm swal2-styled" aria-label="" style={{display: "inline-block", borderLeftColor: "rgb(48, 133, 214)", borderRightColor: "rgb(48, 133, 214)"}} onClick={() => this.setState({ showCategoryErrorModal : 'none' })}>OK</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
