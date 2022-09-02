const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const categories = data.data.news_category;
        displayCategories(categories);
    }
    catch (error) {
        console.log(error);
    }
}

const displayCategories = (categories) => {
    // console.log(categories);
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button onclick="loadCategoryNews('${category.category_id}','${category.category_name}')" class=" btn btn-outline-danger border-0 mx-2 text-nowrap fw-semibold" >${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });

}

const loadCategoryNews = async (categoryId, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCategoryNews(data.data, categoryName);
    }
    catch (error) {
        console.log(error);
    }
}

const displayCategoryNews = (data, categoryName) => {
    console.log(data);
    // setting number of items/news per category 
    const itemsPerCategory = document.getElementById('items-per-category');
    itemsPerCategory.textContent = `${data.length} items found for category ${categoryName} `;


}

loadCategories();