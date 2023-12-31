# Node.JS - Express Methods

## 🦊 Pre-lecture

There is no pre-lecture for this workshop.

---

## 🦉 Lecture

- [Lecture 1 | Data Validation](./lecture/lecture-1-data-validation.md)

Keep in mind that these slides are not interactive, like in the actual lecture. Whenever possible, we will provide links to working code examples in Code Sandbox.

---

## Setup

Today's workshop is a _**full stack**_ workshop. You'll need 2 active terminals to be able to run this workshop as intended.

### The Frontend (website):

1. Open a terminal.
2. Navigate to the `frontend` folder by typing `cd frontend`.
3. Install the dependencies with `yarn install`.
4. Boot React with `yarn dev:frontend`.

### The Backend (server):

1. Open a **new** terminal (you can use a split terminal if you want).
2. Navigate to the `backend` folder by typing `cd backend`.
3. Install the dependencies with `yarn install`.
4. Boot the server with `yarn dev:backend`.

After following these steps, you should have 2 terminals. One should be running React, and the other should be running the server.

---

## ⚡ Exercises

![order-form](./lecture/assets/order-form.png)

## The Order Form

Take a look at the form that is available at [`http://localhost:3000`](http://localhost:3000).

It is an order form for promotional products. Users need to fill out the complete form. All fields are required.

For this exercise, you will need to create the endpoint that this form submits to. You will need to validate the data you receive and respond to the request appropriately.

## Task

To be clear, **you don't need to edit any of the code in the `frontend`**. This work is done for you. Your primary task is to create the server endpoint to process the order. Once your server is complete, the form should work fine.

Just so you know, the `body` that is sent by a `fetch` request is received in the `req.body` on the backend.

---

## Validation

1. Validate that the user has not yet placed an order (because the product is free, **_we limit 1 per customer_**). We cannot know this with 100% accuracy, but we can refuse users

   - whose name is already in our database.
   - whose email is already in our database.
   - whose address matches an address already in our database. Use only the street number and name for this.

2. Validate that the data received is _valid_ as much as is possible.
   - Is the email, an email? Does it include `@`? _(No need to go crazy here. Just a cursory evaluation.)_
3. Validate that delivery address is within Canada. We only ship to Canada!
4. Validate that the item selected is actually in stock.
5. Validate that the item size was selected.

If any of these validations fail, return an error as a response.

| Error ID          | Description                                        |
| ----------------- | -------------------------------------------------- |
| 'unavailable'     | Item out of stock                                  |
| 'repeat-customer' | Customer has already purchased an item             |
| 'undeliverable'   | Customer didn't supply a Canadian shipping address |
| 'missing-data'    | Some of the required information was not provided  |

> **HINT: If none of the validations fail, you might want to save your customer's information so they can't buy again! 😉**

The form expects a JSON object as a response. For example, if everything works great:

```json
{
  "status": "success"
}
```

If there is an error, you should change the `status`, as well as provide the error:

```json
{
  "status": "error",
  "error": "unavailable"
}
```

(use the error ID from the table above; for example, if the required data was missing, it should be "missing-data" instead of "unavailable")

---

## Details

Take a look at `inventory.js` in the `backend/data` folder. This is your _"database"_. It contains current stock levels as well as past customers... Business isn't exactly booming.

You will need to import this data wherever you need to use it. At the top of the file you can require them with

```js
const { stock, customers } = require("<PATH_TO_FILE>");
```

## Endpoint details

The form makes a POST request to the `/order` path; you will need to create this endpoint in the server.

You don't need to change the front-end at all; it's already set up to send the correct data when the form is submitted, and to handle any error codes.

---

<center>🟢 - Complete workshop (100%) - 🟢</center>

---
