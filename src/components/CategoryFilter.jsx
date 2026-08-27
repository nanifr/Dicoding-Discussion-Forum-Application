import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="category-filter">
      <button
        type="button"
        className={activeCategory === '' ? 'category-filter__item category-filter__item--active' : 'category-filter__item'}
        onClick={() => onSelectCategory('')}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={activeCategory === category ? 'category-filter__item category-filter__item--active' : 'category-filter__item'}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
