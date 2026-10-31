const {test,expect}= require('@playwright/test');


test("first playwright test",async({page})=>{
    const Products=page.locator(".card-body");
    const mail="rajashreenb2002@gmail.com";
    const Email= page.locator("#userEmail");
    const Password= page.locator("#userPassword");
    const Login=page.locator("#login");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await Email.fill("rajashreenb2002@gmail.com");
    await Password.fill("Rasriga@123");
    await Login.click();
    await page.locator(".card-body b").first().waitFor();
    const Titles=await page.locator(".card-body b").allTextContents();
    console.log(Titles);
    const count=await Products.count();
    for(let i=0;i<count;i++){
        if(await Products.nth(i).locator("b").textContent()=== "ADIDAS ORIGINAL" )
        
        {
            await Products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool=await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    const dropdown= await page.locator(".ta-results ");
    await dropdown.waitFor();
    const dropdownCount=await dropdown.locator("button").count();
    for(let i=0;i<dropdownCount;i++){
    const text=await dropdown.locator("button").nth(i).textContent();
        if(text ===" India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
     expect(page.locator(".user__name [type='text']").first()).toHaveText(mail);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);


    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const rows=page.locator("tbody tr");  
    for(let i=0;i<await rows.count();i++){
    const rowOrderId=await rows.nth(i).locator("th").textContent();
    if(orderId.includes(rowOrderId)){
        await rows.nth(i).locator("button").first().click();
        break;
    }
    }  
    const orderDertails=await page.locator(".col-text").textContent(); 
    expect(orderId.includes(orderDertails)).toBeTruthy();
});





/*test("UI controls",async({page})=>{
    const username= page.locator("#username");
    const signInBtn= page.locator("#signInBtn");
    const documentLink=page.locator("[href *='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");
    const dropdown=await page.locator("select.form-control");
    await dropdown.selectOption("consult");
    //await page.pause();//as we will not be bale to see the result adding this pause will help us to see the result in the browser 
    const radioBtn= await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    expect(await page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test.only("Child windows handling",async({browser})=>
    {
    const context=await browser.newContext();
    const page=await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink=page.locator("[href *='documents-request']");
        const [newPage]=await Promise.all([
            context.waitForEvent("page"),
            documentLink.first().click()
        ])
    const text=await newPage.locator(".red").textContent();
    console.log(text);
    const array=text.split("@");
    const domain=array[1].split(" ")[0];
    console.log(domain); 
    await page.locator("#username").fill(domain);  
    console.log(await page.locator("#username").inputValue()); 
    });*/
