import React from "react";

const Header = props => {
    return (
        <header>
            <span className="selected-section">{props.selectedCategory}</span>
            <div className="search-content">
                <form className="search-form" action="">
                    <button className="search-button">
                        <i className="fa fa-search" />
                    </button>
                    <input
                        className="seacrh-input"
                        type="text"
                        placeholder="Search post"
                        onChange={event => {
                            props.onFilterPosts(event.target.value);
                        }}
                    />
                </form>
            </div>
        </header>
    );
};

export default Header;
