Feature: Adding item to cart

Background: Login to the application
Given I am on the login page
When I enter userName as "pavanol" and password as "test@123"
Then I should able to see the dashboard page

Scenario Outline: Add product to cart
Given I am on the Home page
When I select a "<product>"
Then It should go to the product page
Then I click on the cart button
Examples:
    | product | 
    | Sony xperia z5 |  

Scenario: Check on the cart page
Given I am on the Cart page
Then I check the product "Sony xperia z5" on the cart page   