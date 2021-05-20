import React from 'react';
import { Link } from 'react-router-dom';
import SideMenu from './SideMenu';
import * as Queries from '../../services/Queries';
import * as User from '../User/UserDetails';
import ListItem from './ListItem';

const userDetails = User.userDetails;
const user_id = userDetails._id;

export default class List extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoaded : false,
            searchBy: 2,
            QueriesList : '',
            Page : '',
            TotalRecords : '',
        }
    }
    getMyItem = (params = '') => {
        var queryParams = {
            searchBy : this.state.searchBy
        };
        var queryParams = Object.keys(queryParams).reduce(function(a,k){a.push(k+'='+encodeURIComponent(queryParams[k]));return a},[]).join('&');
        Queries.get_my_query(queryParams).then(
            result => {
                if (result.Status === "Success") {
                    this.setState({
                        isLoaded : true,
                        QueriesList : result.Data[0].Records,
                        Page : (result.Data[0].Summary.length > 0 && result.Data[0].Summary[0].Page) ? result.Data[0].Summary[0].Page : 1,
                        TotalRecords : (result.Data[0].Summary.length > 0 && result.Data[0].Summary[0].TotalRecords) ? result.Data[0].Summary[0].TotalRecords : 0,
                    });
                }
            }
        )
    }
    componentDidMount() {
        this.getMyItem();
    }
    filterMyQuery = (event) => {
        this.setState({
            isLoaded : false,
            searchBy : event.target.id,
        }, () => this.getMyItem())
    }
    
    render() {
        const { QueriesList, isLoaded } = this.state;
        return(
            <section className="query-banner-img">
                <div className="container">
                    <div className="query-inner d-flex">
                        <SideMenu component={'myquery'}/>
                        <div className="my-queries">
                            <div className="query-tabing">
                                <div className="tab-listing">
                                    <ul className="tabbing-nav">
                                        <li className={this.state.searchBy == 2 && 'active-tab'}><Link onClick={this.filterMyQuery} id={2}>Recent Queries</Link></li>
                                        <li className={this.state.searchBy == 3 && 'active-tab'}><Link onClick={this.filterMyQuery} id={3}>Top 10 Queries</Link></li>
                                        <li className={this.state.searchBy == 4 && 'active-tab'}><Link onClick={this.filterMyQuery} id={4}>Popular Queries</Link></li>
                                        <li className={this.state.searchBy == 1 && 'active-tab'}><Link onClick={this.filterMyQuery} id={1}>All Queries</Link></li>
                                    </ul>
                                </div>
                                <div className="tabs-content-cover">
                                    <div className="tab-content">
                                        <div className="tab-content-list">
                                            {(!isLoaded) ? <div>Loading...</div> : <ListItem QueriesList={QueriesList} userId={user_id} PageNo={this.getMyItem}/>}
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
        