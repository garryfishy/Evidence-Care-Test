## Steps to run applications

- Run test

- Build and Run server

- Build and Run client

## Pre-requisites

- Install nodejs
- Install docker

## Step 1. Run test

- go to the server directory and run test
- ```bash
  cd server
  npm install
  npm run test
  ```

## Step 2. Run server

- Dockerfile is already prepared for this application
- ```bash
  ./build.sh
  ./run.sh
  ```
- Server will be running on port 9000

## Step 3. Run client

- Open another terminal and go to client directory
- Dockerfile is already prepared for this application
- ```bash
  cd client
  ./build.sh
  ./run.sh
  ```
- Client will be running on port 3000
