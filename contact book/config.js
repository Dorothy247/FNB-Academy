let rootPath = "https://mysite.itvarsity.org/api/ContactBook/";
let apikey = 'CheckApikey()';

function checkApikey () {
    if (localStorage.getItem('apikey')) {
        window.open("enter-api-html", "_self");

    }
return localStorage.getItem('apikey');
}