const { Given, When, Then, DataTable, setDefaultTimeout }= require('@cucumber/cucumber');
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');

const { LoginPage } = require('../pages1/LoginPage');
const { HomePage } = require('../pages1/HomePage');
const { CartPage } = require('../pages1/CartPage');

const { expect, chromium }= require('@playwright/test');

let browser;

// Launch browser once for the entire test suite
BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

// Create a isolated clean context and page for each scenario
Before(async function () {
    this.context = await browser.newContext();
    this.page1 = await this.context.newPage();
});

// Close the application page and context after each scenario
After(async function () {
    if (this.page1) await this.page1.close();
    if (this.context) await this.context.close();
});

// Close the browser completely at the end
AfterAll(async function () {
    if (browser) await browser.close();
});


//We can set our default timeout since playwright.config.js is not applicable for Cucumber and bydefault it is 5 seconds
setDefaultTimeout(20*1000)

//We import playwright to use the chromium(chrome/webkit/firefox) brower available inside the playwright
const playwright= require('@playwright/test'); 


Given(`I am on the login page`, async function() {
//const browser= await chromium.launch({headless:false});
//const context= await browser.newContext()
//this.page1= await context.newPage()//if we declare the page fixture with "this" keyword, then we can use the same page fixture for all methods present in side the same scenario
this.PageLogin= new LoginPage(this.page1)
//await this.page1.waitForLoadState()
await this.PageLogin.openLoginPage()
});

When(`I enter userName as {string} and password as {string}`, async function(userName, password) {
await this.PageLogin.userLogin(userName, password)
});


Then(`I should able to see the dashboard page`, async function() {
await expect(this.PageLogin.logoutButtonVisible).toBeVisible()    
}); 
//-----------------------Scenario-1-------------------------

Given(`I am on the Home page`, async function() {    
this.home= new HomePage(this.page1)
});

When(`I select a {string}`, async function(productname) {

     await this.home.addProductToCart(productname)
});

Then(`It should go to the product page`, async function() {
    expect(this.page1).toHaveTitle('STORE');
});

Then(`I click on the cart button`, async function() {
    await this.home.gotoCart()
});
//---------------------Scenario-2------------

Given('I am on the Cart page', async function () {
    this.cart= new CartPage(this.page1)
    await this.cart.gotoCart()
 });
       
Then('I check the product {string} on the cart page', async function (productname) {
    await this.page1.waitForTimeout(3000)
    //await this.page1.waitForLoadState() //not working
   const status= await this.cart.checkProductInCart(productname) 
   expect(await status).toBe(true)   
 });
/*
npx cucumber-js
*/