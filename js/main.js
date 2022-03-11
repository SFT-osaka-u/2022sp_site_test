let aboutUs, oneCoinSale, welcomeInfo, sns;
let aboutLinks, welcomeLinks, snsLinks, oneCoinSaleLinks;

aboutUs = document.getElementById("aboutUs");
oneCoinSale = document.getElementById("oneCoinSale");
welcomeInfo = document.getElementById("welcomeInfo");
sns = document.getElementById("sns");

aboutLinks = Array.from(document.getElementsByClassName("aboutLink"));
oneCoinSaleLinks = Array.from(document.getElementsByClassName("oneCoinSaleLink"));
welcomeLinks = Array.from(document.getElementsByClassName("welcomeLink"));
snsLinks = Array.from(document.getElementsByClassName("snsLink"));

for (let element of aboutLinks) {
    element.addEventListener('click', function () {
        scrollTo(0, aboutUs.offsetTop - headerH);
    }, false);
};

for (let element of welcomeLinks) {
    element.addEventListener('click', function () {
        scrollTo(0, welcomeInfo.offsetTop - headerH);
    }, false);
};

for (let element of snsLinks) {
    element.addEventListener('click', function () {
        scrollTo(0, sns.offsetTop - headerH);
    }, false);
};

for (let element of oneCoinSaleLinks) {
    element.addEventListener('click', function () {
        scrollTo(0, oneCoinSale.offsetTop - headerH);
    }, false);
};