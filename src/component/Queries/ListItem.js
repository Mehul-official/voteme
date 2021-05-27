import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as User from '../User/UserDetails';
import QueryItem from './QueryItem';

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
            Page : this.state.Page
        }));
        if (this.state.end === this.props.QueriesList.length) {
            this.props.PageNo({PageNo:this.state.Page+1})
        }
    }
    componentDidMount() {
        this.setState({
            TotalRecords : this.props.QueriesList.length,
            QueriesList : this.props.QueriesList.slice(0, 10),
        });
    }
    toggleCatList = (_id) => {
        if (this.state.listCategoryShow === _id) {
            this.setState({ listCategoryShow: '' });
        } else {
            this.setState({ listCategoryShow: _id });
        }
    }
    
    render() {
        const { Page, TotalRecords, QueriesList } = this.state;
        return(
            <div className="" id="querylist">
                <InfiniteScroll
                dataLength={this.state.QueriesList.length}
                next={this.fetchMoreData}
                refreshFunction={this.fetchMoreData}
                hasMore={(this.state.end < this.props.TotalRecords) ? true : false}
                scrollableTarget="scrollableDiv"
                loader={<h4>Loading...</h4>}
                >
                    {QueriesList !== '' && QueriesList.map((Query, key) => (
                        <QueryItem key={key} Query={Query} userId={user_id} component={(this.props.component && this.props.component !== '') && this.props.component}/>
                    ))}
                </InfiniteScroll>
            </div>
        )
    }
}