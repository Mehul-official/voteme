import React from 'react';
import * as User from '../User/UserDetails';
import * as Queries from '../../services/Queries';
import like_outline_icon from '../../assets/images/like_outline-icon.svg';
import like_fill_icon from '../../assets/images/like_fill-icon.svg';
import replay_arrow from  '../../assets/images/replay-arrow.png';
import view_reply_hover from  '../../assets/images/view-reply-hover.svg';
import user_placeholder from '../../assets/images/user-placeholder-img.jpg';
import more_option from '../../assets/images/more.png';

import { ErrorModal } from '../common/Modal';

const Eventsemit = require('../Eventsemitor');
const eventsemit = new Eventsemit();

const userDetails = User.userDetails;
const user_id = userDetails._id;

export default class Comment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoaded : false,
            queryId : props.queryId,
            commentList : '',
            replyList : '',
            Page : 1,
            Rows : 30,
            comment : '',
            showCommentReplys: [],
            likesOfComments : [],
            reply : '',
            replyToComment : '',
            modalOpen : false,
            errorModalLabel : '',
            errors : {
                comment : ''
            }
        }
    }

    getComments = (params = '') => {
        const { queryId, likesOfComments } = this.state;
        
        var queryParams = {
            Rows : this.state.Rows,
            PageNo : this.state.Page,
        };

        if (params.PageNo && params.PageNo !== '') {
            queryParams.PageNo = params.PageNo;
        }
        var queryParams = Object.keys(queryParams).reduce(function(a,k){a.push(k+'='+encodeURIComponent(queryParams[k]));return a},[]).join('&');
        Queries.get_comments(queryId,queryParams).then(
            result => {
                if (result.Status === "Success") {

                    let commentList = (result.Data.length && result.Data[0].Records.length) ? result.Data[0].Records.slice(0, 1)[0].replay : '';
                    let replyList = (result.Data.length && result.Data[0].Records[1]) ? result.Data[0].Records.slice(1, result.Data[0].Records.length) : '';
                    
                    commentList.length > 0 && commentList.map(comment => {
                        comment.Like === true && likesOfComments.push(comment._id); 
                        replyList.map(reply => {
                            if (reply._id === comment._id) {
                                comment.reply = reply.replay;
                                reply.replay.map(rep => {
                                    rep.Like === true && likesOfComments.push(rep._id);
                                });
                            };
                        });
                    });

                    this.setState({
                        isLoaded : true,
                        reply : '',
                        comment : '',
                        likesOfComments : likesOfComments,
                        commentList : commentList,
                        replyList : replyList,
                    });
                }
            }
        )
    }

    viewReply = (id = '') => {
        if (id !== '') {
            this.setState({
                showCommentReplys : [...this.state.showCommentReplys, id]
            })            
        } else {
            this.props.errorFun({errorModalLabel : 'No REPLIES are there for this COMMENT!'});
        }
    }

    handleReplyToComment = (id) => {
        this.setState({
            replyToComment : id
        })
    }

    handleChange = (event) => {
        const { name, value, type } = event.target;
        const { errors } = this.state;
        if (value.trim() === '') {
            errors[name] = name +' is required*';
        } else {
            errors[name] = '';
        }
        this.setState({
            [name]: value,
            errors : errors
        });
    }

    submitComment = () => {
        const { errors, comment, queryId } = this.state;
        if (comment.trim() === '') {
            errors.comment = 'Comment is required*';
            this.setState({
                errors : errors
            });
            
        } else {
            const postArr = {
                "Comment" : comment,
                "CommentedBy" : user_id
            }
            Queries.give_comment(queryId,postArr).then(
                result => {
                    if (result.Status === "Success") {
                        this.props.successFun({successModalLabel : 'Comment Applied !'});
                        eventsemit.replied_comment();
                    } else {
                        this.props.errorFun({errorModalLabel : result.Error.Message});
                    }
                }
            )
        }
    }

    actionButton = (_id, action) => {
        const { queryId } = this.state;
        action = action === 'like' ? true : false;

        Queries.comment_likeordislike({
            "Like" : action,
            "LikedBy" : user_id
        }, queryId, _id).then(
            result => {
                this.getComments();
            }
        )
    }

    submitReply = (commentId) => {
        const { reply, queryId } = this.state;
        if (reply.trim() !== '') {
            const postArr = {
                "Comment" : reply,
                "CommentedBy" : user_id
            }
            Queries.give_comments_reply(queryId, commentId, postArr).then(
                result => {
                    if (result.Status === "Success") {
                        this.props.successFun({successModalLabel : 'Reply Successfully !'});
                        eventsemit.replied_comment();
                    } else {
                        this.props.errorFun({errorModalLabel : result.Error.Message});
                    }
                }
            )
        }
    }

    componentDidMount() {
        this.getComments();
    }

    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    }

    render() {
        
        eventsemit.on('replied_comment', () => this.getComments());

        const { isLoaded, commentList, replyList, comment, replyToComment, errors, showCommentReplys, modalOpen, errorModalLabel, reply, likesOfComments } = this.state;
        let reply_arr = '';
        if (isLoaded === false) {
            return(<div>Loading...</div>);
        } 
        return(
            <div>
                <div className="coment-section">
                    <div className="comment-section-inner flex-box">
                        <div className="comment-user-img" style={{backgroundImage: "url('"+userDetails.Image+"')"}}></div>
                        <div className="comment-field flex-box">
                            <input id="comment" name="comment" type="text" placeholder="write your comment here..." defaultValue={comment} onChange={this.handleChange} />
                            <div className="flex-box comment-option">
                                <button type="button" className="post-comment-btn" onClick={this.submitComment}><i aria-hidden="true" className="fa fa-paper-plane"></i> Add Comment</button>
                            </div>
                        </div>
                    </div>
                    {(errors.comment !== '') && <div className="errorBox"><span className='validation-msg'>{errors.comment}</span></div>}
                </div>
                <div className="comments-list">
                    <div className="comments-list-inner">
                        {commentList && commentList.map((comment, key) => (
                            <div key={key}>
                                <div className="queryItem"> 
                                    <div className="query-head d-flex">
                                        <span className="profile-img" style={{backgroundImage: (comment.UserDetails[0].Image && comment.UserDetails[0].Image) ? "url('"+comment.UserDetails[0].Image+"')" : "url('"+user_placeholder+"')"}}></span>
                                        <div className="about-query-info">
                                            <div className="small-title">{comment.UserDetails[0].FirstName} {comment.UserDetails[0].LastName} </div>
                                            <div className="query-shared-by">{comment.Comment}</div>
                                            <div className="reply-comment-box comment-field flex-box" style={{display: (replyToComment === comment._id) ? 'flex' : 'none' }} id={"replybox_"+comment._id}>
                                                <input type="text" placeholder="Reply comment..." id={"replyTextBox_"+comment._id} name="reply" defaultValue={reply} onChange={this.handleChange}/>
                                                <div className="flex-box comment-option">
                                                    <button type="button" className="post-comment-btn" onClick={() => this.submitReply(comment._id)} name="submit"><i aria-hidden="true" className="fa fa-paper-plane"></i> Reply</button>
                                                </div>
                                            </div>
                                            <div className="comment-cta flex-box">
                                                <div className={"comment-react flex-box " + (comment.Like && "icon-fill") } id={"comment"+comment._id} onClick={() => this.actionButton(comment._id, comment.Like ? 'dislike' : 'like')}>
                                                    <img src={like_outline_icon} className="outline-icon" />
                                                    <img src={like_fill_icon} className="fill-icon" />
                                                    <span className="likes">{comment.Likes.length} </span>
                                                </div>
                                                    
                                                <div className="comment-react flex-box">
                                                    <span><img src={replay_arrow} /></span>
                                                    <span className="mobile-d-none" onClick={() => this.handleReplyToComment(comment._id)}> Reply</span>
                                                </div>
                                                <div className="comment-react flex-box">
                                                    <span>
                                                        <span><img src={view_reply_hover} /></span>
                                                        <span className="mobile-d-none" onClick={() => this.viewReply(comment.reply ? comment._id : '')}>View Replies</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {(showCommentReplys.includes(comment._id) && comment.reply && comment.reply.length) && 
                                    <div className="query_item_reply">
                                        {comment.reply.map((reply, key) => (
                                            <div className="queryItem" key={key}>
                                                <div className="comments-list-inner replay-comment ng-star-inserted">
                                                    <div className="query-head d-flex ng-star-inserted" style={{marginBottom: '0px'}}>
                                                        <span className="profile-img" style={{backgroundImage: (reply.UserDetails[0].Image && reply.UserDetails[0].Image) ? "url('"+reply.UserDetails[0].Image+"')" : "url('"+user_placeholder+"')"}}></span>
                                                        <div className="about-query-info">
                                                            <div className="small-title">{reply.UserDetails[0].FirstName} {reply.UserDetails[0].LastName}</div>
                                                            <div className="query-shared-by">{reply.Comment}</div>
                                                            <div className="comment-cta flex-box">
                                                                <div className={"comment-react flex-box " + (reply.Like && "icon-fill")} onClick={() => this.actionButton(reply._id, reply.Like ? 'dislike' : 'like')}>
                                                                    <img src={like_outline_icon} className="outline-icon" />
                                                                    <img src={like_fill_icon} className="fill-icon" />
                                                                    <span className="likes">{reply.Likes.length}</span>
                                                                </div>
                                                                <div className="comment-react flex-box delete-comment">
                                                                    <span><img src={more_option} /></span>
                                                                    <div className="report-pop">
                                                                        <a>Delete</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

