---

marp: true

---

# Data Validation

---

In the field of web development, it's also known as: 

- Input validation.

- Form validation.


❗ In other fields, data validation is the process of receiving, sampling, cleaning, manipulating / engineering, and analyzing actual data.

---

## Data Validation

There are 2 ways to validate data:

- Client-side validation.

- Server-side validation.

---

## Client-Side Validation

The purpose of client-side validation is to make sure that the information the user put in the form fits the format we're looking for. 

When using client-side validaiton, often times it'll be quick checks on the information. 

For example: making sure the email `input` actually contains an email and not a phone number.

---

## Client-Side Validation

You've already done some client-side validation. Remember `js-events-P2`?

Do you remember what you had to do in that workshop?

- Make some inputs `required`.

- Set the `type` of the inputs.

- Check that the passwords have a specific length.

- Check that the passwords match.

- Check that the terms of service were agreed to.

These are all good examples of client-side validation. What more can we do?

---

## Built-In Form Validation

Some `input` types have attributes that can help facilitate data validation. These are known as `built-in form validation`.

A few of these attributes are:

- `type`

- `pattern`

- `format`

- `min`

- `max`

- etc...

---

## Validating With JavaScript

When a form is submitted an `event` is triggered. You can catch the `event` with a listener, and use JavaScript to verify the integrity of the data.

JavaScript is pretty fast and can be used to do some fairly solid validation on the information provided by the user.

Plus you get the added bonus of creating custom behaviors and custom messages!

---

## Why Client-Side Validation? (The Pros)

When handling the data in the `form`:

1. It's fast and light.

2. It's relatively simple.

3. You can use JS to make some custom behavior.

4. It can prevent making `fetch` requests that definitely won't work, saving time and ressources.

5. It's a bit better for the user experience. 

    - See reasons #1 through #4.

---

## Why Not Client-Side Validation? (The Cons)

When handling validating against the data in the server:

1. It's not secure.

2. It's not secure.

3. It's slow, and requires **A LOT** of processing power.
    
    - Most users do not have an ultra powerful super-computer.

4. It's not secure.

Why is it not secure? Well when a user is trying to login for example, you need to compare their credentials against all the credentials in your database. You **CANNOT** send all that information to the browser. You would literally be handing over all the credentials of your users on a silver platter 😒.

---

## Server-Side Validation


The purpose of server-side validation is also to make sure that the information the user put in the form fits the format we're looking for, but on the other side of the fence!

When using server-side validaiton, we need to check every little detail of the information. 

For example: making sure the email received is a valid email, and not something stupid like `rony@email.com`.

---

## Server-Side Validation

More often than not, we'll also be comparing the data received from the form to the data in our database.

Example: a user is signing up to a website

```md
1. Receive the data.

2. Validate the data.
    
    - Check that the data received is real (ex: email, address, etc.)
    
    - Check that the data received doesn't contain malicious code.
    
    - Check that the data received matches the parameters we expected (ex: phone number with area code vs without)

3. Search the database for an exact match.

    - If a match was found, set response to "User Exists" error.
    
    - If no match was found, create user and set response to "Signup Successful" message.

4. Send response from server to website.
```

> Had to make it into a code block so it could fit on your slides 😅.

---

## Why Server-Side Validation? (The Pros)

1. It's secure.

2. It's secure.

3. Server computers usually have a lot more processing power and can handle validating the information against the massive hulk of data that is your database.

4. Gives you total control over what information you do and don't accept.

5. Gives you total control over what you send back.

6. Keeps your database safe from accidental exposure in the frontend.

7. It's secure.

---

## Why Not Server-Side Validation? (The Cons)

1. Can be slow, especially if your database is very large.

2. Too many pings can cause problems if not handled properly (ex: user clicks submit 5 times in a row).

3. There really aren't that many... it was hard enough coming up with the first 2 😂.