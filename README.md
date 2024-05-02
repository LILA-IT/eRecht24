# eRecht24

![NPM](https://img.shields.io/npm/l/erecht24)
![NPM](https://img.shields.io/npm/v/erecht24)
![GitHub Workflow Status](https://github.com/LILA-IT/eRecht24/actions/workflows/erecht24.yml/badge.svg?branch=main)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Quality Gate Status](https://sonarqube.lila.systems/api/project_badges/measure?project=eRecht24&metric=alert_status&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=eRecht24)
[![Maintainability Rating](https://sonarqube.lila.systems/api/project_badges/measure?project=eRecht24&metric=sqale_rating&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=eRecht24)
[![Security](https://sonarqube.lila.systems/api/project_badges/measure?project=eRecht24&metric=security_rating&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=eRecht24)
[![Bugs](https://sonarqube.lila.systems/api/project_badges/measure?project=eRecht24&metric=bugs&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=eRecht24)
[![Coverage](https://sonarqube.lila.systems/api/project_badges/measure?project=eRecht24&metric=coverage&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=eRecht24)
[![Duplicated Lines (%)](https://sonarqube.lila.systems/api/project_badges/measure?project=eRecht24&metric=duplicated_lines_density&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=eRecht24)

## ✨ Features

A typescript package to fetch the imprint and privacy policy content from the e-recht24.de API. A premium membership is needed.

Create a project via the project manager and get the api key.

See [here](https://docs.api.e-recht24.de/) for more information.

This package uses caching to reduce the number of requests to the API. The cache is stored in memory and is not persistent. The cache is invalidated after 2 hours. The cache is only available on the server-side.
We recommend using this package only on the server-side! You can also add a additional caching layer like Redis.

It currently does not support the Push API from e-recht24.de.

A gatsby plugin is also available [here](https://www.npmjs.com/package/gatsby-plugin-erecht24) by [pgegenfurtner](https://github.com/pgegenfurtner).

This package is not affiliated with e-recht24.de.

## 🔧 Installation

```sh
npm install erecht24
yarn add erecht24
```

## 🎬 Getting started

```ts
import { ERecht24 } from "erecht24"

const erecht24 = new ERecht24("YOUR API KEY")
const imprint = await erecht24.Imprint
const privacyPolicy = await erecht24.PrivacyPolicy
const privacyPolicySocialMedia = await erecht24.PrivacyPolicySocialMedia
```

## 📜 API

Only your API Key is needed and you can use the corresponding properties to get the content. (see above)
It is recommended to create the instance once and use the getter functions.

There are also static functions available. With these functions the cache is not used. We do not recommend using these functions.

```ts
import { ERecht24 } from "erecht24"

const imprint = await ERecht24.getImprint("YOUR API KEY")
const privacyPolicy = await ERecht24.getPrivacyPolicy("YOUR API KEY")
const privacyPolicySocialMedia =
	await ERecht24.getPrivacyPolicySocialMedia("YOUR API KEY")
```

## 🥂 License

[MIT](./LICENSE.md)
