<h2 align="center"> GraphQL Pokedex ⚡ </h2>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#features">Features</a> •
  <a href="#usage">Usage</a> •
	<a href="#changelog">Changelog</a> •
  <a href="#license">License</a>
</p>

<p align="center">
A generic Pokedex API server which implements GraphQL using Prisma and GraphQL Yoga for more efficient data fetching and strongly typed data than a traditional REST API.
</p>

<img align="right" src="./src/assets/preview.gif?raw=true" height="280">

## Installation
Once you have downloaded the repository, direct into the root of the folder and use: 

```bash
npm install
```
Once all the required dependencies have been installed, create a `.env` file in the root of the folder and a new value named `DATABASE_URL` set with the URL of the database you wish to connect to (Prisma 2 accepts MySQL, SQLite and PostGreSQL only). For example:

```env
DATABASE_URL=DBMS://USER:PASS@xxxxxxxx.xxx:PORT/xxxxxxxxxx
```
Alternatively, you can enter into the `prisma/schema.prisma` file and insert the database URL into the `url` key (**NOT** recommended as this could compromise security).

```json
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = //"postgresql", "sqlite", or "mysql" 
  url      = // Database URL would go here 
}
```
- Under `src/assets` there are Pokemon datasets available in several formats for the user to populate their database with.

Now run these commands from your command line:

```bash
npx prisma introspect
npx prisma generate
```
Once that is all finished, the user can now run the project under `http://localhost:4000` by using the command:

```bash
npm start
```

## Usage
All queries in this API are made using the `Pokedex` query command.

### Schema 
The schema for the Pokemon in the Pokedex is as follows:

```graphql
# A Pokemon from the Pokedex
type Pokemon {
  id:             Int # The national index of the pokemon
  name:           String! # The name of the pokemon
  species:        String! # The species of the pokemon
  type1:          String! # The first type of the pokemon
  type2:          String # The second type of the pokemon (if applicable)
  abilities:      [String!]! # A list of the different abilities available to the pokemon
  hp:             Int # Base HP stat for the pokemon
  defense:        Int # Base Defense stat for the pokemon
  spDefense:      Int # Base Special Defense stat for the pokemon
  attack:         Int # Base Attack stat for the pokemon
  spAttack:       Int # Base Special Attack stat for the pokemon
  speed:          Int # Base Speed stat for the pokemon
  statTotal:      Int # Sum of all the base stats for the pokemon
  eggCycle:       Int # Number of steps needed to hatch an egg of the pokemon
  catchRate:      Int # Base catch rate of the pokemon
  height:         Float! # Height of the pokemon
  weight:         Float! # Weight of the pokemon
  mRatio:         Float! # Chance of pokemon being born male at birth*
  fRatio:         Float! # Chance of pokemon being born female at birth*
  generation:     Int # Generation of the pokemon
  eggGroup1:      String! # First egg group of the pokemon
  eggGroup2:      String # Second egg group of the pokemon (if applicable)
  legendary:      Boolean! # Whether or not the pokemon is Legendary / Mythic
  colour:         String! # Colour of the pokemon
  evolutionLine:  Int! # Evolution line of the pokemon (other pokemon in the same evolution line have the same number)
}

# *NOTE*: If the mRatio and fRatio for a particular pokemon are both 0, then the pokemon is genderless
```

#### Filtering
Entries in the Pokedex can be filtered using the `where` argument. For example:

A query to find all Generation 1 pokemon and return their `id`, `name`, `species` and `generation`:
```graphql
{
  Pokedex(where: {
    generation: { equals: 1 }
  }) {
    id
    name
    species
    generation
  }
}
```

Search criteria can also be intuitively chained together using logical operators: `AND`, `OR` and `NOT`. For example:

A query to find all Generation 3 fire type pokemon and return their `id`, `name`, `species`, `type1`, `type2` and `generation`:
```graphql
{
  Pokedex(where: {
    generation: {
      equals: 3
    }
    AND: [{
      type1: { equals: "fire" }
    }]
  }) {
    id
    name
    species
    type1
    type2
    generation
  }
}
```

#### Sorting 
Entries can be sorted by using the `orderBy` argument and the enums `asc` or `desc`. For example:

A query to sort pokemon by `speed` (descending) and return their `id`, `name`, `species` and `speed`:
```graphql
{
  Pokedex(orderBy: {
    speed: desc
  }) {
    id
    name
    species
    speed
  }
}
```

#### Pagination
Entries can be paginated using the `first` and `last` arguments. These arguments return the first and last number of entries from a particular query respectively. For example: 

A query to get the first 10 entries in the pokedex and return their `id`, `name` and `species`:
```graphql
{
  Pokedex(first: 10) {
    id
    name
    species
  }
}
```

You can inspect the schema for the API under `src/schema/schema.graphql` further inspect the arguments available.

## Changelog
| Version                                                                                     | Description                                                                   |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| v1.0 | Initial major release.



## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- Copyright © [jmoisxhi](https://github.com/jmoisxhi).