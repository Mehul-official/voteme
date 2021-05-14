import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Queries from '../../services/Queries';
import * as User from '../User/UserDetails';
import uparrowoutline from '../../assets/images/up-arrow-outline.svg';
import uparrowfill from '../../assets/images/up-arrow-fill.svg';
import downarrowoutline from '../../assets/images/down-arrow-outline.svg';
import downarrowfill from '../../assets/images/down-arrow-fill.svg';
import speechbubbleoutline from '../../assets/images/speech-bubble-outline.svg';
import viewoutline from '../../assets/images/view-outline.svg';
import shareoutline from '../../assets/images/share-outline.svg';
import more from '../../assets/images/more.png';
const userDetails = User.userDetails;
const user_id = userDetails._id;

export default class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            QueriesList : '',
            Page : 1,
            start : 10,
            end : 20,
            listCategoryShow : '',
            TotalRecords : ''
        }
    }
    fetchMoreData = () => {
        this.setState(prevState => ({
            QueriesList : [...prevState.QueriesList, ...this.props.QueriesList.slice(this.state.start, this.state.end)],
            start : this.state.start+10,
            end : this.state.end+10,
        }));
    }
    componentDidMount() {
        // setTimeout(() => {
            this.setState({
                TotalRecords : this.props.QueriesList.length,
                QueriesList : this.props.QueriesList.slice(0, 10),
            });
        // }, 1000);
    }
    toggleCatList = (_id) => {
        if (this.state.listCategoryShow === _id) {
            this.setState({ listCategoryShow: '' });
        } else {
            this.setState({ listCategoryShow: _id });
        }
    }
    actionButton = (_id, action) => {
        const { QueriesList } = this.state;
        QueriesList.map((Query) => {
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
        })
        this.setState({
            QueriesList : QueriesList,
        });
        Queries.likeordislike({
            "Like":action,
            "LikedBy":user_id
        }, _id).then(
            result => result
        )
    }
    render() {
        const { Page, TotalRecords, QueriesList } = this.state;
        console.log('state',this.state);
        return(
            <div className="ng-star-inserted" id="querylist">
                <InfiniteScroll
                dataLength={this.state.QueriesList.length}
                next={this.fetchMoreData}
                refreshFunction={this.fetchMoreData}
                hasMore={this.state.end < this.props.QueriesList.length && true}
                scrollableTarget="scrollableDiv"
                loader={<h4>Loading...</h4>}
                >
                    {QueriesList !== '' && QueriesList.map((Query, key) => (           
                        <div key={key} className="query-info-box ng-star-inserted">
                            <div className="query-head flex-box ng-star-inserted">
                                <span className="profile-img ng-star-inserted" style={{backgroundImage : (Query.UserDetails && Query.UserDetails[0].Image) ? "url('"+Query.UserDetails[0].Image+"')": ''}}></span>
                                <div className="about-query-info">
                                    <div className="small-title">{Query.UserDetails[0].FirstName} {Query.UserDetails[0].LastName} </div>
                                    <div className="query-shared-by">
                                    {Query.Category.slice(0, 2).length > 0 && Query.Category.slice(0, 2).map((Category, key) => (
                                        <span key={key} className="ng-star-inserted">
                                            <span className="ng-star-inserted"> {Category},  </span>
                                        </span>
                                    ))}

                                    {Query.Category.slice(2).length > 0 && 
                                        <span className="ng-star-inserted">
                                            <span className="cat-view-more ng-star-inserted" style={{color: 'dodgerblue', cursor: 'pointer'}}>
                                                <span style={{display: 'none'}} id={'hide'+Query._id}>Hide!</span>
                                                <span id={'view'+Query._id} onClick={() => this.toggleCatList(Query._id)}>View More!</span>
                                                <span className="category-dropdown" style={{display: this.state.listCategoryShow !== '' && this.state.listCategoryShow === Query._id ? 'block' : 'none'}} id={Query._id}>
                                                    {Query.Category.slice(2).map((Category, key) => (
                                                        <span key={key} className="ng-star-inserted"> {Category} </span>
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
                                    <h2 className="small-title"><a style={{cursor: 'pointer'}}>{Query.Query}</a></h2>
                                </div>
                                <ul className="query-options ng-star-inserted">
                                    {Query.Options[0].Options !== '' && Query.Options[0].Options.map((Ans, key) => (
                                        <li key={key} className="ng-star-inserted">
                                            {Ans.Key}. {Ans.Answer}
                                            {this.props.userId === Query.UserId || Query.IsVoted === true ? <ProgressBar now={Ans.Percentage} srOnly /> : '' }
                                            <span>{this.props.userId === Query.UserId || Query.IsVoted === true ? Math.round(Ans.Percentage)+'%' : ''} </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="query-footer flex-box">
                                <div className="submit-btn ng-star-inserted">
                                    <span className="ng-star-inserted"><button type="button" className="desabel-btn">VOTE ME</button></span>
                                </div>
                                
                                <div className="bottom-right-options" id={"query_"+Query._id}>
                                    <span className="like ng-star-inserted" onClick={() => this.actionButton(Query._id,'like')}>
                                        <img alt="smile" src={uparrowoutline} className="outline-icon" style={{display : Query.Like === null || Query.Like === false ? 'block' : 'none'}} />
                                        <img alt="smile" src={uparrowfill} className="fill-icon" style={{display : Query.Like === true ? 'block' : 'none' }}/> {Query.Like} {Query.TotalLikes}
                                    </span>
                                    <span className="dislike ng-star-inserted" onClick={() => this.actionButton(Query._id,'dislike')}>
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
                                    <span className="more-opt ng-star-inserted" id={"report_"+Query._id}>
                                        <img alt="smile" src={more} />
                                        <div className="report-pop"><a href="#">Report</a></div>
                                    </span>
                                </div>
                            </div>
                            <span className="ng-star-inserted">
                                {Query.IsEnded === false ? <div className="poll-end-time">Poll End Time - {Query.EndDate}</div> : <div className="poll-end-time poll-ended">Poll Ended</div> }
                                <div className="right-vote-info ng-star-inserted">{Query.TotalVotes} Vote</div>
                            </span>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        )
    }
}