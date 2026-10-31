const {test,expect}= require('@playwright/test');


test("Playwrights special locators",async({page})=>{
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").check();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("Rasriga@123");
//await page.getByLabel("Email").fill("rajashreenb2002@gmail.com");
await page.getByRole("button",{name:"Submit"}).click();
await page.getByText("Success! The Form has been submitted successfully!").isVisible();
await page.getByRole("link",{name:"Shop"}).click();
await page.locator("app-card").filter({hasText:"Blackberry"}).locator("text= Add").click();




});    