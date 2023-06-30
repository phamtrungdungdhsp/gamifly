# An Assignment from Gamifly

## About the project
- Node version: >16.14.0
- Backend: Nestjs, Mongodb
- Frontend: Reactjs

## Get started

### Docker
Firstly, replace all the propriate information in .env file in root directory of my-nest-project.
You can easily start the backend by docker-compose.
```bash
 cd /my-nest-project
 docker-compose up -d
```

After running `docker-compose up -d` command, the mongodb and the backend will be up and running.

Then start the Frontend:

```bash
    cd /my-react-project
    npm install
    npm start
```

### Manualy started
Firstly, you should have mongodb running on your local machine or a remote mongodb database.

Secondly, replace all the propriate information in .env file in root directory of my-nest-project.

Finally, go to backend directory and install the packages then start it up.

```bash
cd /my-nest-project

#npm
npm install
npm run start:dev

#yarn
yarn install
yarn start:dev

```


### Bonus Question
How would you handle security for saving credit cards?

To handle security for saving credit cards, we can do the following steps:

- Encrypt the card information on the client side before attach it into body then send to the server. RSA is a perfect choice to me. The FrontEnd use publicKey to encrypt the information, then the Backend use secretKey to decrypt it.

- Card information should be saved in the database under encrypted value format. So if a hacker accessed to the database, he could get the data but can not use them.

- We can store card information somewhere that have high security such as AWS, Azure.