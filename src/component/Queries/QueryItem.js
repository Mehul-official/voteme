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
import Comment from './Comments';
import { ConfirmModal, SuccessModal, ErrorModal } from '../common/Modal';
import user_placeholder from '../../assets/images/user-placeholder-img.jpg';


const userDetails = User.userDetails;
const user_id = userDetails._id;

const numberWordsArr = {
    '0' : 'One',
    '1' : 'Two',
    '2' : 'Three',
    '3' : 'Four',
    '4' : 'Five',
    '5' : 'Six',
};

export default class QueryItem extends React.Component {
    constructor(props) {
        super();
        this.state = {
            Query : props.Query,
            showConfirmation : false,
            showSuccessModal : false,
            showErrorModal : false,
            queryId : props.queryId,
            modalOpen : false,
            successModalLabel : '',
            errorModalLabel : '',
            optionAnswer : '',
            addOptionId : '',
            commentTextBox : '',
            listCategoryShow : '',
            errors : {
                commentTextBox : ''
            }
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
    voteOptionHandle = (optionId, optionAnswer) => {
        this.setState({
            optionAnswer : optionAnswer,
            addOptionId : optionId,
            showConfirmation : true,
            showErrorModal : false,
            showSuccessModal : false,
            modalOpen : true,
        });
    }
    showSuccess = (arr = '') => {
        this.setState({
            showConfirmation : false,
            showErrorModal : false,
            showSuccessModal : true,
            modalOpen : true,
            successModalLabel : arr.successModalLabel !== '' ? arr.successModalLabel : ''
        });
    }
    showError = (arr = '') => {
        this.setState({
            showConfirmation : false,
            showSuccessModal : false,
            showErrorModal : true,
            modalOpen : true,
            errorModalLabel : arr.errorModalLabel !== '' ? arr.errorModalLabel : ''
        });
    }
    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    }
    addVoteOption = () => {
        const { addOptionId, queryId, optionAnswer } = this.state;
        let postArr = {
            UserID : user_id,
            QueryId : queryId,
            OptionId : addOptionId
        };
        Queries.give_vote(postArr).then(
            result => {
                if (result.Status === "Success") {
                    this.showSuccess({successModalLabel : 'Query Created Successfully!'});
                } else {
                    this.showError({successModalLabel : result.Error.Message});
                }
            }
        )
    }
    toggleCatList = (_id) => {
        if (this.state.listCategoryShow === _id) {
            this.setState({ listCategoryShow: '' });
        } else {
            this.setState({ listCategoryShow: _id });
        }
    }

    render() {
        const { commentTextBox, Query, errors, addOptionId, queryId, optionAnswer, modalOpen, showConfirmation, showSuccessModal, showErrorModal, successModalLabel, errorModalLabel } = this.state;
        let userDetail = (Array.isArray(Query.UserDetails) === true) ? Query.UserDetails[0] : Query.UserDetails;
        let Category, Options = '';
        
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
                    <span className="profile-img " style={{backgroundImage : (userDetail && userDetail.Image) ? "url('"+userDetail.Image+"')": "url('"+user_placeholder+"')"}}></span>
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
                        {(this.props.component === "query-detail") ?
                            <h2 className="small-title"><a style={{cursor: 'pointer'}}>{Query.Query}</a></h2>
                        :    <h2 className="small-title"><Link style={{cursor: 'pointer'}} to={'/query-detail/'+Query._id}>{Query.Query}</Link></h2>
                        }
                    </div>
                    {(this.props.component === "query-detail") ? 
                        <div className="query-chart">
                            <div className="voting-chart-cover">
                                <div className="custom-select-box voting-box-show">
                                    {Options !== '' && Options.map((option, key) => (
                                        <div className="select-box-inner select-text" key={key}>
                                            <div className={option.IsOptionVoted ? 'select-box-main voted' : 'select-box-main' }>
                                                {Query.IsVoted === true && <div className="vote-count-box">{option.VotedBy.length} Vote</div> }
                                                <div className="d-flex q-desc-with-img">
                                                    {(option['Option'+numberWordsArr[key]+'ThumbnailURL'] && option['Option'+numberWordsArr[key]+'ThumbnailURL'] !== '') &&
                                                        <span className="qry-opt">
                                                            <img src={option['Option'+numberWordsArr[key]+'ThumbnailURL']} />
                                                        </span>
                                                    }
                                                    {(option.Answer && option.Answer !== '') &&
                                                        <span className="query-dec-text"> {option.Answer} </span>
                                                    }
                                                    <div className="click-to-vote-btn">
                                                        <img src={search_plus} style={{cursor: "pointer"}} />
                                                        {(Query.IsEnded === false && Query.Isvoted === false) && <a className="" onClick={() => this.voteOptionHandle(option._id, option.Answer)}>Click to Vote</a>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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

                
                    <div className="query-footer flex-box">
                        {(this.props.component !== "query-detail") &&
                                <div className="submit-btn ">
                                    <span className=""><button type="button" className="desabel-btn">VOTE ME</button></span>
                                </div>
                        }
                        
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
                </div>
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
               
                {(this.props.component === "query-detail") &&
                    <Comment queryId={queryId} successFun={this.showSuccess} errorFun={this.showError}/>
                }
                {showConfirmation === true &&
                    <ConfirmModal
                        Label={'Are you want to confirm vote for "'+optionAnswer+'" ? '}
                        handlerFun={this.addVoteOption}
                        modalOpen={modalOpen}
                        handlerCloseModal={this.closeModal}
                        yesOption={'Vote'}
                        noOption={'Cancel'}
                    ></ConfirmModal>
                }
                {showSuccessModal === true &&
                    <SuccessModal
                        Label={successModalLabel}
                        modalOpen={modalOpen}
                        handlerCloseModal={this.closeModal}
                        yesOption={'OK'}
                    ></SuccessModal>
                }
                {showErrorModal === true &&
                    <ErrorModal
                        Label={errorModalLabel}
                        handlerFun={this.addVoteOption}
                        modalOpen={modalOpen}
                        handlerCloseModal={this.closeModal}
                        yesOption={'OK'}
                    ></ErrorModal>
                }
            </div>
        )
    }
}