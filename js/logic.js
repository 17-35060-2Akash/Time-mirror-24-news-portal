const loadCategories = async () => {
    //fetching all categories
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
        // categoryDiv.classList.add('col');
        categoryDiv.innerHTML = `
        <button onclick="loadCategoryNews('${category.category_id}','${category.category_name}')" 
        class=" btn btn-outline-danger border-0 text-nowrap fw-semibold" >${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });

}

const loadCategoryNews = async (categoryId, categoryName) => {
    //fetching all news inside a category by category id
    //start spinner loader
    toggleLoader(true);
    //hide accordiom when new loads
    const blogsContainer = document.getElementById('blogs-container');
    blogsContainer.classList.add('d-none');
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
    // console.log(data);
    const foundItemsPanel = document.getElementById('found-items-panel');
    const sortByPanel = document.getElementById('sort-by-panel');
    if (data && categoryName) {
        foundItemsPanel.classList.remove('d-none');
        sortByPanel.classList.remove('d-none');
    }
    // setting number of items/news per category 
    const itemsPerCategory = document.getElementById('items-per-category');
    itemsPerCategory.textContent = `${data.length} items found for category ${categoryName} `;
    data = data.slice(0, 30);
    //sorting the news array as per total views
    sortedData = data.sort((a, b) => b.total_view - a.total_view);
    // console.log(sortedData);

    const allNewsConatiner = document.getElementById('all-news-container');
    allNewsConatiner.textContent = ``;
    sortedData.forEach(news => {
        // console.log(news);

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col', 'card', 'mb-3', 'p-3', 'border-0', 'rounded-3');

        newsDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-12 col-sm-12 col-md-4 col-lg-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-1 thumbnail-image" alt="...">
                </div>

                <div class="col-12 col-sm-12 col-md-8 col-lg-8 d-flex justify-content-center align-items-center pe-5 news-card">
                    <div class="card-body">
                        <div class="news-paragraph">
                            <h5 class="card-title mb-4 fw-bolder mt-3">${news.title}</h5>
                            <p class="card-text fs-6 text-muted">${news.details.slice(0, 320) + '...'}</p>
                        </div>
                        <div class="news-details card-footer border-0 bg-white px-0 mt-4 d-flex flex-column flex-sm-column flex-md-column flex-lg-row  justify-content-center align-items-center">

                            <div class="d-flex flex-row justify-content-start align-items-center mt-2">
                                <div class="d-flex flex-row  align-items-center">
                                    <img class="img-fluid rounded-5" src="${news.author.img}" alt="" style="width:15%">
                                    <div class="ms-2 mt-2">
                                        <h6 class="text-primary fw-bolder" style="font-size: 80%">${news.author.name ? news.author.name : "No Data Available"}</h6>
                                        <h6 style="font-size: 80%" class="text-muted">${news.author.published_date ? news.author.published_date : "No Data Available"}</h6>
                                    </div>
                                </div>
                            </div>


                            <div class="d-flex flex-row justify-content-start align-items-center mt-4 " >
                                <div class="d-flex flex-row me-5 mt-2 justify-content-center align-items-center">
                                    <h6><i class="fa-solid fa-eye me-1"></i></h6>
                                    <h6 style="font-size: 90%"> ${news.total_view ? news.total_view + 'M' : "No Data Available"}</h6>
                                </div>
                                <div class="d-flex ms-4 me-5">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>

                                <div class="d-flex ms-5">
                                    <button onclick="loadNewsDetail('${news._id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#newsModal">
                                    <i class="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>

                            
                        
                            
                        </div>
                    </div>
                </div>
            </div>
        `;
        allNewsConatiner.appendChild(newsDiv);
    });

    //stop spinner loader
    toggleLoader(false);

}

const loadNewsDetail = async (news_id) => {
    //fetching news details by id for modal
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNewsDetailsOnModal(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNewsDetailsOnModal = (data) => {
    // console.log(data);
    const newsDetailsContainer = document.getElementById('news-details-container');
    newsDetailsContainer.textContent = ``;
    const detailsDiv = document.createElement('div');
    // toggleLoader(true);
    detailsDiv.innerHTML = `
    <div class="card h-100 border-0">
      <img src="${data.image_url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <div class="card-footer border-0 bg-white px-0 mt-4 d-flex justify-content-center align-items-center">

                <div class="d-flex flex-row align-items-center">
                    <img class="img-fluid rounded-5" src="${data.author.img}" alt="" style="max-width:20%">
                    <div class="ms-2 mt-2">
                    <h6 class="text-primary fw-bolder" style="font-size: 80%">${data.author.name ? data.author.name : "No Data Available"}</h6>
                    <h6 style="font-size: 80%" class="text-muted">${data.author.published_date ? data.author.published_date : "No Data Available"}</h6>
                    </div>
                </div>
                
                <div class="d-flex flex-row me-2  mt-2 align-items-center">
                <h6><i class="fa-solid fa-eye me-1"></i></h6>
                <h6 style="font-size: 90%"> ${data.total_view ? data.total_view + 'M' : "No Data Available"}</h6>
                </div>

            </div>
        <p class="card-text mt-4">${data.details}</p>

        <div class="d-flex justify-content-between align-items-center mt-2">
            <div>
               <h6 class="text-success">Rating: <span >${data.rating.number}</span> </h6>
            </div>
            <div class="d-flex text-warning">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
            </div>
        </div>
        
      </div>
    </div>
    `;
    newsDetailsContainer.appendChild(detailsDiv);
    // toggleLoader(false);

}

const toggleLoader = (isLoading) => {
    const spinner = document.getElementById('spinner-container');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}


//blog button 
document.getElementById('blog-btn').addEventListener('click', function (event) {
    document.getElementById('all-news-container').textContent = ``;
    document.getElementById('found-items-panel').classList.add('d-none');
    document.getElementById('sort-by-panel').classList.add('d-none');

    const blogsContainer = document.getElementById('blogs-container');
    blogsContainer.classList.remove('d-none');
});

//news-btn
document.getElementById('news-btn').addEventListener('click', function (event) {
    const blogsContainer = document.getElementById('blogs-container');
    blogsContainer.classList.add('d-none');
});


//sort by views menu starts
const loadByMenuOptions = (btnName) => {
    const dropDownMenu = document.getElementById('drop-down-menu');
    if (btnName === 'Default') {
        dropDownMenu.innerHTML = 'Default';
    }
    else if (btnName === 'Views (Low-High)') {
        dropDownMenu.innerHTML = 'Views (Low-High)';
    }
    else {
        dropDownMenu.innerHTML = 'Views (High-Low)';
    }
}



loadCategories();