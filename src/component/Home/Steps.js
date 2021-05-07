import React from 'react';

export default class Steps extends React.Component {
    render() {
        return(
            <section id="how-it-works" className="how-it-works">
                <div className="center-heading">
                    <h2 className="main-heading">Ask Your Query With Few Steps</h2>
                    <div className="sub-heading">We make it easy to ask and get result on your query</div>
                </div>
                <div className="voteme-steps">
                    <div className="voteme-left center-text">
                        <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/que-cartoon.png"} />
                        <div className="left-disc">
                            <h2 className="app-info-title">Are you confused about your query?</h2>
                            <div className="sub-heading">Here's a solution for you.<br /> Put your query on VoteMe and Resolve your query.</div>
                        </div>
                    </div>
                    <div className="voteme-right">
                        <div className="steps-main left">
                            <div className="steps one">
                                <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/user-login.svg"} />
                                <span className="steps-title">One Click Sign in</span>
                            </div>
                            <div className="steps two">
                                <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/create-query.svg"} />
                                <span className="steps-title">Cretate your query<br /> (up to 6 answer)</span>
                            </div>
                        </div>
                        <div className="steps-main center">
                            <div className="steps three">
                                <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/set-time-limit.svg"} />
                                <span className="steps-title">Set time limit</span>
                            </div>
                            <div className="app-img">
                                <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/app-screen.jpg"} />
                            </div>
                        </div>
                        <div className="steps-main right">
                            <div className="steps four">
                                <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/invite-friends.svg"} />
                                <span className="steps-title">Invite friends and famliy<br /> to ask for vote</span>
                            </div>
                            <div className="steps five">
                                <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/get-result.svg"} />
                                <span className="steps-title">Get result as<br /> his query solution</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
