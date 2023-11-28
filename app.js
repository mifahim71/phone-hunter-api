const detailDiv = document.getElementById('details-container');
detailDiv.style.display = 'none';
detailDiv.style.overflow = 'hidden';


document.getElementById('searchBtn').addEventListener('click', function(){
    const inputField = document.getElementById('inputField');
    const inputvalue = inputField.value.toLowerCase();

    const detailDiv = document.getElementById('details-container');
    detailDiv.style.display = 'none';
    detailDiv.style.overflow = 'hidden';
    detailDiv.textContent = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputvalue}`

    inputField.value = '';

    const notFound = document.getElementById('notfound');
    notFound.classList.remove('notfound');
    notFound.textContent = '';

    fetch(url)
    .then(res => res.json())
    .then(data => showData(data))
})

const showData = mainObject => {
    const allItemDiv = document.getElementById('allitems');
    allItemDiv.textContent = '';

    const notFound = document.getElementById('notfound');
    if(mainObject.status == false){
        notFound.classList.add('notfound');
        notFound.innerHTML = `
            <p>Not found anything, try again</p>
        `
    }
    else{
        for(const item of mainObject.data){
            const div = document.createElement('div');
            div.classList.add('itemCard');
            div.innerHTML = `
                <img onclick="fetchdetails('${item.slug}')" src="${item.image}" alt="">
                <h1>Name: ${item.phone_name}</h1>
                <h2>Brand: ${item.brand}</h2>
            `

            allItemDiv.appendChild(div);
        }
    }
    
}


const fetchdetails = slugs => {

    const url = `https://openapi.programming-hero.com/api/phone/${slugs}`
    fetch(url)
    .then(res => res.json())
    .then(data => details(data))
}

const details = detailData => {
    // console.log(detailData);
    const detailContainer = document.getElementById('details-container');
    detailContainer.style.display = 'flex';
    detailContainer.style.overflow = 'visible';
    detailContainer.textContent = '';
    const mainData = detailData.data;
    console.log(mainData);

    const div = document.createElement('div');
    div.classList.add('details');
    div.innerHTML = `
        <img src="${mainData.image}" alt="">
        <h2>Name: ${mainData.name}</h2>
        <h2>Brand: ${mainData.brand}</h2>
        <p>Storage: ${mainData.mainFeatures.storage}</p>
        <p>display Size: ${mainData.mainFeatures.displaySize}</p>
        <p>chip Set: ${mainData.mainFeatures.chipSet}</p>
        <p>memory: ${mainData.mainFeatures.memory}</p>
    `
    detailContainer.appendChild(div);

}