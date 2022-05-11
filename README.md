Objective: Create website ecommerce of art therapy.

Description: The user 'll be able to home, contact, describe of product, register, login, logout, ecommerce page and shopping. The project was creating in two applications (front and backend). 
On the login page, validation data are written to Local Storage and Session. The backend (PHP) receives the Request, validates the credentials, and creates the Token. The response is sent to Frontend with the necessary token and Headers.
On the ecommerce page the selected product is shown, and the user can modify the amount of it or exclude it, and can also insert new products, the Cards calculates the total value for each change.
On the Shopping page, the user can see the total amount including VAT, the delivery descriptions and enter and validate the Credit Card for payment. The CC is inserted in the encrypted DB, if you already have a CC in the DB, the user's data is decrypted and displayed on the screen. 
I chose to make a structure with two applications in Rest API, the routes were created in the frontend app.tsx and backend index.php. Credential data is validated on each page of the client area and sent via Token, sensitive CC data is encrypted and described. When logging out the client is sent to the home page and the local Storage and session are emptied.

Tech Used: JavaScript, React, TypeScript, Bootstrap, API Rest,  PHP 7 and MySQL.
