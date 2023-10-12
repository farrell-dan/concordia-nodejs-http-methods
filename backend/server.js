"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { customers } = require("./data/inventory");
const { stock } = require("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .post("/order", (req, res) => {
    const user = req.body;
    const requestedItem = user.order;
    const requestedSize = user.size;

    if (stock.hasOwnProperty(requestedItem)) {
      const availableQuantity = parseInt(stock[requestedItem], 10);

      if (requestedItem === "socks" || requestedItem === "bottle") {
        if (availableQuantity > 0) {
          const customerExists = customers.some((customer) => {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
            return (
              customer.givenName === user.givenName ||
              (isValidEmail && customer.email === user.email) ||
              customer.address === user.address
            );
          });

          if (!customerExists) {
            if (user.country.toLowerCase() === "canada") {
              customers.push(user);
              res.status(200).json({
                status: "success",
              });
            } else {
              res.status(400).json({
                status: "error",
                error: "undeliverable",
                message: "Customer didn't supply a Canadian shipping address",
              });
            }
          } else {
            res.status(400).json({
              status: "error",
              error: "repeat-customer",
              message: "Customer has already purchased an item",
            });
          }
        } else {
          res.status(400).json({
            status: "error",
            error: "unavailable",
            message: "Item out of stock",
          });
        }
      } else if (requestedItem === "tshirt") {
        if (requestedSize) {
          const tshirtSizes = stock.tshirt;

          if (
            tshirtSizes.hasOwnProperty(requestedSize) &&
            tshirtSizes[requestedSize] > 0
          ) {
            const customerExists = customers.some((customer) => {
              const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                user.email
              );
              return (
                customer.givenName === user.givenName ||
                (isValidEmail && customer.email === user.email) ||
                customer.address === user.address
              );
            });

            if (!customerExists) {
              if (user.country.toLowerCase() === "canada") {
                customers.push(user);
                res.status(200).json({
                  status: "success",
                });
              } else {
                res.status(400).json({
                  status: "error",
                  error: "undeliverable",
                  message: "Customer didn't supply a Canadian shipping address",
                });
              }
            } else {
              res.status(400).json({
                status: "error",
                error: "repeat-customer",
                message: "Customer has already purchased an item",
              });
            }
          } else {
            res.status(400).json({
              status: "error",
              error: "unavailable",
              message: "Item out of stock",
            });
          }
        }
      }
    }
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
