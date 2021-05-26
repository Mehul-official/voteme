import React from 'react';
import * as Queries from '../../services/Queries';
import * as User from '../User/UserDetails';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';

export default class QueryDetail extends React.Component {
    
    constructor(props = '') {
        super();
        this.state = {
            Query : ''
        }
    }
    render() {
        const { Query } = this.state;
        return(
            <section className="query-banner-img">
                <div className="container">
                    <div className="query-inner d-flex">
                        <SideMenu />
                        <div className="my-queries query-details-page">
                            <div className="back_button">
                                <Link to="/queries"><i class="fa fa-chevron-left"></i>Back</Link>
                            </div>
                            <div className="query-info-box">
                                <div className="query-head flex-box ">
                                    <span className="profile-img " style={{backgroundImage : (Query.UserDetails && Query.UserDetails[0].Image) ? "url('"+Query.UserDetails[0].Image+"')": ''}}></span>
                                    <div className="about-query-info">
                                        <div className="small-title">{Query.UserDetails[0].FirstName} {Query.UserDetails[0].LastName} </div>
                                        <div className="query-shared-by">
                                        {Query.Category.slice(0, 2).length > 0 && Query.Category.slice(0, 2).map((Category, key) => (
                                            <span key={key} className="">
                                                <span className=""> {Category},  </span>
                                            </span>
                                        ))}

                                        {Query.Category.slice(2).length > 0 && 
                                            <span className="">
                                                <span className="cat-view-more " style={{color: 'dodgerblue', cursor: 'pointer'}}>
                                                    <span style={{display: 'none'}} id={'hide'+Query._id}>Hide!</span>
                                                    <span id={'view'+Query._id} onClick={() => this.toggleCatList(Query._id)}>View More!</span>
                                                    <span className="category-dropdown" style={{display: this.state.listCategoryShow !== '' && this.state.listCategoryShow === Query._id ? 'block' : 'none'}} id={Query._id}>
                                                        {Query.Category.slice(2).map((Category, key) => (
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
                                        <div class="query-img-block">
                                            <img style={{cursor: "pointer"}} src="" />
                                        </div>
                                    </div>
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
                                                        <img src="assets/images/search-plus.svg" style={{cursor: "pointer"}} />
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
                                                    <p-galleria style="opacity: 1;">
                                                    <div className=""></div>
                                                    </p-galleria>
                                                </div>
                                            </div>
                                            <div className="select-box-inner select-text">
                                                <div className="select-box-main">
                                                    <div className="d-flex q-desc-with-img">
                                                    <span className="query-dec-text">
                                                        Opt B
                                                    </span>
                                                    <div className="click-to-vote-btn">
                                                        <img src="assets/images/search-plus.svg" style={{cursor: "pointer"}} />
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
                                                    <p-galleria style="opacity: 1;">
                                                    <div className=""></div>
                                                    </p-galleria>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}