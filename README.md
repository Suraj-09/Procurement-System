# Procurement-System (web app)

Tech stack: HTML CSS JS Node.js Express & MongoDB

Employees can place requests for products. If the requested product's price falls short of $5000, the request is sent to the provider/manufacturer of the product requested. If it is > $5000, their supervisor is automatically notified to approve/deny the request of his employee. Should the request be approved, the request is then sent to the provider/manufacturer of the product requested.

# Installation Guide
BACK-END:

Software: Node.js

From terminal, cd into Procurement-System/backend/

Type the commands: -npm i -npm start

MongoDB connection should be established successfully.

FRONT-END:

Software: VSCode (+ extension: Live-Server)

From VSCode, open project folder and hit "Go Live" in the bottom left corner of the screen.

Development server should bootup on default browser.

# Features
Sign-in/Sign-Up pages
Home page + retractable menu
Request item page
Requests History page
Notifications page
Account settings + logout options
# User Guide
The code provides login/sign-up pages for the users (employees). Sign-up registers employee in the Mongo database; regular employee or supervisor.

After signing in, users are greeted by the Home Page.

From the retractable menu on the left, clicking "Request Item" opens the request form.

Choose an item to request and fill the other input boxes, then hit "Submit Request".

If the request's total price is below $5000:

The request is sent to whichever provider matches the item requested in the DB.

If the request's price is larger than $5k:

Whenever the supervisor logs in, the "Notifications" button in his left menu will be bright red, signaling that his input in needed for his employee's request.

From the supervisor's notifications page, he can decide to approve or deny the request.
