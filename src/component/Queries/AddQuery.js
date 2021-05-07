import React from 'react';
import * as Queries from './../../services/Queries';
import * as User from '../User/UserDetails';
import SideMenu from './SideMenu';
import Datetime from 'react-datetime';
import Categories from './Categories';
import "react-datetime/css/react-datetime.css";

export default class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            queryImageUrl : '',
            options : [
                {
                    value : '',
                    optionImage : ''
                },
                {
                    value : '',
                    optionImage : ''
                }
            ]
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
            queryImageUrl: URL.createObjectURL(event.target.files[0])
        });
    }
    removeOptionsImage = (optionId) => {
        const { queryImageUrl, options } = this.state;
        delete options[optionId].optionImage;
        
        this.setState({
            options : options
        });
    }
    removeQueryImage = () => {
        this.setState({
            queryImageUrl: ''
        });
    }
    changeOptionInfo = (event) => {
        event.preventDefault();
        const { options } = this.state;
        const { defaultValue, type, name, id, value, files } = event.target;

        if (type == 'file') {
            options[name]['optionImage'] = files;            
        } else {
            options[name]['value'] = value;
        }
        this.setState({
            options : options
        });   
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
    render() {
        const { queryImageUrl, options } = this.state;
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
                                <form noValidate="" className="ng-untouched ng-pristine ng-invalid">
                                    <div className="profile-info">
                                        <span className="profile-img ng-star-inserted" style={{backgroundImage: 'url("'+User.UserImage+'")'}}></span>
                                        <span className="general-title">{User.userDetails.FirstName} {User.userDetails.LastName}</span>
                                    </div>
                                    <div className="select-query-type-block">
                                        <div className="upload-img-box">
                                            <div className="text-area-field">
                                                {queryImageUrl != '' &&
                                                    <div className="file-upload-blk">
                                                        <img alt="smile" src={queryImageUrl} />
                                                        <div className="remove-selected-file" onClick={this.removeQueryImage}>
                                                            <span>X</span>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="browse-img ng-star-inserted">
                                                    <input id="QueryFile" type="file" onChange={this.changeQueryImage} />
                                                    <label><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/file.svg"} /></label>
                                                </div>
                                                <textarea placeholder="Write your query here..." formcontrolname="query" className="full-height"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="select-query-type-block">
                                        <div className="select-option-title">Add Options</div>
                                        <div className="option-textarea">
                                            {options != '' && options.map((option, key) => ( (key < 6) &&
                                            <div key={key} className="option-textarea-inner">
                                                <div className="text-area-field">
                                                    {(option.optionImage && option.optionImage.length > 0) &&
                                                        <div className="opt-upload-file">
                                                            <img alt="smile" src={URL.createObjectURL(option.optionImage[0][0])} />
                                                            <div className="remove-selected-file" onClick={() => this.removeOptionsImage(key)}>
                                                                <span>X</span>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="browse-img ng-star-inserted">
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
                                                <input id="pieChart" formcontrolname="chartType" type="radio" value="2" className="ng-untouched ng-pristine ng-valid" />
                                                <label htmlFor="pieChart">
                                                    <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/pie-chart.png"} />
                                                    <span>Pie Chart</span>
                                                </label>
                                            </div>
                                            <div className="select-box-inner">
                                                <input id="barChart" formcontrolname="chartType" type="radio" value="1" className="ng-untouched ng-pristine ng-valid" />
                                                <label htmlFor="barChart">
                                                    <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/bar-chart.jpg"} />
                                                    <span>Bar Chart</span>
                                                </label>
                                            </div>
                                            <div className="select-box-inner">
                                                <input id="lineChart" formcontrolname="chartType" type="radio" value="3" className="ng-untouched ng-pristine ng-valid" />
                                                <label htmlFor="lineChart">
                                                    <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/lin-chart.jpg"} />
                                                    <span>Line Chart</span>
                                                </label>
                                            </div>
                                            <div className="select-box-inner">
                                                <input id="donutChart" formcontrolname="chartType" type="radio" value="4" className="ng-untouched ng-pristine ng-valid" />
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
                                                <span className="public"><input type="radio" formcontrolname="isPublic" value="true" className="ng-untouched ng-pristine ng-valid" />
                                                    <label htmlFor="public"><i aria-hidden="true" className="fa fa-users"></i> Public </label>
                                                </span>
                                                <span className="private"><input type="radio" formcontrolname="isPublic" value="false" className="ng-untouched ng-pristine ng-valid" />
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
                                                        <Datetime dateFormat="DD/MM/YYYY" value={new Date()} onChange={() => this.changeDate} />
                                                    {/* </span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="select-category" className="select-category">
                                        <h2 className="section-title">Select Categories</h2>
                                        <div className="category-cover ng-star-inserted">
                                            <div className="category-list ng-star-inserted" style={{backgroundImage: 'url(&quot;https://voteme-development-categories.s3.ap-south-1.amazonaws.com/thumbnailInnovations.jpg&quot;)'}}>
                                                <input type="checkbox" value="5e96ad1c5a89d0699c839fbe" className="ng-star-inserted" /><label><span>Category One</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="submit-btn">
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
