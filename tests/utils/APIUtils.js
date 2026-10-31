class APIUtils{
    constructor(apiContext,LoginPayLoad){
        this.apiContext=apiContext;
        this.LoginPayLoad=LoginPayLoad;

    }
     async gettoken(){
        const LoginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data:this.LoginPayLoad
        });
        const loginResponseJson=await LoginResponse.json();
        const token=loginResponseJson.token;
        console.log(token);
        return token;
     }

     async CreateOrder(OrderPayload){
        let response={};
        response.token=await this.gettoken();
     const OrderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
         data:OrderPayload,
         headers:{
             'Authorization':response.token,
             'Content-Type':'application/json',
         }
         });
     const OrderResponseJson=await OrderResponse.json();
     console.log(OrderResponseJson);
    const orderId=OrderResponseJson.orders[0];
     response.orderId=orderId;
     return response;
        }


};
module.exports={APIUtils};