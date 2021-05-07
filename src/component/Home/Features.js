import React from 'react';

export default class Features extends React.Component {
    render() {
        return(
            <section id="features" className="feature-sec">
                <div className="container">
                    <div className="center-heading">
                        <h2 className="main-heading">Features</h2>
                        <div className="sub-heading">An Interactive and Powerful platform to get opinion from your family, friends or from any one around the world.</div>
                    </div>
                    <div className="features-inr">
                        <div className="feat-list">
                            <div className="f-icon"><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/program.svg"}/></div>
                            <h3 className="f-title">Collect Polls From Audience</h3>
                            <p>Collect polls, data and opinions from participants. Also Invite your family members, friends or anyone to vote on your query.</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/program.svg"} /></div>
                            <h3 className="f-title">Questions With Attachments</h3>
                            <p>Ask your question with image/video/audio and text</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/program.svg"} /></div>
                            <h3 className="f-title">Vote For Others</h3>
                            <p>Vote on numerous polls as you scroll through your feed.</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/program.svg"} /></div>
                            <h3 className="f-title">Search Polls</h3>
                            <p>Search for polls, and follow topics so you get content that you can relate most to.</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/program.svg"} /></div>
                            <h3 className="f-title">Options With Attachments</h3>
                            <p>You can provide your options in image/video/audio. Which helps to find out which one is best based on audience</p>
                        </div>
                        <div className="feat-list">
                            <div className="f-icon"><img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/program.svg"} /></div>
                            <h3 className="f-title">Share On Social Media</h3>
                            <p>Share your query result with your social media i.e facebook, twitter etc</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
