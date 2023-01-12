
# Technical test for Front End Developer

In this technical test case for the role of Front end developer, you're going to build a simple application. The objective is to test your skills as a Front-end developer.

Your code will be evaluated with the following criteria:

 - Use typescript
 - Use react
 - Use a state management library
 - Clean code
 - Solution / architecture design

The following is not important and won't be evaluated:

 - Design
 - Input validation

# User story

A back-end api is provided in this repository to test the application (see below). The backend has a swagger documentation (`/swagger/index.html`).

You will build a simple questionary for visitor registrations. The questionary has 3 stages:

 - Profile selection
 - Optional identification
 - Questionary

## 1 Profile selection

When the application is opened, the user is presented with a profile selection page. The profiles can be loaded from the backend api: `GET /profiles`.

After the user selected his profile, the questionary can be loaded from the backend api: `GET /profiles/{id}/questionary`.

## 2 Identification

A questionary can contain an identification question. The identification question can be found with the `isIdentificationField` flag.

**Important:** Not every profile has an identification question though. If the first question has its `isIdentificationField` flag set to false. The identification step can be skipped.

When the user submits an answer to the identification question, a request to the backend must be done to find a visitor matching the answer. The visitor list api can be used for this:

```http
GET /visitors?fieldFilter=423ad6c8-a705-4178-b6e4-aa582cd1548f eq 'abc'
```

 - When an existing visitor is found, the answers to the next questions must be pre-filled with the values from the backend.
 - When there is no existing visitor, the flow to the questionary can proceed - nothing will be prefilled in this case.

The identification question has the same requirements as other questions in the questionary:

 - Only 1 question is shown at a time
 - The user can go back to the previous question
 - The user has the option to go back to "home"

Example backend questions:
```json
{
  "profileId": "72d24e0a-36b2-4467-b81b-d6d1a7abafc2",
  "profileName": "Unloading",
  "questions": [
    {
      "id": "12fb528d-1a43-41a2-a556-c974573f539b",
      "type": "Text",
      "text": "What is your PO number?",
      "isIdentificationField": true,
      "isRequired": true
    },
    // ... Other questions
  ]
}
```

## 3 Questionary

**Presenting a question:**

 - Only 1 question is shown at a time
 - All entered answers should be remembered at any time
   - If an answer is already available, the existing answer is presented to the user. This can be either when the user went back and forth through the questions or when an existing visitor was found in the identification step
 - The user can go back to the previous question
 - The user has the option to go back to "home"

There are 3 types of questions:

 - `text`: all text is allowed
 - `number`: only numbers are valid
 - `choice`: the user can choose from a pre-defined list of choices

Text question:

```json
{
  "id": "ca2daa1d-b42b-41f9-ab92-ec87df29d644",
  "type": "Text",
  "text": "What is the name of the shipper?",
  "isIdentificationField": false,
  "isRequired": true
}
```

Number question:

```json
{
  "id": "cc96184a-4791-4bf1-aff9-79bdddd35b9e",
  "type": "Number",
  "text": "How many packages are there?",
  "isIdentificationField": false,
  "isRequired": true
}
```

Choice question:

```json
{
  "id": "fbeaf418-347f-45ef-8d1b-37465c577337",
  "type": "Choice",
  "text": "What is the type of the shipment?",
  "isIdentificationField": false,
  "isRequired": false,
  "choices": [
    "Documents",
    "Food",
    "Electronics",
    "Clothes",
    "Other"
  ]
}
```

**Required fields**

If a question is required, the user cannot submit it with an empty answer.

**Submitting the last question**

In case of an already existing visitor (see identification fields), the visitor should be updated (api: `PATCH /visitors/{id}`).

Otherwise, a new visitor is created (api: `POST /visitors`).

After the last visitor was succesfully saved, a confirmation message is shown.

# Back-end

The backend can be run by either:

## Option 1: Run with the .NET 7 SDK and VS Code

The .NET 7 SDK can be found here: https://dotnet.microsoft.com/en-us/download/dotnet/7.0

1. Go to "Run and Debug" in VS Code and start the backend with the debug configuration **Run Backend**
3. Open a browser, go to http://localhost:5000 and see the swagger documentation

## Option 2: Run with the .NET 7 SDK and the .NET CLI

The .NET 7 SDK can be found here: https://dotnet.microsoft.com/en-us/download/dotnet/7.0

1. Go to the folder `src/backend/Peripass.QuestionaryExcercise.Backend`
2. Run the project with the command `dotnet run`
3. Open a browser, go to http://localhost:5000 and see the swagger documentation

## Option 3: Run with docker

1. Go to the source of the backend: `src/backend`
2. Build the docker container: `docker build -t questionary .`
3. Run the docker container: `docker run -p 5000:80 questionary`
3. Open a browser, go to http://localhost:5000 and see the swagger documentation
