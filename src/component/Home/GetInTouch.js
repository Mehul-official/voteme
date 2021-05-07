import React from 'react';

export default class GetInTouch extends React.Component {
    render() {
        return(
            <section id="get-in-touch" className="get-in-touch">
                <div className="container">
                    <div className="center-heading">
                        <h2 className="main-heading">Get In Touch With Us</h2>
                    </div>
                    <div className="contact-inr">
                        <div className="cd-disc col-6">
                            <div className="cd-inr add">
                                <strong>Address: </strong>
                                <span>D-703, Ganesh Meridian,<br /> Sarkhej – Gandhinagar Hwy,<br /> opp. Amiraj Farm,<br /> Sola, Ahmedabad,<br /> Gujarat 380060 </span>
                            </div>
                            <div className="cd-inr mail">
                                <strong>Email: </strong>
                                <span><a href="mailto:info@voteme.com">info@voteme.com</a></span>
                            </div>
                            <div className="cd-inr phn">
                                <strong>Phone: </strong>
                                <span><a href="tel:079-40396835">079-40396835</a></span>
                            </div>
                            <div className="c-map">
                                <img alt="smile" src={process.env.REACT_APP_BASE_URL+"src/assets/images/c-map-img.jpg"} />
                            </div>
                        </div>
                        <div className="c-form col-6">
                            <form>
                                <div className="form-field"><input className="form-control" type="text" placeholder="Your name" name="" /></div>
                                <div className="form-field"><input className="form-control" type="text" placeholder="Your email" name="" /></div>
                                <div className="form-field"><input className="form-control" type="text" placeholder="Your subject" name="" /></div>
                                <div className="form-field"><textarea className="form-control" placeholder="Your message"></textarea></div>
                                <div className="cta-btn"><input type="submit" className="btn-inr" name="" value="Submit" /></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
