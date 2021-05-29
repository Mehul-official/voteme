import React from 'react';
import * as Queries from '../../services/Queries';
import * as User from '../User/UserDetails';
import SideMenu from './SideMenu';
import { Link, withRouter } from 'react-router-dom';
import QueryItem from './QueryItem';
const userDetails = User.userDetails;
const user_id = userDetails._id;

class QueryDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            IsLoaded : false,
            QueryId : '',
            Query : ''
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        Queries.get_query_by_id(id).then(
            result => {
                if (result.Status === "Success") {
                    this.setState({
                        QueryId : id,
                        Query : result.Data,
                        IsLoaded : true
                    })
                }
            }
        )
    }
    render() {
        const { Query, IsLoaded, QueryId } = this.state;
        
        if (!IsLoaded) {
            return(<div>'Loading.....'</div>);
        } else {
            return(
                <section className="query-banner-img">
                    <div className="container">
                        <div className="query-inner d-flex">
                            <SideMenu />
                            <div className="my-queries query-details-page">
                                <div className="back_button">
                                    <Link to="/queries"><i className="fa fa-chevron-left"></i>Back</Link>
                                </div>

                                <QueryItem Query={Query} userId={user_id} component={'query-detail'} queryId={QueryId}/>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

export default withRouter(QueryDetail);