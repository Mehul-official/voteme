import React from 'react';
import * as Queries from '../../services/Queries';

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
            categories_list : '',
            Categories : [],
            isLoaded: false,
        }
    }
    componentDidUpdate(prevProps) {
        const { categoriesList, Categories } = this.props;
        if (categoriesList != undefined && prevProps.categoriesList !== categoriesList) {
            this.setState({
                Categories : Categories,
                categories_list : categoriesList,
                isLoaded: true
            })
        }
    }
    render() {
        const { categories_list, isLoaded, Categories } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div className="category-cover">
                    {categories_list !== '' && categories_list.map((category, key) => (
                        <div key={key} value={category._id} className="category-list ng-star-inserted" style={{backgroundImage: 'url("'+category.ThumbnailURL+'")'}}>
                            <input type="checkbox" name='selectCategory' checked={category.checked && category.checked === true && 'checked'} value={category._id} onChange={this.props.selectCategories} defaultChecked={(Categories[key] !== undefined) ? true : false}/>
                            <label><span>{category.CategoryName}</span></label>
                        </div>
                    ))}
                </div>
            )
        }
    }
}