# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter) 

**answer**:  1

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

**answer**: As mentioned, the "message" feature composes of many functions such as write and send. These functions by itself would need their own unit testing. Therefore, I would not use a unit test to test the "message" feature. 


3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
**answer**: I would use a unit test to test the "max message length" because it isolates the feature. Since this is a feature for the application, if we can find the bugs by unit testing, it would help the developer fit this feature into the overall component. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
**answer**: If headless is set to false, we can see how the puppeteer works. Therefore, if it is set to true, we wouldn't be able to see how the puppeteer drives the browser. Would only see a direct response from our program without the puppeteer stepping through. 

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

