const {test,expect}= require('@playwright/test');


test.only("first playwright test",async({page})=>{
    const username= page.locator("#username");
    const signInBtn= page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy");
    await page.locator("#password").fill("Learni");
    await signInBtn.click();
   console.log( await page.locator("[style*= block]").textContent());
   expect(await page.locator("[style*= block]").textContent()).toContain("Incorrect");
   await username.fill("");
   await username.fill("rahulshettyacademy");
   await page.locator("#password").fill("Learning@830$3mK2");
   await signInBtn.click();
   console.log(await page.locator(".card-body a").first().textContent());
   console.log(await page.locator(".card-body a").allTextContents());

});
