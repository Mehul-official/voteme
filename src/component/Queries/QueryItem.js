import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';

import * as User from '../User/UserDetails';
import * as Queries from '../../services/Queries';

import uparrowoutline from '../../assets/images/up-arrow-outline.svg';
import uparrowfill from '../../assets/images/up-arrow-fill.svg';
import downarrowoutline from '../../assets/images/down-arrow-outline.svg';
import downarrowfill from '../../assets/images/down-arrow-fill.svg';
import speechbubbleoutline from '../../assets/images/speech-bubble-outline.svg';
import viewoutline from '../../assets/images/view-outline.svg';
import shareoutline from '../../assets/images/share-outline.svg';
import more from '../../assets/images/more.png';
import edit_btn from '../../assets/images/edit.svg'; 
import delete_btn from '../../assets/images/delete.svg';
import search_plus from '../../assets/images/search-plus.svg';

const userDetails = User.userDetails;
const user_id = userDetails._id;

export default class QueryItem extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Query : props.Query,
        }
    }
    actionButton = (_id, action) => {
        const { Query } = this.state;
      
        if (_id === Query._id) {
            if (action === 'like' && (Query.Like === null || Query.Like === false)) {
                if (Query.Like === false) {
                    Query.TotalDisLikes = Query.TotalDisLikes-1;
                }
                Query.Like = action = true;
                Query.TotalLikes = Query.TotalLikes+1;
            } else if (action === 'like' && Query.Like === true) {
                Query.Like = action = null;
                Query.TotalLikes = Query.TotalLikes-1;
            } else if (action === 'dislike' && (Query.Like === null || Query.Like === true)) {
                if (Query.Like === true) {
                    Query.TotalLikes = Query.TotalLikes-1;
                }
                Query.Like = action = false;
                Query.TotalDisLikes = Query.TotalDisLikes+1;
            } else if (action === 'dislike' && Query.Like === false) {
                Query.Like = action = null;
                Query.TotalDisLikes = Query.TotalDisLikes-1;
            }
        }

        this.setState({
            Query : Query,
        });
        Queries.likeordislike({
            "Like":action,
            "LikedBy":user_id
        }, Query._id).then(
            result => result
        )
    }
    render() {
        const { Query } = this.state;
        let userDetail = (Array.isArray(Query.UserDetails) === true) ? Query.UserDetails[0] : Query.UserDetails;
        let Category, Options = '';
        console.log(Query.Category);
        if (this.props.component === "query-detail") {
            Options = Query.Options;
            Category = Query.Category.map(Category => Category.CategoryName);
        } else {
            Options = Query.Options[0].Options;
            Category = Query.Category;
        }
        
        return(
            <div className="query-info-box ">
                <div className="query-head flex-box ">
                    <span className="profile-img " style={{backgroundImage : (userDetail && userDetail.Image) ? "url('"+userDetail.Image+"')": ''}}></span>
                    <div className="about-query-info">
                        <div className="small-title">{userDetail.FirstName} {userDetail.LastName} </div>
                        <div className="query-shared-by">
                            {Category.slice(0, 2).length > 0 && Category.slice(0, 2).map((Category, key) => (
                                
                                <span key={key} className="">
                                    <span className=""> {Category},  </span>
                                </span>
                            ))}

                            {Category.slice(2).length > 0 && 
                                <span className="">
                                    <span className="cat-view-more " style={{color: 'dodgerblue', cursor: 'pointer'}}>
                                        <span style={{display: 'none'}} id={'hide'+Query._id}>Hide!</span>
                                        <span id={'view'+Query._id} onClick={() => this.toggleCatList(Query._id)}>View More!</span>
                                        <span className="category-dropdown" style={{display: this.state.listCategoryShow !== '' && this.state.listCategoryShow === Query._id ? 'block' : 'none'}} id={Query._id}>
                                            {Category.slice(2).map((Category, key) => (
                                                <span key={key} className=""> {Category} </span>
                                            ))}
                                        </span>
                                    </span>
                                </span>
                            }
                        </div>
                    </div>
                </div>
                

                <div className="query-desc">
                    <div className="query-has-img d-flex">
                        {Query.ThumbnailURL !== '' &&
                            <div className="query-img-block">
                                <img style={{cursor: "pointer"}} src={Query.ThumbnailURL} />
                            </div>
                        }
                        <h2 className="small-title"><Link style={{cursor: 'pointer'}} to={'/query-detail/'+Query._id}>{Query.Query}</Link></h2>
                    </div>
                    {(this.props.component === "query-detail") ? 
                        <div className="query-chart">
                            <div className="voting-chart-cover">
                                <div className="chart-img"></div>
                            </div>
                            <div className="custom-select-box voting-box-show">
                                <div className="select-box-inner select-text">
                                    <div className="select-box-main">
                                        <div className="d-flex q-desc-with-img">
                                            <span className="query-dec-text">Opt A</span>
                                            <div className="click-to-vote-btn">
                                                <img src={search_plus} style={{cursor: "pointer"}} />
                                                <a className="">Click to Vote</a>
                                            </div>
                                        </div>
                                        <div className="category-popup query-details-popup">
                                            <div className="custom-model-main" id="confirmVote_60add71c6cc8e75879e7f357">
                                                <div className="vote-popup-box">
                                                    <div className="close-btn">×</div>
                                                    <div className="vote-popup-inner">
                                                        <span className=""></span>
                                                        <div className="vote-popup-desc">Are you want to confirm vote for <span>"Opt A" ?</span></div>
                                                        <div className="popup-btn-grp flex-box submit-btn">
                                                        <button type="button vote">Vote</button>
                                                        <button type="button" className="btn-cancel">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="select-box-inner select-text">
                                    <div className="select-box-main">
                                        <div className="d-flex q-desc-with-img">
                                        <span className="query-dec-text">
                                            Opt B
                                        </span>
                                        <div className="click-to-vote-btn">
                                            <img src={search_plus} style={{cursor: "pointer"}} />
                                            <a className="">Click to Vote</a>
                                        </div>
                                        </div>
                                        <div className="category-popup query-details-popup">
                                            <div className="custom-model-main" id="confirmVote_60add71c6cc8e75879e7f358">
                                                <div className="vote-popup-box">
                                                    <div className="close-btn">×</div>
                                                    <div className="vote-popup-inner">
                                                        <span className=""></span>
                                                        <div className="vote-popup-desc">Are you want to confirm vote for <span>"Opt B" ?</span></div>
                                                        <div className="popup-btn-grp flex-box submit-btn">
                                                        <button type="button vote">Vote</button>
                                                        <button type="button" className="btn-cancel">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    :
                        <ul className="query-options ">
                            {Options !== '' && Options.map((Ans, key) => (
                                <li key={key} className="">
                                    {Ans.Key}. {Ans.Answer}
                                    {this.props.userId === Query.UserId || Query.IsVoted === true ? <ProgressBar now={Ans.Percentage} srOnly /> : '' }
                                    <span>{this.props.userId === Query.UserId || Query.IsVoted === true ? Math.round(Ans.Percentage)+'%' : ''} </span>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
                
                <div className="query-footer flex-box">
                    <div className="submit-btn ">
                        <span className=""><button type="button" className="desabel-btn">VOTE ME</button></span>
                    </div>
                    
                    <div className="bottom-right-options" id={"query_"+Query._id}>
                        <span className="like " onClick={() => this.actionButton(Query._id,'like')}>
                            <img alt="smile" src={uparrowoutline} className="outline-icon" style={{display : Query.Like === null || Query.Like === false ? 'block' : 'none'}} />
                            <img alt="smile" src={uparrowfill} className="fill-icon" style={{display : Query.Like === true ? 'block' : 'none' }}/> {Query.Like} {Query.TotalLikes}
                        </span>
                        <span className="dislike " onClick={() => this.actionButton(Query._id,'dislike')}>
                            <img alt="smile" src={downarrowoutline} className="outline-icon" style={{display : Query.Like === null || Query.Like === true ? 'block' : 'none'}} /> 
                            <img alt="smile" src={downarrowfill} className="fill-icon" style={{display : Query.Like === false ? 'block' : 'none'}} /> {Query.TotalDisLikes}
                        </span>
                        <span className="comments">
                            <img alt="smile" src={speechbubbleoutline} />{Query.TotalComments}
                        </span>
                        <span className="viewers">
                            <img alt="smile" src={viewoutline} /> {Query.TotalViews}
                        </span>
                        <span className="share">
                            <img alt="smile" src={shareoutline} />
                        </span>
                        <span className="more-opt " id={"report_"+Query._id}>
                            <img alt="smile" src={more} />
                            <div className="report-pop"><a href="#">Report</a></div>
                        </span>
                    </div>
                </div>
                <span className="">
                    {Query.IsEnded === true ? <div className="poll-end-time poll-ended">Poll Ended</div> : <div className="poll-end-time">Poll End Time - {Query.EndDate}</div> }
                    <div className="right-vote-info ">{Query.TotalVotes} Vote</div>
                    {(this.props.component && this.props.component === 'MyQuery' && Query.IsEnded === false) && 
                        <div className="query-cta-btns">
                            <span className="edit ">
                                <Link className="edit-btn" to={'/edit-query/'+Query._id}><img src={edit_btn} alt="smile" /></Link>
                            </span>
                            <span className="delete ">
                                <img src={delete_btn} alt="smile" />
                            </span>
                        </div>
                    }
                </span>
            </div>
        )
    }
}