# komputer-store

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A website built upon HTML, styled with CSS and powered by Javascript. It was programmed for he Noroff Java Fullstack Bootcamp.

## Table of Contents

- [Usage](#usage)
- [Program Description](#description)
- [Maintainers](#maintainers)
- [License](#license)

## Usage

The website is deployed at [Github pages.](https://juliushuttunen.github.io/)

## Description

### 1. Wireframe

The site is based on the basic wireframe provided in the project specifications.

### 2. Technologies

The site is powered by Javascript, web elements are created in HTML and the styling was finished in CSS.

### 3. The completed functionalities

#### Get a loan Button

- Window pops up asking for the amount
- If the request is over double the balance, can't get loan
- Only one loan can be had at once
- The loan amount needs to be a positive integer, otherwise can't get loan
- Loan gets added to user balance

#### Bank Button

- Transfer pay amount to balance
- If user has loan, 10% goes towards loan and rest to bank
- If loan gets paid, the extra goes to bank

#### Work Button

- 100 kr for every press to pay

#### Pay loan Button

- Transfer all of the pay to loan
- If loan has been paid in full, the rest stays in the pay
- Hidden until a loan has been taken

#### Buy now Button

- Attempts to buy the selected computer
- Substracts the price from balance
- If there is not enough balance, informs the user
- Successful transaction is implied by a message

#### Laptop selector

- Populated by the data taken from Noroff computers API
- Changing selection updates the user interface with the corresponding information

## Maintainers

[@JuliusHuttunen](https://github.com/JuliusHuttunen)

## License

MIT © 2022 Julius Huttunen
