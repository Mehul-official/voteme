import React from 'react';
import { MyCategories, AllCategories } from './Categories';
import SideMenu from './SideMenu';
import ListItem from './ListItem';
import FilterBy from './FilterBy';
import * as Queries from '../../services/Queries';
import * as User from '../User/UserDetails';
import { Link } from 'react-router-dom';


const userDetails = User.userDetails;
const user_id = userDetails._id;

let categories = userDetails !== '' && userDetails.Category;
let choosen_categories_ids = categories !== false && categories.map(el => el._id);

export default class List extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isLoaded : false,
            categories_list : '',
            choosenCategories: categories,
            choosenCategoriesIds : choosen_categories_ids,
            QueriesList : '',
            Page : 1,
            searchBy: props.filter,
            IsPublic: true,
            CategoryId : choosen_categories_ids.toString(),
            ShortBy : '',
            TotalRecords : '',
        }  
    }

    getListItem = (params = '') => {
        var queryParams = {
            CategoryId : this.state.CategoryId,
            Rows : 50,
            PageNo : this.state.Page,
            IsPublic : this.state.IsPublic,
            searchBy : this.state.searchBy
        };
        if (params !== '' && params.target.value !== '') {
            queryParams[params.target.value] = true;
        }
        console.log('queryParams',queryParams)
        var queryParams = Object.keys(queryParams).reduce(function(a,k){a.push(k+'='+encodeURIComponent(queryParams[k]));return a},[]).join('&');
        Queries.get_query(queryParams).then(
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
    shortItems = (event) => {
        this.setState({
            isLoaded : false
        })
        this.getListItem(event);
    }
    categoriesModalShow = async () => { 
        await Queries.categories_list().then(
            result => {
                result.Data.forEach((category,key) => {
                    if (choosen_categories_ids.includes(category['_id']) === true) {
                        category['checked'] = true;
                    }
                });
                this.setState({
                    categories_list: result.Data
                });
            }
        )
    }
    closeModel() {
        this.setState({
            categories_list: ''
        });
    }

    selectCategories = (event) => {
        const { value, name, type, checked } = event.target;
        if (type === 'checkbox' && checked === true) {
            this.setState(prevState => ({
                choosenCategoriesIds: [...prevState.choosenCategoriesIds, value]
            }));
        }
    }
    updateCategories = () => {
        Queries.update_user_category({
            Category: this.state.choosenCategoriesIds
        }).then(
            result => result
        )
    }
    componentDidMount() {
        this.getListItem();
    }
    componentDidUpdate(prevProps) {
        const { filter } = this.props;
        if (filter != undefined && prevProps.filter !== filter) {
            this.setState({
                searchBy:filter,
                isLoaded : false,
            }, () => this.getListItem())
        }
        return false;
    }
    render() {
        const { categories_list, QueriesList, isLoaded } = this.state;
        return(
            <div>
                <section className="query-banner-img add-cat-page">
                    <MyCategories addMore={() => this.categoriesModalShow()}/>
                    <div className="container">
                        <div className="query-inner d-flex">
                            <SideMenu />
                            <div className="my-queries">
                                <FilterBy shortItems={this.shortItems}/>
                                <div className="tabs-content-cover">
                                    <div className="tab-content-list write-query-box-fix">
                                        <div className="query-info-box write-query-box">
                                            <div className="query-head flex-box">
                                                <span className="profile-img">
                                                    <img alt="smile" src={User.UserImage} className="ng-star-inserted" />
                                                </span>
                                                <div className="about-query-info">
                                                    <div className="small-title ng-star-inserted">{User.userDetails.FirstName} {User.userDetails.LastName}</div>
                                                </div>
                                            </div>
                                            <Link to='/add-query'><div className="small-title ng-star-inserted" style={{cursor: 'pointer'}}>Write Your Query Here... </div></Link>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="tab-content-list queries-list">
                                            {(!isLoaded) ? <div>Loading...</div> : <ListItem QueriesList={QueriesList} userId={user_id}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="category-popup" style={{display : categories_list !== '' ? 'block' : 'none' }}>
                    <div className="custom-model-main model-open">
                        <div className="close-btn" onClick={() => this.closeModel()}>×</div>
                        <div className="custom-model-inner">
                            <div className="custom-model-wrap">
                                <div className="select-cat-inner">
                                    <div className="select-category">
                                        <h2 className="section-title">What are your interests?</h2>
                                        <div className="four-grid">
                                            <AllCategories categoriesList={this.state.categories_list} />
                                        </div>
                                    </div>
                                    <div className="submit-btn center-text"><button type="button" onClick={this.updateCategories}>Save</button></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-overlay"></div>
                    </div>
                </div>
            </div>
        )
    }
}

