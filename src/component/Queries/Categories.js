import React from 'react';
import * as Queries from './../../services/Queries';

const userDetails = (localStorage.userDetails) ? JSON.parse(localStorage.userDetails) : '';
let categories = userDetails != '' && userDetails.Data.user.Category;

export class MyCategories extends React.Component {
    constructor(props) {
        super();
        this.state = {
            error: null,
            categories_list : null,
            isLoaded: false,
        }
    }
    componentDidMount() {
        this.setState({
            categories_list : categories,
            isLoaded: true
        });
    }
    render() {
        const { categories_list, isLoaded } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div className="categories-blocks">
                    <div className="categories-added-list container">
                        <div className="d-flex">
                            
                        {categories_list != null && categories_list.map((categories, key) => (
                            <div key={key} className="header-cat-list ng-star-inserted" style={{backgroundImage: "url('"+categories.ThumbnailURL+"')"}}>
                                <div className="ng-star-inserted"><span className="cat-title">{categories.CategoryName}</span></div>
                            </div>
                        ))}
                        </div>
                        <div className="header-cat-list add-cat-btn ng-star-inserted">
                            <button type="button" onClick={this.props.addMore}><span>+</span>Add More</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export class AllCategories extends React.Component {
    constructor(props) {
        super();
        this.state = {
            error: null,
            categories_list : null,
            isLoaded: false,
        }
    }
    componentDidMount() {
        this.setState({
            categories_list : categories,
            isLoaded: true
        });
    }
    render() {
        const { categories_list, isLoaded } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div className="categories-blocks">
                    <div className="categories-added-list container">
                        <div className="d-flex">
                            
                        {categories_list != null && categories_list.map((categories, key) => (
                            <div key={key} className="header-cat-list ng-star-inserted" style={{backgroundImage: "url('"+categories.ThumbnailURL+"')"}}>
                                <div className="ng-star-inserted"><span className="cat-title">{categories.CategoryName}</span></div>
                            </div>
                        ))}
                        </div>
                        <div className="header-cat-list add-cat-btn ng-star-inserted">
                            <button type="button" onClick={this.props.addMore}><span>+</span>Add More</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}