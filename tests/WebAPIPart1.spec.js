const {test,expect,request}= require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
const LoginPayLoad={userEmail:"rajashreenb2002@gmail.com", userPassword: "Rasriga@123"};
const OrderPayload={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;
test.beforeAll(async()=>{
const apiContext=await request.newContext();
const apiUtils=new APIUtils(apiContext,LoginPayLoad);
response= await apiUtils.CreateOrder(OrderPayload);
});


test("Integrating API test",async({page})=>{
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    // const Products=page.locator(".card-body");
    // const mail="rajashreenb2002@gmail.com";
    
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const rows=page.locator("tbody tr");  
    for(let i=0;i<await rows.count();i++){
    const rowOrderId=await rows.nth(i).locator("th").textContent();
    if(response.orderId.includes(rowOrderId)){
        await rows.nth(i).locator("button").first().click();
        break;
    }
    }  
    const orderDertails=await page.locator(".col-text").textContent(); 
    //await page.pause();
    await expect(response.orderId.includes(orderDertails)).toBeTruthy();
});

    // const Email= page.locator("#userEmail");
    // const Password= page.locator("#userPassword");
    // const Login=page.locator("#login");
    // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // await Email.fill("rajashreenb2002@gmail.com");
    // await Password.fill("Rasriga@123");
    // await Login.click();
    // await page.locator(".card-body b").first().waitFor();
    // const Titles=await page.locator(".card-body b").allTextContents();
    // console.log(Titles);
    // const count=await Products.count();
    // for(let i=0;i<count;i++){
    //     if(await Products.nth(i).locator("b").textContent()=== "ADIDAS ORIGINAL" )
        
    //     {
    //         await Products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    
    // await page.locator("[routerlink*='cart']").click();
    // await page.locator("div li").first().waitFor();
    // const bool=await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    // await expect(bool).toBeTruthy();
    // await page.locator("text=Checkout").click();
    // await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    // const dropdown= await page.locator(".ta-results ");
    // await dropdown.waitFor();
    // const dropdownCount=await dropdown.locator("button").count();
    // for(let i=0;i<dropdownCount;i++){
    // const text=await dropdown.locator("button").nth(i).textContent();
    //     if(text ===" India"){
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }
    //  await expect(page.locator(".user__name [type='text']").first()).toHaveText(mail);
    // await page.locator(".action__submit").click();
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);


//     await page.locator("button[routerlink*=myorders]").click();
//     await page.locator("tbody").waitFor();
//     const rows=page.locator("tbody tr");  
//     for(let i=0;i<await rows.count();i++){
//     const rowOrderId=await rows.nth(i).locator("th").textContent();
//     if(orderId.includes(rowOrderId)){
//         await rows.nth(i).locator("button").first().click();
//         break;
//     }
//     }  
//     const orderDertails=await page.locator(".col-text").textContent(); 
//     await expect(orderId.includes(orderDertails)).toBeTruthy();
// });
