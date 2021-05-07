import React from 'react';

export default class AboutUs extends React.Component {
    render() {
        return(
            <section id="about-us" className="about-sec">
                <div className="container">
                    <div className="center-heading">
                        <h2 className="main-heading">About Us</h2>
                        <div className="sub-heading">We are a startup and willing to help people who are looking to poll on what they have. They might have to show their talent, they might be confused about the selection of something, they might want to know a better option.</div>
                    </div>
                    <div className="about-content">
                        <div className="about-left">
                            <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/about-img.jpg"} />
                        </div>
                        <div className="about-right">
                            <div className="abt-disc">
                                <p>While we are running an IT company, we come up many times to do Vote for selection, So we might take manual opinions on it or we use some applications which provide default polling on their app. But this will not allow us many things which we want to ask for. I.e we want suggestions of picnic spots, with pics then we can not do it with any of the poll and we have to do it manually. Now to overcome this issue and have our all old polls at the same place we come up with an idea to start our own product VoteMe. While starting with VoteMe, we think a lot about the different issues which people have while asking in a poll. We have tried to provide all those solutions in our App. Right now this is the launch version and we are coming with more features on our future releases. You can stay updated by subscribing us to know which features are coming and under development with the release dates.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
