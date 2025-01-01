<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

A scheduling and task management API using [NestJS](https://github.com/nestjs/nest) framework and ProstgeSQL for data storage with Prisma ORM.

## Project setup

### Environment Setup

The following steps are for Ubuntu Server 24.04 LTS.

Install Node.JS 

```bash
sudo apt update
sudo apt full-upgrade

# install node using node version manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

source ~/.bashrc

nvm install v22.12.0
```

Install ProstgreSQL

```bash
sudo apt install -y postgresql-common -y

sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh

# Press Enter when prompted to add the new repository to your server sources.

sudo apt install -y postgresql

sudo systemctl restart postgresql

# setup the user accounts and password authentication

sudo -u postgres psql

postgres=#  ALTER USER postgres WITH ENCRYPTED PASSWORD 'strong_password';

postgres=#  CREATE USER scheduling_admin ENCRYPTED PASSWORD 'strong_password';

postgres=#  ALTER USER scheduling_admin CREATEDB;

# exit the prostgres shell
postgres=#  \q

sudo sed -i '/^local/s/peer/scram-sha-256/' /etc/postgresql/17/main/pg_hba.conf

sudo systemctl restart postgresql
```

Create a file named `.env` in the root of the application directory and add the following details to it

```bash
DATABASE_URL="postgresql://scheduling_admin:DB-USER-PASSWORD@localhost:5432/scheduledb?schema=public"
```

Install the apprication dependancies

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
