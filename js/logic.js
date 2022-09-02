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
        console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button class="btn btn-outline-danger border-0 mx-2 text-nowrap fw-semibold" >${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });

}

loadCategories();