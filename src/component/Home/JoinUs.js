import React from 'react';

export default class JoinUs extends React.Component {
    render() {
        return(
            <section id="join-us" className="join-us" style={{backgroundImage:"url('"+process.env.REACT_APP_BASE_URL+"src/assets/images/join-us-banner.jpg')"}}>
                <div className="container d-flex">
                    <div className="join-us-left col-6">
                        <h2 className="main-heading">Join Us Today</h2>
                        <div className="sub-heading">What are you waiting for? Join on VoteMe today and explore your queries with the world. Also help others by giving your opinion. Discuss with them in the comment section if you have any doubts about the query.</div>
                        <div className="g-pay-btn">
                            <a href="/#" target="_blank"><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/g-pay-logo.png"} /></a>
                        </div>
                    </div>
                    <div className="join-us-right col-6 d-flex">
                        <div className="recent-queries col-6">
                            <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/recent-queries.jpg" } />
                            <div className="query-title">Recent Queries</div>
                        </div>
                        <div className="add-queries col-6">
                            <div className="query-title">Add Queries</div>
                            <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/add-queries.jpg"} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
