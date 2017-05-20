class Cat {
    static count = 0;
    // fields
    id: number;
    name: string;
    picture: string;
    clickCount: number;

    // constructor
    constructor(name: string, picture: string) {
        this.id = Cat.count++;
        this.name = name;
        this.picture = picture;
        this.clickCount = 0;
    }

    // functions
    addClick(): void {
        this.clickCount++;
    }
}

window.onload = function () {
    let cats = [];
    let cat1 = new Cat('Melchior', 'images/melchior.jpg');
    let cat2 = new Cat('Balthazar', 'http://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426');

    cats.push(cat1);
    cats.push(cat2);

    for (let cat of cats) {
        // build cat-card
        let htmlBuilderCard = '<div id="card_' + cat.id + '" class="hidden mdl-card cat-card mdl-shadow--8dp mdl-cell mdl-cell--4-col mdl-cell--1-offset-desktop">';
        htmlBuilderCard += '<div class="mdl-card__title" style="background-image: url(' + cat.picture + ')">';
        htmlBuilderCard += '<h2 class="mdl-card__title-text">' + cat.name + '</h2>';
        htmlBuilderCard += '</div>';
        htmlBuilderCard += '<div class="mdl-card__supporting-text">Click count:<span id="' + cat.id.toString() + '_amount"> ' + cat.clickCount + '</span></div>';
        htmlBuilderCard += '</div>';

        // add new cat card
        var catsWrapper = document.getElementById("cats-wrapper");
        catsWrapper.insertAdjacentHTML('beforeend', htmlBuilderCard);

        // build cat-list
        let htmlBuilderList = '<li class="mdl-list__item"><span id="list_' + cat.id + '" class="mdl-list__item-primary-content">' + cat.name + '</span></li>';
        var catList = document.getElementById("cat-list");
        catList.insertAdjacentHTML('beforeend', htmlBuilderList);

        // add click to cat item in list
        let catListItem = document.getElementById('list_' + cat.id);
        let catCard = document.getElementById('card_' + cat.id);
        catListItem.addEventListener('click', function(e){
            catCard.classList.remove('hidden'); 
        });
        
        let amount = document.getElementById(cat.id.toString() + '_amount');

        catCard.addEventListener('click', function (e) {
            cat.clickCount++;
            amount.innerHTML = cat.clickCount.toString();
        }, false);
    }



};

