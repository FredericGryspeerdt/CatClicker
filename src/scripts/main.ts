class Cat {
    static count = 0;
    // fields
    id: number;
    name: string;
    picture: string;
    clickCounter: number;

    // constructor
    constructor(name: string, picture: string) {
        this.id = Cat.count++;
        this.name = name;
        this.picture = picture;
        this.clickCounter = 0;
    }

    // functions
    addClick(): void {
        this.clickCounter++;
    }
}

window.onload = function () {
    let cats = [];
    let cat1 = new Cat('Melchior', 'images/melchior.jpg');
    let cat2 = new Cat('Balthazar', 'http://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426');

    cats.push(cat1);
    cats.push(cat2);

    for (let cat of cats) {
        let htmlBuilder = "<div class='cat'>";
        htmlBuilder += "<h1>" + cat.name + "<h1>";
        htmlBuilder += "<img id='" + cat.id + "' src='" + cat.picture + "' alt='kitten' height='auto' width='200px'>";
        htmlBuilder += "<p>Number of clicks: <span id='" + cat.id + "_amount'>" + cat.clickCounter + "</span></p>";
        document.getElementById("cats").insertAdjacentHTML('beforeend', htmlBuilder);

        let catImage = document.getElementById(cat.id.toString()),
            amount = document.getElementById(cat.id.toString() + '_amount');

        catImage.addEventListener('click', function (e) {
            cat.clickCounter++;
            amount.innerHTML = cat.clickCounter.toString();
        }, false);
    }


};

