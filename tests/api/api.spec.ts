import {test,expect} from "@playwright/test"
import { Page } from "playwright"

test.describe('api testing',function(){

    const baseURL='https://reqres.in/api';
  

    test('getRequest',async({request})=>{
        

        const response=await request.get('https://reqres.in/api/users?page=2')

        expect(response.status()).toBe(200)

        const responseBody=JSON.parse(await response.text())

        console.log(responseBody)

    })

    test('putRequest',async function({request}){

        const response= await request.put('https://reqres.in/api/users/2',{
            data:{
                name:'raj'
            }
        })
        expect (await response.status()).toBe(200)

        const responseBody=JSON.parse(await response.text())
        expect (await responseBody.updatedAt).toBeTruthy()

      /* expect (await responseBody.data.id).toBe(2)

       expect (await responseBody.data.first_name).toBe('Janet')

       expect (await responseBody.support.url).toBe('https://reqres.in/#support-heading')*/

        console.log(responseBody)

    })

    test('postRequest',async({request})=>{
          

        const response=await request.post('https://reqres.in/api/api/users',{

            data:{
                id:1000,
            },
        })

        console.log(JSON.parse(await response.text()))

    })

    test('postRequest for login' ,async({request})=>{

        const response=await request.post('https://reqres.in/api/login',{
            data :{

                email: "eve.holt@reqres.in",
                password: "cityslicka"

            }
        })

        expect (await response.status()).toBe(200)
        const responseBody=JSON.parse(await response.text())
        expect (await responseBody.token).toBe('QpwL5tke4Pnpja7X4')
        console.log(responseBody)

    })

    test.only('delete a record',async({request})=>{

        const response=await request.delete('https://reqres.in/api/users/2')
        expect (await response.status()).toBe(204)
    })

})
