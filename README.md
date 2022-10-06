# Next Js Open Jira APP

To run the app it's needed the data base

```
    docker-compose up -d
```

-   -d means **detashed**

*   Mongo DB local URL

```
mongodb://localhost:27017/entriesdb
```

## Set the enviroment variables

Rename the file **.env.template** to **.env**

## Fill the database with test info

You can use the **seed-data.ts** file and fill the entries[]

## Make a request

make a request to this test endpoint:

```
http://localhost:3000/api/seed
```
