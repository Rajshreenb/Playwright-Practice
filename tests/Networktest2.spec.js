const {test,expect}= require('@playwright/test');


test("first playwright test",async({page})=>{
    const Email= page.locator("#userEmail");
    const Password= page.locator("#userPassword");
    const Login=page.locator("#login");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await Email.fill("rajashreenb2002@gmail.com");
    await Password.fill("Rasriga@123");
    await Login.click();
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});