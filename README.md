# NestJS Basic API
  Basic CRUD with NestJS, PostgresQL [Base on codrr course](https://www.youtube.com/watch?v=lXIk5Tq8khQ)
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Init Database
* Inint Database
```
orm:init
```
* Create migration
```
npm run m:gen -- src/migrations/init
```
* Run migration
```
npm run m:run
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy to AWS stps

* Launch a new instance in aw[AWS EC2 instances](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#LaunchInstances:)
* Select the instance configuration
* Create and save a new a key pair 
* Crete a new security group
* Connect to the instance via ssh `ssh -i "nestjs-course-key.pem" ubuntu@ec2-100-24-3-136.compute-1.amazonaws.com`
