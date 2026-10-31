const {expect,test}=require('@playwright/test');
test("More validations",async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//await page.goto("https://www.google.com/");
//await page.goBack();
//await page.goForward();
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
await page.locator("#confirmbtn").click();
page.on("dialog",dialog=>dialog.accept());
const framespage= page.frameLocator("#courses-iframe");
await framespage.locator("li a[href*='lifetime-access']:visible").click();
const textcheck=await framespage.locator(".text h2").textContent();
console.log(textcheck.split(" ")[1]);//gives the arrray[1] element

});