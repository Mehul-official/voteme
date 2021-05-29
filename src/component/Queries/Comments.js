import React from 'react';
import * as User from '../User/UserDetails';
import * as Queries from '../../services/Queries';
import like_outline_icon from '../../assets/images/like_outline-icon.svg';
import like_fill_icon from '../../assets/images/like_fill-icon.svg';
import replay_arrow from  '../../assets/images/replay-arrow.png';
import view_reply_hover from  '../../assets/images/view-reply-hover.svg';

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
            commentTextBox : '',
            errors : {
                commentTextBox : ''
            }
        }
    }

    getComments = (params = '') => {
        const { queryId } = this.state;

        var queryParams = {
            Rows : this.state.Rows,
            PageNo : this.state.Page,
        };

        if (params.PageNo && params.PageNo !== '') {
            queryParams.PageNo = params.PageNo;
        }
        console.log('test')
        var queryParams = Object.keys(queryParams).reduce(function(a,k){a.push(k+'='+encodeURIComponent(queryParams[k]));return a},[]).join('&');
        Queries.get_comments(queryId,queryParams).then(
            result => {
                if (result.Status === "Success") {
                    this.setState({
                        isLoaded : true,
                        commentList : (result.Data.length && result.Data[0].Records.length) ? result.Data[0].Records : '',
                    });
                }
            }
        )
    }

    handleChange = (event) => {
        const { name, value, type } = event.target;
        const { errors } = this.state;
        if (value.trim() === '') {
            errors.commentTextBox = 'Comment is required*';
        } else {
            errors.commentTextBox = '';
        }
        this.setState({
            [name]: value,
            errors : errors
        });
    }

    submitComment = () => {
        const { errors, commentTextBox, queryId } = this.state;
        if (commentTextBox.trim() === '') {
            errors.commentTextBox = 'Comment is required*';
         
            this.setState({
                errors : errors
            });
            
        } else {
            const postArr = {
                "Comment" : commentTextBox,
                "CommentedBy" : user_id
            }
            Queries.give_comment(queryId,postArr).then(
                result => {
                    if (result.Status === "Success") {
                        this.props.successFun({successModalLabel : 'Comment Applied !'});
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
    render() {
        const { isLoaded, commentList, commentTextBox, errors } = this.state;
        if (isLoaded === false) {
            return(<div>Loading...</div>);
        } 
        return(
            <div>
                <div className="coment-section">
                    <div className="comment-section-inner flex-box">
                        <div className="comment-user-img" style={{backgroundImage: "url('"+userDetails.Image+"')"}}></div>
                        <div className="comment-field flex-box">
                            <input id="commentTextBox" name="commentTextBox" type="text" placeholder="write your comment here..." defaultValue={commentTextBox} onChange={this.handleChange} />
                            <div className="flex-box comment-option">
                                <button type="button" className="post-comment-btn" onClick={this.submitComment}><i aria-hidden="true" className="fa fa-paper-plane"></i> Add Comment</button>
                            </div>
                        </div>
                    </div>
                    {(errors.commentTextBox !== '') && <div className="errorBox"><span className='validation-msg'>{errors.commentTextBox}</span></div>}
                </div>
                <div className="comments-list">
                    <div className="comments-list-inner">
                        {commentList[0].replay !== '' && commentList[0].replay.map((comment, key) => (
                            <div key={key}>
                                <div className="query-head d-flex">
                                    {comment.UserDetails[0].image && comment.UserDetails[0].image !== '' &&
                                        <span className="profile-img" style={{backgroundImage: "url('"+comment.UserDetails[0].image+"')"}}></span>
                                    }
                                    <div className="about-query-info">
                                        <div className="small-title">{comment.UserDetails[0].FirstName} {comment.UserDetails[0].LastName} </div>
                                        <div className="query-shared-by">{comment.Comment}</div>
                                        <div className="reply-comment-box comment-field flex-box" style={{display: "none"}} id={"replybox_"+comment._id}>
                                            <input type="text" placeholder="Reply comment..." id={"replyTextBox_"+comment._id} />
                                            <div className="flex-box comment-option">
                                                <button type="button" className="post-comment-btn"><i aria-hidden="true" className="fa fa-paper-plane"></i> Reply</button>
                                            </div>
                                        </div>
                                        <div className="comment-cta flex-box">
                                            <div className="comment-react flex-box" id={"comment"+comment.Comment._id}>
                                                <img src={like_outline_icon} className="outline-icon" />
                                                <img src={like_fill_icon} className="fill-icon" />
                                                <span className="likes">0</span>
                                            </div>
                                                
                                            <div className="comment-react flex-box">
                                                <span><img src={replay_arrow} /></span>
                                                <span className="mobile-d-none"> Reply</span>
                                            </div>
                                            <div className="comment-react flex-box">
                                                <span>
                                                    <span><img src={view_reply_hover} /></span>
                                                    <span className="mobile-d-none">View Replies</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

